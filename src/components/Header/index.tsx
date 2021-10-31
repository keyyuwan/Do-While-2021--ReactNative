import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { useAuth } from "../../hooks/Auth";

import { UserAvatar } from "../UserAvatar";

import LogoSvg from "../../assets/logo.svg";
import { styles } from "./styles";

export function Header() {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <LogoSvg />

      <View style={styles.logoutButton}>
        <TouchableOpacity>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>

        <UserAvatar imageUri={user?.avatar_url} />
      </View>
    </View>
  );
}
