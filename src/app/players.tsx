import { globalStyles } from "@/styles/global";
import { Text, View } from "react-native";

export default function Players() {
  return (
    <View>
      <Text style={globalStyles.contentTitle}>Players</Text>
      <Text style={globalStyles.contentText}>
        Edit src/app/players.tsx to build this section.
      </Text>
    </View>
  );
}
