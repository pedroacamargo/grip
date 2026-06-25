import { colors, globalStyles } from "@/styles/global";
import { Image } from "expo-image";
import { SymbolView } from "expo-symbols";
import { Fragment, useState } from "react";
import { Pressable, Text, View } from "react-native";

const tabs = [
  {
    label: "Dashboard",
    icon: { ios: "chart.bar.fill", android: "dashboard", web: "dashboard" },
  },
  {
    label: "Players",
    icon: { ios: "person.2.fill", android: "groups", web: "groups" },
  },
  {
    label: "Board",
    icon: {
      ios: "rectangle.grid.2x2.fill",
      android: "grid_view",
      web: "grid_view",
    },
  },
] as const;

export default function Index() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["label"]>(
    tabs[0].label,
  );

  return (
    <View style={globalStyles.appShell}>
      <View style={globalStyles.sidebar}>
        <View style={globalStyles.logoMark}>
          <Image
            source={require("../../assets/imgs/logo.png")}
            style={globalStyles.logoImage}
            contentFit="contain"
          />
        </View>

        <View style={globalStyles.nav}>
          {tabs.map((tab, index) => {
            const isActive = tab.label === activeTab;

            return (
              <Fragment key={tab.label}>
                <Pressable
                  accessibilityLabel={tab.label}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: isActive }}
                  onPress={() => setActiveTab(tab.label)}
                  style={({ pressed }) => [
                    globalStyles.navItem,
                    isActive && globalStyles.navItemActive,
                    pressed && globalStyles.navItemPressed,
                  ]}
                >
                  {isActive ? <View style={globalStyles.navIndicator} /> : null}
                  <SymbolView
                    name={tab.icon}
                    size={28}
                    tintColor={isActive ? colors.text : colors.textSecondary}
                  />
                </Pressable>
                {index < tabs.length - 1 ? (
                  <View style={globalStyles.navSeparator} />
                ) : null}
              </Fragment>
            );
          })}
        </View>
      </View>

      <View style={globalStyles.mainArea}>
        <View style={globalStyles.topbar}>
          <Text style={globalStyles.topbarTitle}></Text>
        </View>

        <View style={globalStyles.content}>
          <Text style={globalStyles.contentTitle}>{activeTab}</Text>
          <Text style={globalStyles.contentText}>
            Edit src/app/index.tsx to build this section.
          </Text>
        </View>
      </View>
    </View>
  );
}
