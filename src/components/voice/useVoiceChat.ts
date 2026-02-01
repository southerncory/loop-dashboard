import { useState, useRef, useCallback } from 'react';
import { useGateway } from './useGateway';

interface VoiceChatConfig {
  groqApiKey: string;
  elevenLabsApiKey: string;
  elevenLabsVoiceId: string;
  gatewayUrl: string;
  gatewayToken: string;
}

interface VoiceChatState {
  isListening: boolean;
  isProcessing: boolean;
  isSpeaking: boolean;
  transcript: string;
  response: string;
  error: string | null;
}

export function useVoiceChat(config: VoiceChatConfig) {
  const [state, setState] = useState<VoiceChatState>({
    isListening: false,
    isProcessing: false,
    isSpeaking: false,
    transcript: '',
    response: '',
    error: null,
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const { sendMessage, messages, clearConversation } = useGateway({
    gatewayUrl: config.gatewayUrl,
    token: config.gatewayToken,
  });

  // Start listening
  const startListening = useCallback(async () => {
    try {
      // Stop any current playback
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        stream.getTracks().forEach(track => track.stop());
        await processAudio(audioBlob);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      
      setState(prev => ({ ...prev, isListening: true, error: null }));
    } catch (err) {
      setState(prev => ({ ...prev, error: 'Failed to access microphone. Please allow microphone access.' }));
    }
  }, []);

  // Stop listening
  const stopListening = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setState(prev => ({ ...prev, isListening: false }));
    }
  }, []);

  // Process audio through Whisper → Gateway → ElevenLabs
  const processAudio = async (audioBlob: Blob) => {
    setState(prev => ({ ...prev, isProcessing: true }));

    try {
      // 1. Transcribe with Groq Whisper
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.webm');
      formData.append('model', 'whisper-large-v3');

      const whisperResponse = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.groqApiKey}`,
        },
        body: formData,
      });

      if (!whisperResponse.ok) {
        throw new Error('Transcription failed');
      }

      const whisperData = await whisperResponse.json();
      const transcript = whisperData.text?.trim();
      
      if (!transcript) {
        setState(prev => ({ ...prev, isProcessing: false, error: 'No speech detected' }));
        return;
      }
      
      setState(prev => ({ ...prev, transcript }));

      // 2. Send to OpenClaw gateway via chat completions
      const response = await sendMessage(transcript);
      
      setState(prev => ({ ...prev, response }));

      // 3. Convert response to speech with ElevenLabs
      await speakResponse(response);

    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to process audio';
      setState(prev => ({ ...prev, error: errorMsg, isProcessing: false }));
    }
  };

  // Speak response using ElevenLabs
  const speakResponse = async (text: string) => {
    setState(prev => ({ ...prev, isProcessing: false, isSpeaking: true }));

    try {
      // Clean up text for TTS (remove markdown, code blocks, etc.)
      const cleanText = text
        .replace(/```[\s\S]*?```/g, '') // Remove code blocks
        .replace(/`[^`]+`/g, '') // Remove inline code
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
        .replace(/[*_~]+/g, '') // Remove markdown formatting
        .trim();

      if (!cleanText) {
        setState(prev => ({ ...prev, isSpeaking: false }));
        return;
      }

      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${config.elevenLabsVoiceId}`,
        {
          method: 'POST',
          headers: {
            'xi-api-key': config.elevenLabsApiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: cleanText.slice(0, 5000), // ElevenLabs limit
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error('TTS failed');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      const audio = new Audio(audioUrl);
      currentAudioRef.current = audio;
      
      audio.onended = () => {
        setState(prev => ({ ...prev, isSpeaking: false }));
        URL.revokeObjectURL(audioUrl);
        currentAudioRef.current = null;
      };
      
      audio.onerror = () => {
        setState(prev => ({ ...prev, isSpeaking: false, error: 'Audio playback failed' }));
        URL.revokeObjectURL(audioUrl);
        currentAudioRef.current = null;
      };
      
      await audio.play();
    } catch (err) {
      setState(prev => ({ ...prev, error: 'Failed to speak response', isSpeaking: false }));
    }
  };

  // Stop speaking
  const stopSpeaking = useCallback(() => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
      setState(prev => ({ ...prev, isSpeaking: false }));
    }
  }, []);

  return {
    ...state,
    messages,
    startListening,
    stopListening,
    stopSpeaking,
    clearConversation,
  };
}
