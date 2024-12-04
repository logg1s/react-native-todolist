import { Alert, Keyboard, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./App.style";
import { Header } from "./components/Header/Header";
import { CardTodo } from "./components/CardTodo/CardTodo";
import { useEffect, useRef, useState } from "react";
import { Footer } from "./components/Footer/Footer";
import { FilterModeEnum } from "./utils/enums/filterMode";
import { TodoCountType, TodoListType, TodoType } from "./utils/types/todo";
import { ButtonAddTodo } from "./components/ButtonAddTodo/ButtonAddTodo";
import Dialog from "react-native-dialog";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ASYNC_STORAGE_TODO_LIST_KEY } from "./utils/constants";

export default function App() {
  const [todoList, setTodoList] = useState<TodoListType>([]);
  const [currentFilterMode, setCurrentFilterMode] = useState<FilterModeEnum>(
    FilterModeEnum.ALL
  );
  const [isVisibleDialog, setIsVisibleDialog] = useState<boolean>(false);
  const [newTodoName, setNewTodoName] = useState<string>("");
  const isFirstRender = useRef<boolean>(true);
  const isLoadFromStorage = useRef<boolean>(false);

  useEffect(() => {
    loadTodoListFromStorage();
  }, []);

  useEffect(() => {
    if (isFirstRender?.current) {
      isFirstRender.current = false;
      return;
    }
    if (isLoadFromStorage?.current) {
      isLoadFromStorage.current = false;
      return;
    }
    saveTodoListIntoStorage();
  }, [todoList]);

  async function loadTodoListFromStorage() {
    try {
      const todoListString: string =
        (await AsyncStorage.getItem(ASYNC_STORAGE_TODO_LIST_KEY)) || "[]";
      const parsedTodoList: TodoListType = JSON.parse(todoListString) || [];
      isLoadFromStorage.current = true;
      setTodoList(parsedTodoList);
    } catch (error) {
      alert(error);
    }
  }

  async function saveTodoListIntoStorage() {
    try {
      const todoListString = JSON.stringify(todoList);
      await AsyncStorage.setItem(ASYNC_STORAGE_TODO_LIST_KEY, todoListString);
    } catch (error) {
      alert(error);
    }
  }

  function getFilteredTodoList() {
    switch (currentFilterMode) {
      case FilterModeEnum.IN_PROGRESS:
        return todoList.filter((todo) => !todo.isCompleted);
      case FilterModeEnum.DONE:
        return todoList.filter((todo) => todo.isCompleted);
      default:
        return todoList;
    }
  }

  function renderTodoList() {
    return getFilteredTodoList().map((todo) => (
      <CardTodo
        key={todo.id}
        todo={todo}
        onPressTodo={updateTodoStatus}
        onLongPressTodo={deleteTodo}
      />
    ));
  }

  function updateTodoStatus(todo: TodoType) {
    setTodoList((prevTodoList) =>
      prevTodoList.map((prevTodo) =>
        prevTodo.id === todo.id
          ? { ...prevTodo, isCompleted: !prevTodo.isCompleted }
          : prevTodo
      )
    );
  }

  function deleteTodo(todo: TodoType) {
    Alert.alert("Delete to do?", "Are you sure to delete this to do ?", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => handleDeleteTodoPress(todo),
      },
    ]);
  }

  function handleDeleteTodoPress(todo: TodoType) {
    setTodoList((prevTodoList) =>
      prevTodoList.filter((prevTodo) => prevTodo.id !== todo.id)
    );
  }

  function getTodoCountByFilterMode(): TodoCountType {
    const initialTodoCount: TodoCountType = {
      [FilterModeEnum.ALL]: todoList.length,
      [FilterModeEnum.DONE]: 0,
      [FilterModeEnum.IN_PROGRESS]: 0,
    };

    return todoList.reduce((acc, todo) => {
      if (todo.isCompleted) {
        acc[FilterModeEnum.DONE]++;
      } else if (!todo.isCompleted) {
        acc[FilterModeEnum.IN_PROGRESS]++;
      }
      return acc;
    }, initialTodoCount);
  }

  function onSaveNewTodo() {
    const newTodo: TodoType = {
      id: uuid.v4(),
      title: newTodoName,
      isCompleted: false,
    };
    setTodoList((prevTodoList) => prevTodoList.concat(newTodo));
    setNewTodoName("");
    setIsVisibleDialog(false);
  }
  function renderAddNewTodoDialog() {
    return (
      <Dialog.Container
        visible={isVisibleDialog}
        onBackdropPress={() => setIsVisibleDialog(false)}
      >
        <Dialog.Title>Add new to do</Dialog.Title>
        <Dialog.Description>Input new to do name</Dialog.Description>
        <Dialog.Input
          placeholder="Ex: Go to the dentist"
          onChangeText={setNewTodoName}
          value={newTodoName}
          autoFocus={true}
        />
        <Dialog.Button
          label="Cancel"
          onPress={() => {
            setIsVisibleDialog(false);
            setNewTodoName("");
          }}
        />
        <Dialog.Button
          label="Save"
          disabled={newTodoName.trim().length === 0}
          style={newTodoName.trim().length === 0 && { color: "#888888" }}
          onPress={onSaveNewTodo}
        />
      </Dialog.Container>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={s.root}>
        <View style={s.header}>
          <Header
            onPressLogo={() => setCurrentFilterMode(FilterModeEnum.ALL)}
          />
          <ButtonAddTodo onPressAddTodo={() => setIsVisibleDialog(true)} />
        </View>
        <View style={s.body}>
          <ScrollView contentContainerStyle={s.scrollView}>
            {renderTodoList()}
          </ScrollView>
        </View>
        <View style={s.footer}>
          <Footer
            onPressFilterMode={setCurrentFilterMode}
            currentFilterMode={currentFilterMode}
            todoCount={getTodoCountByFilterMode()}
          />
        </View>
        {renderAddNewTodoDialog()}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
