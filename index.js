// Importamos express
const express = require("express");
const app = express();
const port = 3000;

// Middleware para leer JSON en el body
app.use(express.json());

// "Base de datos" temporal en memoria
let tasks = [
  { id: 1, title: "Estudiar Node.js", completed: false },
  { id: 2, title: "Hacer ejercicio", completed: true },
];

// GET /tasks → Listar todas las tareas
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST /tasks → Crear nueva tarea
app.post("/tasks", (req, res) => {
  const { title, completed } = req.body;

  if (!title) {
    return res.status(400).json({ error: "El título es requerido" });
  }

  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    completed: completed || false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id → Actualizar una tarea
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  // Actualizamos solo los campos enviados
  if (title !== undefined) tasks[taskIndex].title = title;
  if (completed !== undefined) tasks[taskIndex].completed = completed;

  res.json(tasks[taskIndex]);
});

// Iniciamos el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
