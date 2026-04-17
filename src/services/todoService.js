let todos = [
    {id:1, title:"Express Ogren", completed:false},
    {id:2, title:"MiddleWare mantigini tekrar et", completed:true}
];

let nextId = 3;

export function getAllTodos() {
    return todos;
}

export function getTodoById(id) {
    return todos.find((todo) => todo.id === id)
}

export function createTodo(title) {
    const newTodo = {
        id: nextId++,
        title,
        completed:false
    }
    todos.push(newTodo)
    return newTodo
}

export function updateTodo(id, updates) {
    const todo = todos.find((todo) => todo.id === id)

    if (!todo) {
        return null;
    }

    if (updates.title !== undefined) {
        todo.title = updates.title;
    }

    if (updates.completed !== undefined) {
        todo.completed = updates.completed;
    }

    return todo;

}

export function deleteTodo(id) {
    const index = todos.findIndex((todo) => todo.id === id )
    if (index === -1) {
        return null;
    }

    const deletedTodo = todos[index];
    todos.splice(index, 1)
    return deletedTodo;


}