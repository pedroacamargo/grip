import * as schema from "@/db/schema";
import { players, type Player } from "@/db/schema";
import { desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useLiveQuery } from "drizzle-orm/expo-sqlite/query";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useMemo, useState } from "react";

export type NewPlayer = Pick<Player, "name" | "year" | "number">;

export function usePlayer() {
  const sqlite = useSQLiteContext();
  const db = useMemo(() => drizzle(sqlite, { schema }), [sqlite]);
  const [isSaving, setIsSaving] = useState(false);
  const [mutationError, setMutationError] = useState<string | null>(null);

  const playerQuery = useMemo(
    () => db.select().from(players).orderBy(desc(players.id)),
    [db]
  );

  const {
    data: playerRows,
    error: liveQueryError,
    updatedAt,
  } = useLiveQuery(playerQuery, [playerQuery]);

  const addPlayer = useCallback(
    async (player: NewPlayer) => {
      try {
        setIsSaving(true);
        setMutationError(null);
        await db.insert(players).values(player);
        return true;
      } catch (error) {
        setMutationError(getErrorMessage(error));
        return false;
      } finally {
        setIsSaving(false);
      }
    },
    [db]
  );

  return {
    players: playerRows,
    isLoading: !updatedAt && !liveQueryError,
    isSaving,
    error: mutationError ?? liveQueryError?.message ?? null,
    addPlayer,
  };
}

function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : "An unexpected database error occurred.";
}
