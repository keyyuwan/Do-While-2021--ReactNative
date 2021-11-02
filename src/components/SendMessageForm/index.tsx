import React, { useState } from "react";
import { View, TextInput, Alert, Keyboard } from "react-native";
import { api } from "../../services/api";
import { COLORS } from "../../theme";

import { Button } from "../Button";

import { styles } from "./styles";

export function SendMessageForm() {
  const [message, setMessage] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  async function handleMessageSubmit() {
    const messageFormatted = message.trim();

    if (messageFormatted.length > 0) {
      setIsSendingMessage(true);

      await api.post("/messages", { message: messageFormatted });

      setMessage("");
      Keyboard.dismiss();
      setIsSendingMessage(false);
      Alert.alert("Mensagem enviada com sucesso.");
    } else {
      Alert.alert("Escreva a mensagem para enviar.");
    }
  }
  return (
    <View style={styles.container}>
      {/* keyboardAppearance -> no IOS */}
      <TextInput
        style={styles.input}
        keyboardAppearance="dark"
        placeholder="Qual sua expectativa para o evento?"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        onChangeText={setMessage}
        value={message}
        editable={!isSendingMessage}
      />

      <Button
        title="ENVIAR MENSAGEM"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        isLoading={isSendingMessage}
        onPress={handleMessageSubmit}
      />
    </View>
  );
}
