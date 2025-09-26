import { useEffect, useRef } from "react";
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from 'sockjs-client';

type CallbackType = (message: any) => void;

export const  useWebSocket = (
  endpoint: string,
  topic: string,
  onMessage: CallbackType) => {
  const stompClient = useRef<CompatClient | null>(null);
  const jwtToken = localStorage.getItem("jwtToken")

  useEffect(() => {
    const socket = new SockJS(endpoint);
    stompClient.current = Stomp.over(socket);
    stompClient.current.debug = () => {};

    stompClient.current.connect(
      { Authorization: 'Bearer ' + jwtToken },
      () => {
        if (stompClient.current) {
          stompClient.current.subscribe(topic, (message) => {
            if (message.body) {
              onMessage(JSON.parse(message.body));
            }
          });
        }
      },
      (error:any) => {
        console.error("WebSocket connection error:", error);
      }
    );

    return () => {
      stompClient.current?.disconnect();
    };
  }, [endpoint, jwtToken, topic, onMessage]);
}