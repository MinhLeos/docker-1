import { reactive, shallowReadonly } from 'vue';
import DUMMY_TODO_DATA from '../ultis/dummy-data.js';

export function store() {

    const TODOS_LIST = reactive(DUMMY_TODO_DATA)

    function deleteOneTodo(id) {
        const idx = TODOS_LIST.findIndex(todo => todo.id === id)
        if (idx > -1) {
            TODOS_LIST.splice(idx, 1)
        }
    }

    function addTodo(name, description){
        const newTodo = {
            id: Math.random().toString(),
            name,
            description,
            isDone: false,
            createdAt: new Date()
        }
        TODOS_LIST.unshift(newTodo)
    }

    function editTodo(id, name, description) {
        const idx = TODOS_LIST.findIndex(todo => todo.id === id)
        if (idx > -1) {
            TODOS_LIST[idx].name = name
            TODOS_LIST[idx].description = description
        }
    }
    function changeStatus(id) {
        const idx = TODOS_LIST.findIndex(todo => todo.id === id)
        if (idx > -1) {
            TODOS_LIST[idx].isDone = !TODOS_LIST[idx].isDone
        }
    }

    return { TODOS_LIST: shallowReadonly(TODOS_LIST), addTodo, deleteOneTodo, editTodo, changeStatus }
}

