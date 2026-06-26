import * as schema from "@/db/schema";
import { players, type Player } from "@/db/schema";
import { desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useMemo, useState } from "react";

export type NewPlayer = Pick<Player, "name" | "year" | "number">;

export function usePlayer() {
  const sqlite = useSQLiteContext();
  const db = useMemo(() => drizzle(sqlite, { schema }), [sqlite]);
  const [playerRows, setPlayerRows] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshPlayers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const rows = await db.select().from(players).orderBy(desc(players.id));
      setPlayerRows(rows);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, [db]);

  // Refresh players when the component mounts
  // This ensures that the player list is up-to-date when the component is first rendered
  useEffect(() => {
    void refreshPlayers();
  }, [refreshPlayers]);

  const addPlayer = useCallback(
    async (player: NewPlayer) => {
      try {
        setIsSaving(true);
        setError(null);
        await db.insert(players).values(player);
        await refreshPlayers();
        return true;
      } catch (error) {
        setError(getErrorMessage(error));
        return false;
      } finally {
        setIsSaving(false);
      }
    },
    [db, refreshPlayers]
  );

  return {
    players: playerRows,
    isLoading,
    isSaving,
    error,
    refreshPlayers,
    addPlayer,
  };
}

function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : "An unexpected database error occurred.";
}
