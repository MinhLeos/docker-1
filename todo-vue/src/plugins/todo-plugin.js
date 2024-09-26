export default {
    install: (app, options) => {

        app.config.globalProperties.$todoLength = (todosList) => {
            const length = todosList.length
            const doneLength = todosList.filter(todo => todo.isDone === true).length
            return { length, doneLength }
        }
    }
}