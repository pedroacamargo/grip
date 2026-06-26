import { colors, globalStyles } from "@/styles/global";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Fragment, useEffect, useState } from "react";
import { Pressable, View } from "react-native";

export const tabs = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: { ios: "chart.bar.fill", android: "dashboard", web: "dashboard" },
  },
  {
    label: "Players",
    href: "/players",
    icon: { ios: "person.2.fill", android: "groups", web: "groups" },
  },
  {
    label: "Board",
    href: "/board",
    icon: {
      ios: "sportscourt.fill",
      android: "strategy",
      web: "strategy",
    },
  },
] as const;

type SidebarProps = {
  activeTab: (typeof tabs)[number]["label"];
};

export function Sidebar({ activeTab }: SidebarProps) {
  const [selectedTab, setSelectedTab] = useState(activeTab);

  useEffect(() => {
    setSelectedTab(activeTab);
  }, [activeTab]);

  return (
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
          const isActive = tab.label === selectedTab;

          return (
            <Fragment key={tab.label}>
              <Link href={tab.href} asChild>
                <Pressable
                  onPress={() => setSelectedTab(tab.label)}
                  accessibilityLabel={tab.label}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: isActive }}
                  style={({ pressed }) => [
                    globalStyles.navItem,
                    isActive && globalStyles.navItemActive,
                    pressed && globalStyles.navItemPressed,
                  ]}
                >
                  <View
                    style={[
                      globalStyles.navIndicator,
                      !isActive && globalStyles.navIndicatorOff,
                    ]}
                  />
                  <SymbolView
                    name={tab.icon}
                    size={28}
                    tintColor={isActive ? colors.text : colors.textSecondary}
                  />
                </Pressable>
              </Link>
              {index < tabs.length - 1 ? (
                <View style={globalStyles.navSeparator} />
              ) : null}
            </Fragment>
          );
        })}
      </View>
    </View>
  );
}
