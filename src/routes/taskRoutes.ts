import { Router } from "express";
import { addTask } from "../controllers/taskController";

const router = Router()

router.post('/tasks', addTask)






export default router