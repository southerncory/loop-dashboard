import { useState, useCallback, useRef, useEffect } from 'react';

interface GatewayConfig {
  gatewayUrl: string;
  token: string;
  agentId?: string;
  sessionKey?: string;
}

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ConversationState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export function useGateway(config: GatewayConfig) {
  const [state, setState] = useState<ConversationState>({
    messages: [],
    isLoading: false,
    error: null,
  });

  const sessionIdRef = useRef<string>(`voice-${Date.now()}`);

  // Send a message and get a response via chat completions
  const sendMessage = useCallback(async (userMessage: string): Promise<string> => {
    setState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      messages: [...prev.messages, { role: 'user', content: userMessage }],
    }));

    try {
      const response = await fetch(`${config.gatewayUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.token}`,
          'x-openclaw-agent-id': config.agentId || 'main',
        },
        body: JSON.stringify({
          model: 'openclaw',
          messages: [
            ...state.messages,
            { role: 'user', content: userMessage },
          ],
          user: sessionIdRef.current, // Maintains session continuity
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`Gateway error: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = data.choices?.[0]?.message?.content || '';

      setState(prev => ({
        ...prev,
        isLoading: false,
        messages: [...prev.messages, { role: 'assistant', content: assistantMessage }],
      }));

      return assistantMessage;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to send message';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMsg,
      }));
      throw err;
    }
  }, [config.gatewayUrl, config.token, config.agentId, state.messages]);

  // Clear conversation
  const clearConversation = useCallback(() => {
    setState({
      messages: [],
      isLoading: false,
      error: null,
    });
    sessionIdRef.current = `voice-${Date.now()}`;
  }, []);

  return {
    ...state,
    sendMessage,
    clearConversation,
  };
}

// WebSocket hook for real-time communication (for future UI command execution)
export function useGatewayWebSocket(config: GatewayConfig) {
  const [connected, setConnected] = useState(false);
  const [lastEvent, setLastEvent] = useState<any>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number | undefined>(undefined);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    const wsUrl = config.gatewayUrl.replace('http://', 'ws://').replace('https://', 'wss://');
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      // Send connect handshake
      ws.send(JSON.stringify({
        type: 'req',
        id: `connect-${Date.now()}`,
        method: 'connect',
        params: {
          minProtocol: 3,
          maxProtocol: 3,
          client: {
            id: 'burt-voice',
            version: '1.0.0',
            platform: 'web',
            mode: 'operator',
          },
          role: 'operator',
          scopes: ['operator.read', 'operator.write'],
          caps: [],
          commands: [],
          permissions: {},
          auth: { token: config.token },
          locale: navigator.language,
          userAgent: 'burt-voice/1.0.0',
        },
      }));
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        if (data.type === 'res' && data.payload?.type === 'hello-ok') {
          setConnected(true);
        }
        
        setLastEvent(data);
      } catch (e) {
        console.error('Failed to parse WS message:', e);
      }
    };

    ws.onclose = () => {
      setConnected(false);
      // Reconnect after 3 seconds
      reconnectTimeoutRef.current = window.setTimeout(connect, 3000);
    };

    ws.onerror = (err) => {
      console.error('WebSocket error:', err);
    };

    wsRef.current = ws;
  }, [config.gatewayUrl, config.token]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    wsRef.current?.close();
    wsRef.current = null;
    setConnected(false);
  }, []);

  const send = useCallback((method: string, params: any) => {
    if (wsRef.current?.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket not connected');
    }

    const message = {
      type: 'req',
      id: `${method}-${Date.now()}`,
      method,
      params,
    };

    wsRef.current.send(JSON.stringify(message));
  }, []);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    connected,
    lastEvent,
    connect,
    disconnect,
    send,
  };
}
