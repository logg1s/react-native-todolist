import { Image, Text, TouchableOpacity, View } from "react-native";
import { s } from "./Header.style";

export function Header({ onPressLogo }: { onPressLogo: () => void }) {
  return (
    <View style={s.header}>
      <TouchableOpacity onPress={onPressLogo}>
        <Image
          source={require("../../assets/logo.png")}
          style={s.logo}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={s.title}>You probably have something to do </Text>
    </View>
  );
}
