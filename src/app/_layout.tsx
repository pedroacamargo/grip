import { Navbar } from "@/components/Navbar";
import { Sidebar, tabs } from "@/components/Sidebar";
import { globalStyles } from "@/styles/global";
import { Slot, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export default function RootLayout() {
  const pathname = usePathname();
  const activeTab =
    tabs.find((tab) => pathname === tab.href)?.label ?? tabs[0].label;

  return (
    <>
      <StatusBar hidden />
      <View style={globalStyles.appShell}>
        <Sidebar activeTab={activeTab} />

        <View style={globalStyles.mainArea}>
          <Navbar title={activeTab} />

          <View style={globalStyles.content}>
            <Slot />
          </View>
        </View>
      </View>
    </>
  );
}
