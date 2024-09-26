import { createRouter, createWebHistory } from 'vue-router';
// import { defineAsyncComponent } from 'vue';

// import AddTodo from '../pages/AddTodo.vue';
// import EditTodo from '../pages/EditTodo.vue';
// import TodosList from '../pages/TodosList.vue';

const TodosList = () => import('../pages/TodosList.vue')
const EditTodo = () => import('../pages/EditTodo.vue')
const AddTodo = () => import('../pages/AddTodo.vue')


const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: TodosList },
      { path: '/add-todo', component: AddTodo },
      { path: '/edit-todo/:id', component: EditTodo, props:  true },
    ],
    linkActiveClass: 'header-active'
  });

  export default router