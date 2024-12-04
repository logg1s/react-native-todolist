import { Text, TouchableOpacity } from "react-native";
import { s } from "./ButtonAddTodo.style";

export function ButtonAddTodo({
  onPressAddTodo,
}: {
  readonly onPressAddTodo: () => void;
}) {
  return (
    <TouchableOpacity style={s.btnAdd} onPress={onPressAddTodo}>
      <Text style={s.text}>+ New Todo</Text>
    </TouchableOpacity>
  );
}
