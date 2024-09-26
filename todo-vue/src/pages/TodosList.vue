<template>
  <h2 class="todo-list-header custom-h2">Todos</h2>
  <Suspense>
    <template #default>
      <div v-if="todos.length" class="todo-list-item">
        <TodoItem
          v-for="todo in todos"
          :name="todo.name"
          :description="todo.description"
          :is-done="todo.isDone"
          :key="todo.id"
          :id="todo.id"
          :length="todos.length"
          @delete="deleteTodoItem"
        ></TodoItem>
      </div>
      <div v-else class="text-red-500 text-center">Have no Todo</div>
    </template>
    <template #fallback>
      <div class="loading">Loading 1 2 3 ...</div>
    </template>
  </Suspense>
</template>

<script setup>
import { ref } from "vue";
import TodoItem from "../components/Todo/TodoItem.vue";

const todos = ref([]);

const getTodos = async () => {
  const todoRes = await fetch("http://localhost:5000/todo");
  if (todoRes.ok) {
    todos.value = await todoRes.json();
    console.log("todos.value", todos.value);
  }
};
getTodos();

const deleteTodoItem = async (id) => {
  const deleteRes = await fetch(`http://localhost:5000/todo/${id}`, {
    method: "DELETE",
  });
  if (deleteRes.ok) {
    await getTodos();
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/todo-list.scss";
</style>
