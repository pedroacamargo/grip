import { colors, globalStyles } from "@/styles/global";
import { useBatteryLevel } from "expo-battery";
import { SymbolView } from "expo-symbols";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

type NavbarProps = {
  title: string;
};

const batteryIcons = {
  unknown: {
    ios: "battery.0percent",
    android: "battery_unknown",
    web: "battery_unknown",
  },
  quarter: {
    ios: "battery.25percent",
    android: "battery_1_bar",
    web: "battery_1_bar",
  },
  half: {
    ios: "battery.50percent",
    android: "battery_3_bar",
    web: "battery_3_bar",
  },
  threeQuarter: {
    ios: "battery.75percent",
    android: "battery_5_bar",
    web: "battery_5_bar",
  },
  full: {
    ios: "battery.100percent",
    android: "battery_full",
    web: "battery_full",
  },
} as const;

function formatTime(date: Date) {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getBatteryIconName(batteryLevel: number) {
  if (batteryLevel < 0) {
    return batteryIcons.unknown;
  }

  if (batteryLevel <= 0.25) {
    return batteryIcons.quarter;
  }

  if (batteryLevel <= 0.5) {
    return batteryIcons.half;
  }

  if (batteryLevel <= 0.75) {
    return batteryIcons.threeQuarter;
  }

  return batteryIcons.full;
}

export function Navbar({ title }: NavbarProps) {
  const batteryLevel = useBatteryLevel();
  const [time, setTime] = useState(() => formatTime(new Date()));
  const batteryPercentage =
    batteryLevel >= 0 ? `${Math.round(batteryLevel * 100)}%` : "--";
  const batteryIconName = getBatteryIconName(batteryLevel);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000 * 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={globalStyles.topbar}>
      <Text style={globalStyles.topbarTitle}>{title}</Text>

      <View style={globalStyles.navbarStatus}>
        <View style={globalStyles.navbarStatusItem}>
          <SymbolView
            name={batteryIconName}
            size={20}
            tintColor={colors.text}
          />
          <Text style={globalStyles.navbarStatusText}>{batteryPercentage}</Text>
        </View>

        <Text style={globalStyles.navbarStatusText}>{time}</Text>
      </View>
    </View>
  );
}
