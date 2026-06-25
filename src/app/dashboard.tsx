import { globalStyles } from "@/styles/global";
import { Text, View } from "react-native";

export default function Dashboard() {
  return (
    <View>
      <Text style={globalStyles.contentTitle}>Dashboard</Text>
      <Text style={globalStyles.contentText}>
        Edit src/app/dashboard.tsx to build this section.
      </Text>
    </View>
  );
}
