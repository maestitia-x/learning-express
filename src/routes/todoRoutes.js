import {Router} from "express";
import {getTodos, getTodo, addTodo, editTodo, removeTodo} from "../controllers/todoControllers.js";

const router = Router();

router.get("/", getTodos);
router.get("/:id", getTodo);
router.post("/", addTodo);
router.patch("/:id", editTodo);
router.delete("/:id", removeTodo)

export default router;

