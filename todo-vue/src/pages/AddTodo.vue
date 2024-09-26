<template>
  <Dialog :open="inputIsInvalid" @close="confirmError" title="Invalid Input">
    <template #default>
      <p>Unfortunately, at least one input value is invalid.</p>
      <p>Please check all inputs and make sure you enter at least a few characters into each input field.</p>
    </template>
    <template #actions>
      <Button @click="confirmError">Okay</Button>
    </template>
  </Dialog>
  <h2 class="edit-todo-header custom-h2" :class="classAdd">Add Todo</h2>
  <Wrapper>
    <form class="edit-todo-form">
      <Input input-name="add-todo-name" :input-value="todoName" @change-input="handleChangeInput"></Input>
      <div class="edit-todo-form-div">
        <label for="description">Description</label>
        <textarea id="description" name="description" v-model="todoDescription"></textarea>
      </div>
    </form>
    <Button @click="handleSubmitEdit" title="Save"></Button>
  </Wrapper>
</template>

<script setup>
import { onUnmounted, onMounted, ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import { store } from "../composables/store.js";
import Wrapper from "../components/UI/Wrapper.vue";
import Button from "../components/UI/Button.vue";
import Dialog from "../components/UI/Dialog.vue";
import Input from "../components/UI/Input.vue";

// //Simple Custom Directives
// const vFocus = {
//     mounted: (el) => el.focus()
// }

const router = useRouter();
const todoName = ref("");
const todoDescription = ref("");
const inputIsInvalid = ref(false);
const classAdd = ref("");
const { addTodo } = store();

async function handleSubmitEdit() {
  if (todoName.value.trim() === "" || todoDescription.value.trim() === "") {
    inputIsInvalid.value = true;
    return;
  }
  //   addTodo(todoName.value, todoDescription.value);
  const createTodo = await fetch("http://localhost:5000/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: todoName.value,
      description: todoDescription.value,
    }),
  });
  console.log("createTodo", createTodo);

  if (createTodo.ok) {
    router.push("/");
  }
}
function confirmError() {
  inputIsInvalid.value = false;
}

function handleChangeInput(inputValue) {
  todoName.value = inputValue;
}

// demo use lifecycle hooks : onMounted và onUnmounted
let timer;
onMounted(() => {
  timer = setInterval(() => {
    if (classAdd.value) {
      classAdd.value = "";
    } else {
      classAdd.value = "change-color";
    }
  }, 1000);
});
onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style lang="scss" scoped>
@import "../scss/edit-todo.scss";
</style>
