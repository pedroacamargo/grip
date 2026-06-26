import { usePlayer } from "@/db/usePlayer";
import { colors, globalStyles } from "@/styles/global";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Players() {
  const { players, isLoading, isSaving, error, addPlayer } = usePlayer();
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [number, setNumber] = useState("");

  const handleAddPlayer = async () => {
    const parsedYear = Number(year);
    const parsedNumber = Number(number);

    if (
      !name.trim() ||
      !Number.isInteger(parsedYear) ||
      !Number.isInteger(parsedNumber)
    ) {
      Alert.alert(
        "Missing player details",
        "Enter a name, whole-number year, and jersey number."
      );
      return;
    }

    const wasAdded = await addPlayer({
      name: name.trim(),
      year: parsedYear,
      number: parsedNumber,
    });

    if (wasAdded) {
      setName("");
      setYear("");
      setNumber("");
    }
  };

  return (
    <View style={styles.screen}>
      <Text style={globalStyles.contentTitle}>Players</Text>
      <Text style={[globalStyles.contentText, styles.intro]}>
        A tiny Drizzle debugger for the local SQLite database.
      </Text>

      <View style={styles.form}>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Player name"
          placeholderTextColor={colors.textSecondary}
          style={[styles.input, styles.nameInput]}
        />
        <TextInput
          value={year}
          onChangeText={setYear}
          placeholder="Year"
          placeholderTextColor={colors.textSecondary}
          keyboardType="number-pad"
          style={styles.input}
        />
        <TextInput
          value={number}
          onChangeText={setNumber}
          placeholder="#"
          placeholderTextColor={colors.textSecondary}
          keyboardType="number-pad"
          style={styles.input}
        />
        <Pressable
          onPress={handleAddPlayer}
          disabled={isSaving}
          style={({ pressed }) => [
            styles.button,
            (pressed || isSaving) && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>
            {isSaving ? "Adding…" : "Add player"}
          </Text>
        </Pressable>
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Database rows ({players.length})</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator color={colors.primary} />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(player) => String(player.id)}
          contentContainerStyle={players.length === 0 && styles.emptyList}
          ListEmptyComponent={
            <Text style={globalStyles.empty}>No players yet. Add one above.</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.playerName}>{item.name}</Text>
              <Text style={styles.playerMeta}>
                #{item.number} · {item.year} · id {item.id}
              </Text>
            </View>
          )}
        />
      )}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  intro: { marginBottom: 20 },
  form: { flexDirection: "row", gap: 10, marginBottom: 24 },
  input: {
    minWidth: 74,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    color: colors.text,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  nameInput: { flex: 1 },
  button: {
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
  },
  buttonPressed: { opacity: 0.72 },
  buttonText: { color: colors.background, fontWeight: "700" },
  listHeader: { marginBottom: 10 },
  listTitle: { color: colors.text, fontSize: 16, fontWeight: "700" },
  emptyList: { flexGrow: 1, justifyContent: "center", alignItems: "center" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 14,
  },
  playerName: { color: colors.text, fontSize: 16, fontWeight: "600" },
  playerMeta: { color: colors.textSecondary, fontSize: 14 },
  error: { color: colors.alert, marginTop: 12 },
});
