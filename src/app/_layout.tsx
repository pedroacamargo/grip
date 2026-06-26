import { Navbar } from "@/components/Navbar";
import { Sidebar, tabs } from "@/components/Sidebar";
import * as schema from "@/db/schema";
import { globalStyles } from "@/styles/global";
import migrations from "../../drizzle/migrations";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import { Slot, usePathname } from "expo-router";
import { SQLiteProvider, type SQLiteDatabase } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { Suspense } from "react";
import { ActivityIndicator, View } from "react-native";

export const DATABASE_NAME = "kouci.db";

async function initializeDatabase(sqlite: SQLiteDatabase) {
  const db = drizzle(sqlite, { schema });
  await migrate(db, migrations);
}

export default function RootLayout() {
  const pathname = usePathname();
  const activeTab =
    tabs.find((tab) => pathname === tab.href)?.label ?? tabs[0].label;

  return (
    <Suspense fallback={<ActivityIndicator size="large" color="#0000ff" />}>
      <SQLiteProvider
        databaseName={DATABASE_NAME}
        onInit={initializeDatabase}
        options={{ enableChangeListener: true }}
        useSuspense
      >
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
      </SQLiteProvider>
    </Suspense>
  );
}
