import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";

import { api } from "../../services/api";

import { Message, MessageProps } from "../Message";

import { styles } from "./styles";

export function MessageList() {
  const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([]);

  useEffect(() => {
    async function getMessages() {
      const response = await api.get("/messages/last3");

      setCurrentMessages(response.data);
    }

    getMessages();
  }, []);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {currentMessages.map((message) => (
        <Message data={message} key={message.id} />
      ))}
    </ScrollView>
  );
}
