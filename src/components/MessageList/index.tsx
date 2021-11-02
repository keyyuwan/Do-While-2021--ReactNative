import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { io } from "socket.io-client";
import { api } from "../../services/api";

import { MESSAGES_EXAMPLE } from "../../utils/messages";

import { Message, MessageProps } from "../Message";

import { styles } from "./styles";

let messagesQueue: MessageProps[] = MESSAGES_EXAMPLE;

const socket = io(String(api.defaults.baseURL));
socket.on("new_message", (newMessage) => {
  messagesQueue.push(newMessage);
});

export function MessageList() {
  const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([]);

  useEffect(() => {
    async function getMessages() {
      const response = await api.get("/messages/last3");

      setCurrentMessages(response.data);
    }

    getMessages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setCurrentMessages((prevState) => [
          messagesQueue[0],
          prevState[0],
          prevState[1],
        ]);

        // retira o 1 elemento
        // já to mostrando a primeira msg na tela, ent ela nn precisa ficar na fila
        messagesQueue.shift();
      }
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {currentMessages.map((message) => (
        <Message key={message.id} data={message} />
      ))}
    </ScrollView>
  );
}
