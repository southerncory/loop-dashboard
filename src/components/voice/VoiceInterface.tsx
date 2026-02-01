import { useState, useEffect } from 'react';
import { useVoiceChat } from './useVoiceChat';

interface VoiceInterfaceProps {
  config?: {
    groqApiKey?: string;
    elevenLabsApiKey?: string;
    elevenLabsVoiceId?: string;
    gatewayUrl?: string;
    gatewayToken?: string;
  };
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  theme?: 'dark' | 'light';
}

export function VoiceInterface({ 
  config = {}, 
  position = 'bottom-right',
  theme = 'dark' 
}: VoiceInterfaceProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPermissionHint, setShowPermissionHint] = useState(false);

  const {
    isListening,
    isProcessing,
    isSpeaking,
    transcript,
    error,
    messages,
    startListening,
    stopListening,
    stopSpeaking,
    clearConversation,
  } = useVoiceChat({
    groqApiKey: config.groqApiKey || import.meta.env.VITE_GROQ_API_KEY || '',
    elevenLabsApiKey: config.elevenLabsApiKey || import.meta.env.VITE_ELEVENLABS_API_KEY || '',
    elevenLabsVoiceId: config.elevenLabsVoiceId || import.meta.env.VITE_ELEVENLABS_VOICE_ID || 'CwhRBWXzGAHq8TQ4Fs17',
    gatewayUrl: config.gatewayUrl || import.meta.env.VITE_GATEWAY_URL || 'http://localhost:18789',
    gatewayToken: config.gatewayToken || import.meta.env.VITE_GATEWAY_TOKEN || '',
  });

  // Check for microphone permission on mount
  useEffect(() => {
    navigator.permissions?.query({ name: 'microphone' as PermissionName }).then((result) => {
      if (result.state === 'prompt') {
        setShowPermissionHint(true);
      }
    }).catch(() => {
      // Permissions API not supported, show hint
      setShowPermissionHint(true);
    });
  }, []);

  const handleMicClick = async () => {
    if (isListening) {
      stopListening();
    } else if (isSpeaking) {
      stopSpeaking();
    } else {
      setShowPermissionHint(false);
      await startListening();
    }
  };

  const getStatusText = () => {
    if (isListening) return 'Listening... (tap to stop)';
    if (isProcessing) return 'Processing...';
    if (isSpeaking) return 'Speaking... (tap to stop)';
    return 'Tap to talk';
  };

  const getButtonState = () => {
    if (isListening) return { bg: 'bg-red-500', pulse: true, icon: 'stop' };
    if (isProcessing) return { bg: 'bg-yellow-500', pulse: true, icon: 'processing' };
    if (isSpeaking) return { bg: 'bg-green-500', pulse: true, icon: 'speaking' };
    return { bg: 'bg-emerald-600 hover:bg-emerald-700', pulse: false, icon: 'mic' };
  };

  const buttonState = getButtonState();
  const isDark = theme === 'dark';

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      {/* Expanded panel */}
      {isExpanded && (
        <div className={`mb-4 rounded-2xl shadow-2xl border overflow-hidden w-96 ${
          isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full bg-white ${buttonState.pulse ? 'animate-pulse' : ''}`}></div>
                <span className="font-semibold">Burt</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearConversation}
                  className="text-white/80 hover:text-white text-sm px-2 py-1 rounded hover:bg-white/10"
                  title="Clear conversation"
                >
                  Clear
                </button>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-white/80 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>
            <p className="text-sm text-emerald-100 mt-1">{getStatusText()}</p>
          </div>

          {/* Messages */}
          <div className={`p-4 max-h-80 overflow-y-auto ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
            {error && (
              <div className="bg-red-500/10 text-red-400 p-3 rounded-lg mb-3 text-sm border border-red-500/20">
                {error}
              </div>
            )}

            {showPermissionHint && !isListening && messages.length === 0 && (
              <div className={`p-3 rounded-lg mb-3 text-sm ${isDark ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20' : 'bg-blue-50 text-blue-700'}`}>
                💡 Click the microphone and allow browser access to start talking
              </div>
            )}

            {messages.length > 0 ? (
              <div className="space-y-3">
                {messages.map((msg, i) => (
                  <div key={i} className={msg.role === 'user' ? 'text-right' : ''}>
                    <p className="text-xs text-gray-500 mb-1">
                      {msg.role === 'user' ? 'You' : 'Burt'}
                    </p>
                    <p className={`inline-block p-3 rounded-lg text-sm max-w-[85%] ${
                      msg.role === 'user'
                        ? isDark ? 'bg-gray-700' : 'bg-gray-100'
                        : isDark ? 'bg-emerald-900/50 text-emerald-100' : 'bg-emerald-50 text-emerald-900'
                    }`}>
                      {msg.content}
                    </p>
                  </div>
                ))}
              </div>
            ) : !error && !showPermissionHint && (
              <p className="text-gray-500 text-sm text-center py-8">
                Press the mic button and start talking
              </p>
            )}

            {/* Current transcript (while processing) */}
            {transcript && isProcessing && (
              <div className="mt-3 text-right">
                <p className="text-xs text-gray-500 mb-1">You</p>
                <p className={`inline-block p-3 rounded-lg text-sm ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  {transcript}
                </p>
              </div>
            )}
          </div>

          {/* Visualizer bar (shows when listening) */}
          {isListening && (
            <div className="px-4 pb-4">
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main controls */}
      <div className="flex items-center gap-3 justify-end">
        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className={`shadow-lg rounded-full px-4 py-2 text-sm font-medium border transition-all ${
              isDark 
                ? 'bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700' 
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            Talk to Burt
          </button>
        )}

        <button
          onClick={handleMicClick}
          disabled={isProcessing}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${buttonState.bg} ${
            buttonState.pulse ? 'animate-pulse' : ''
          } ${isProcessing ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
        >
          {buttonState.icon === 'stop' ? (
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
          ) : buttonState.icon === 'processing' ? (
            <svg className="w-6 h-6 text-white animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : buttonState.icon === 'speaking' ? (
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1 1.93c-3.94-.49-7-3.85-7-7.93V7h2v1c0 2.76 2.24 5 5 5s5-2.24 5-5V7h2v1c0 4.08-3.06 7.44-7 7.93V19h4v2H8v-2h4v-3.07z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
