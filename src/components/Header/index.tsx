import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { UserAvatar } from "../UserAvatar";

import LogoSvg from "../../assets/logo.svg";
import { styles } from "./styles";

export function Header() {
  return (
    <View style={styles.container}>
      <LogoSvg />

      <View style={styles.logoutButton}>
        <TouchableOpacity>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>

        <UserAvatar imageUri="https://github.com/keyyuwan.png" />
      </View>
    </View>
  );
}
