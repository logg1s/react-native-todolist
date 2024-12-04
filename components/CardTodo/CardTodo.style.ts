import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    height: 100,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkIcon: {
    height: 30,
    width: 30,
  },
  title: {
    flexShrink: 1,
    fontSize: 24,
    fontWeight: "bold",
  },
});
