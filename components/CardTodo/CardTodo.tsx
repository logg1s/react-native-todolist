import { Image, Text, TouchableOpacity } from "react-native";
import { s } from "./CardTodo.style";
import { TodoType } from "../../utils/types/todo";

export function CardTodo({
  todo,
  onPressTodo,
  onLongPressTodo,
}: {
  readonly todo: TodoType;
  readonly onPressTodo: (todo: TodoType) => void;
  readonly onLongPressTodo: (todo: TodoType) => void;
}) {
  return (
    <TouchableOpacity
      style={s.card}
      onPress={() => onPressTodo(todo)}
      onLongPress={() => onLongPressTodo(todo)}
    >
      <Text
        style={[
          s.title,
          todo.isCompleted && { textDecorationLine: "line-through" },
        ]}
      >
        {todo.title}
      </Text>
      {todo.isCompleted && (
        <Image style={s.checkIcon} source={require("../../assets/check.png")} />
      )}
    </TouchableOpacity>
  );
}
