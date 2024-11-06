import { Request, Response } from "express";
import * as fs from 'fs';
import * as path from 'path';
import { Task } from "../models/taskModel";

const tasksFilePath = path.join(__dirname, '../../tasks.json');

// Utility to load tasks from JSON
function loadTasks(): Task[] {
    if (!fs.existsSync(tasksFilePath)) {
        fs.writeFileSync(tasksFilePath, JSON.stringify([]));
    }
    const tasksData = fs.readFileSync(tasksFilePath, 'utf-8');
    try {
        return JSON.parse(tasksData) as Task[];
    } catch (error) {
        console.error("Error parsing tasks JSON data:", error);
        return [];
    }
}

// Utility to save tasks to JSON
function saveTasks(tasks: Task[]): void {
    try {
        fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
    } catch (error) {
        console.error("Error saving tasks to file:", error);
    }
}

// Controller method to add a new task
export const addTask = (req: Request, res: Response): void => {
    const tasks = loadTasks();
    const { description } = req.body;

    // Check if description is provided
    // if (!description) {
    //     return res.status(400).json({ message: 'Description is required' });
    // }

    // Find the highest existing ID and increment for a new unique ID
    const newTaskId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;

    const newTask: Task = {
        id: newTaskId,
        description,
        status: 'todo',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    saveTasks(tasks);

    res.status(201).json({ message: 'Task successfully added', task: newTask });
};
