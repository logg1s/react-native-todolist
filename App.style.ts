import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  body: {
    flex: 15,
  },
  footer: {
    alignItems: "center",
    backgroundColor: "rgba(212 212 212 / 0.56)",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 10,
  },
  header: {
    flex: 1,
    justifyContent: "space-between",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  root: {
    backgroundColor: "#F9F9F9",
    flex: 1,
  },
  scrollView: {
    gap: 20,
    padding: 10,
  },
});
