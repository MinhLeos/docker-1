<template>
  <Dialog @close="confirmError" title="Invalid Input" :open="inputIsInvalid">
    <template #default>
      <p>Unfortunately, at least one input value is invalid.</p>
      <p>Please check all inputs and make sure you enter at least a few characters into each input field.</p>
    </template>
    <template #actions>
      <Button @click="confirmError">Okay</Button>
    </template>
  </Dialog>
  <h2 class="edit-todo-header custom-h2">Edit Todo</h2>
  <Wrapper>
    <form class="edit-todo-form">
      <div class="edit-todo-form-div">
        <label for="name">Name</label>
        <input id="name" name="name" :value="todo.name" @input="changeName" />
      </div>
      <div class="edit-todo-form-div">
        <label for="description">Description</label>
        <textarea id="description" name="description" @input="changeDescription">{{ todo.description }}</textarea>
      </div>
    </form>
    <Button @click="handleSubmitEdit" title="Save"></Button>
  </Wrapper>
</template>

<script setup>
import { ref, computed, toRefs } from "vue";
import { useRouter } from "vue-router";
import Wrapper from "../components/UI/Wrapper.vue";
import Button from "../components/UI/Button.vue";
import Dialog from "../components/UI/Dialog.vue";

const props = defineProps(["id"]);
const router = useRouter();
const todo = ref({ name: "", description: "" });

const inputIsInvalid = ref(false);
const getTodoById = async (id) => {
  const todoRes = await fetch(`http://localhost:5000/todo/${id}`);
  if (todoRes.ok) {
    const dataTodo = await todoRes.json();
    console.log("dataTodo", dataTodo);

    todo.value = {
      name: dataTodo.name,
      description: dataTodo.description,
    };
    console.log("todo.value getTodoById", todo.value);
  }
};
getTodoById(props.id);
function changeName(event) {
  todo.value.name = event.target.value;
}
function changeDescription(event) {
  todo.value.description = event.target.value;
}
async function handleSubmitEdit() {
  console.log("todo.value handleSubmitEdit", todo.value);

  if (todo.value.name.trim() === "" || todo.value.description.trim() === "") {
    inputIsInvalid.value = true;
    return;
  }
  const todoRes = await fetch(`http://localhost:5000/todo/${props.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo.value),
  });
  if (todoRes.ok) {
    router.push("/");
  }
}
function confirmError() {
  inputIsInvalid.value = false;
}
</script>

<style lang="scss" scoped>
@import "../scss/edit-todo.scss";
</style>
