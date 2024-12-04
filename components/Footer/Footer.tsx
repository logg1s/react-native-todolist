import {
  StyleProp,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { s } from "./Footer.style";
import { FilterModeEnum } from "../../utils/enums/filterMode";
import { TodoCountType } from "../../utils/types/todo";

export function Footer({
  onPressFilterMode,
  currentFilterMode,
  todoCount,
}: {
  readonly onPressFilterMode: (filterMode: FilterModeEnum) => void;
  readonly currentFilterMode: FilterModeEnum;
  readonly todoCount: TodoCountType;
}) {
  function getFilterModeStyle(
    renderedFilterMode: FilterModeEnum
  ): StyleProp<TextStyle> {
    return {
      color: renderedFilterMode === currentFilterMode ? "#2F76E5" : "black",
      fontWeight: "bold",
    };
  }
  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => onPressFilterMode(FilterModeEnum.ALL)}
      >
        <View style={s.containerFilterMode}>
          <Text style={getFilterModeStyle(FilterModeEnum.ALL)}>
            All ({todoCount[FilterModeEnum.ALL]})
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <View style={s.verticalLine} />
      <TouchableWithoutFeedback
        onPress={() => onPressFilterMode(FilterModeEnum.IN_PROGRESS)}
      >
        <View style={s.containerFilterMode}>
          <Text style={getFilterModeStyle(FilterModeEnum.IN_PROGRESS)}>
            In progress ({todoCount[FilterModeEnum.IN_PROGRESS]})
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <View style={s.verticalLine} />
      <TouchableWithoutFeedback
        onPress={() => onPressFilterMode(FilterModeEnum.DONE)}
      >
        <View style={s.containerFilterMode}>
          <Text style={getFilterModeStyle(FilterModeEnum.DONE)}>
            Done ({todoCount[FilterModeEnum.DONE]})
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}
