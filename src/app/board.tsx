import { globalStyles } from "@/styles/global";
import { Text, View } from "react-native";

export default function Board() {
  return (
    <View>
      <Text style={globalStyles.contentTitle}>Board</Text>
      <Text style={globalStyles.contentText}>
        Edit src/app/board.tsx to build this section.
      </Text>
    </View>
  );
}
