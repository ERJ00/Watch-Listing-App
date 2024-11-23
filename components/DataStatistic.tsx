//@ts-nocheck
import { StyleSheet, Text, View } from "react-native";
import storageUtils from "@/utils/storageUtils";
import { useEffect, useState } from "react";

export function DataStatistic() {
  const [total, setTotal] = useState(0);
  const [unfinished, setUnfinished] = useState(0);
  const [finished, setFinished] = useState(0);

  const dataStatistic = async () => {
    const userSession = await storageUtils.getUserSession();
    if (userSession) {
      const { total, unfinished, finished } =
        await storageUtils.getItemStatistics();
      setTotal(total);
      setUnfinished(unfinished);
      setFinished(finished);
    } else {
      setTotal(0);
      setUnfinished(0);
      setFinished(0);
    }
  };

  useEffect(() => {
    dataStatistic();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>TOTAL ITEM LISTED</Text>
      <Text style={styles.text}>{total}</Text>
      <Text style={styles.label}>FINISHED MOVIES/SERIES</Text>
      <Text style={styles.text}>{finished}</Text>
      <Text style={styles.label}>UNFINISHED MOVIES/SERIES</Text>
      <Text style={styles.text}>{unfinished}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
    marginBottom: 10,
  },

  label: {
    color: "#e0baba",
    fontSize: 12,
    fontStyle: "italic",
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },

  text: {
    color: "#ffd",
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
  },
});
