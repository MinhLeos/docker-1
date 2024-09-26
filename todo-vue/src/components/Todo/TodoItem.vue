<template>
  <Dialog :open="isShowDialog.todoIsDone" @close="confirmError" title="Edit">
    <template #default>
      <p>Unable to edit task done</p>
      <p>You cannot edit a task that has been completed before reopening the task.</p>
    </template>
    <template #actions>
      <Button @click="confirmError">Okay</Button>
    </template>
  </Dialog>
  <Dialog :open="isShowDialog.isDelete" @close="confirmDelete(false)" title="Delete">
    <template #default>
      <p id="next-tick" ref="nextTickDOM">You definitely want to delete this task?</p>
      <p>This will delete the data from memory and cannot be recovered. Are you sure you still want to continue?</p>
    </template>
    <template #actions>
      <Button @click="confirmDelete(false)">Cancel</Button>
      <Button @click="confirmDelete(true)">Delete</Button>
    </template>
  </Dialog>
  <Wrapper>
    <div class="todo-item-title">
      <h3 :id="props.name" class="text-[#50d71e]">{{ props.name }}</h3>
      <p :class="status.class" @click="handleChangeStatus">{{ status.title }}</p>
    </div>
    <div class="todo-item-description">
      <p v-for="des in listDes" :key="des">{{ des }}</p>
    </div>
    <p>
      <i>Id: {{ props.id }}</i>
    </p>
    <div class="mt-8">
      <Button title="Edit" action="edit" @click="editClick"></Button>
      <Button title="Delete" action="delete" :disable="isDisable" @click="deleteClick"></Button>
    </div>
  </Wrapper>
  <div v-if="isShowDialog.isDelete" id="demo">123</div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, computed, defineAsyncComponent, nextTick, watch, toRefs, reactive, onMounted } from "vue";
import { store } from "../../composables/store.js";
import Wrapper from "../UI/Wrapper.vue";
import Button from "../UI/Button.vue";
// import Dialog from '../UI/Dialog.vue';

// const Dialog = () => import('../UI/Dialog.vue') //>>> Dynamic Import , chỉ dc hỗ trợ bởi Vue Router
const Dialog = defineAsyncComponent(() => import("../UI/Dialog.vue")); // AsyncComponent
const nextTickDOM = ref();
const props = defineProps(["name", "description", "isDone", "id", "length"]);
const emit = defineEmits(["delete"]);

// const element = ref(null)

//use reactive
const isShowDialog = reactive({
  todoIsDone: false,
  isDelete: false,
});
// const todoIsDone = ref(false)
// const isDelete = ref(false)
const isDisable = ref(false);

const { changeStatus } = store();

const listDes = computed(() => {
  const list = props.description.split("\n");
  return list;
});

const { length } = toRefs(props);
// use watch to listen change of length to disable button delete
watch(
  length,
  (newValue) => {
    if (newValue === 1) {
      isDisable.value = true;
    }
  },
  { immediate: true }
);

const status = computed(() => {
  if (props.isDone) {
    return {
      class: "done",
      title: "Done",
    };
  }
  return {
    class: "active",
    title: "New",
  };
});

const router = useRouter();
function editClick() {
  if (props.isDone) {
    isShowDialog.todoIsDone = true;
    return;
  }
  router.push("/edit-todo/" + props.id);
}

function deleteClick() {
  if (props.length === 1) {
    return;
  }
  isShowDialog.isDelete = true;

  nextTick(() => {
    //Do Dialog đang là AsyncComponent nên phải đưa vào setTimeout để đợi tải xong component này
    //thì mới lấy được element
    // hoặc có thể chuyển về import Dialog như bình thường (ko phải asyncComponent)
    // thì ko cần setTimeout cũng lấy được element
    setTimeout(() => {
      const element = document.querySelector("#next-tick");

      if (element && isShowDialog.isDelete === true) {
        element.style.color = "red";
      }
    }, 100);
  });
}

function handleChangeStatus() {
  changeStatus(props.id);
}
function confirmError() {
  isShowDialog.todoIsDone = false;
}
function confirmDelete(confirm) {
  isShowDialog.isDelete = false;
  if (confirm) {
    emit("delete", props.id);
  }
}
watch(
  () => nextTickDOM.value,
  (val) => {
    // console.log("nextTickDOM 123", val);
  }
);
</script>

<style lang="scss" scoped>
@import "../../scss/todo-item.scss";
</style>
