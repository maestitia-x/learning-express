import {AppError} from "../utils/AppError.js";
import {getAllTodos, getTodoById, createTodo, deleteTodo, updateTodo} from "../services/todoService.js";

export function getTodos(req,res) {
    const todos = getAllTodos()

    res.status(200).json({
        success:true,
        data:todos
    })
}

export function getTodo(req,res) {
    const id = Number(req.params.id)
    const todo = getTodoById(id)

    if (!todo) {
        throw new AppError("Todo is not found", 404)
    }

    return res.status(200).json({
        success:true,
        data:todo
    })
}

export function addTodo(req,res) {
    const {title} = req.body

    if (!title || typeof title !== 'string') {
        throw new AppError("Title has to be filled and its data type string!")
    }

    const newTodo = createTodo(title)
    return res.status(200).json({
        success:true,
        message:"Todo has been created!",
        data:newTodo
    })

}

export function editTodo(req,res) {
    const id = Number(req.params.id)
    const {title, completed} = req.body

    if (title === undefined && completed === undefined) {
        throw new AppError("No update field was provided.", 400)
    }

    if (title !== undefined && typeof title !== 'string') {
        throw new AppError("Title has to be string!", 400)
    }

    if (completed !== undefined && typeof completed !== 'boolean') {
        throw new AppError("Completed parameter has to be boolean.", 400)
    }

    const updatedTodo = updateTodo(id, {title, completed})
    if (!updatedTodo) {
        throw new AppError("Todo hasn't been found.", 404)
    }
    return res.status(200).json({
        success:true,
        message:"Todo has been updated successfully.",
        data: updatedTodo
    })

}

export function removeTodo(req,res) {
    const id = Number(req.params.id)
    const deletedTodo = deleteTodo(id)

    if(!deletedTodo) {
        throw new AppError("Todo has not been found!", 404)
    }

    return res.status(200).json({
        success:true,
        message:"Todo deleted successfully!",
        data:deletedTodo
    })

}