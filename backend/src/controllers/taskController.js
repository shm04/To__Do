const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Usuario no autorizado" });
    }

    const { title } = req.body;
    const newTask = new Task({ title, user: req.user._id });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error al crear tarea:", error);
    res.status(500).json({ message: "Error al crear tarea" });
  }
};

const getTasks = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Usuario no autorizado" });
    }

    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    res.status(500).json({ message: "Error al obtener tareas" });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
    if (task.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "No autorizado" });

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedTask);
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    res.status(500).json({ message: "Error al actualizar tarea" });
  }
};

const deleteCompletedTasks = async (req, res) => {
  try {
    // Verificar si el usuario está autenticado
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Usuario no autorizado' });
    }

    // Eliminar todas las tareas completadas del usuario autenticado
    const result = await Task.deleteMany({ user: req.user._id, completed: true });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No hay tareas completadas para eliminar' });
    }

    res.json({ message: 'Tareas completadas eliminadas', deletedCount: result.deletedCount });
  } catch (error) {
    console.error('Error al eliminar tareas completadas:', error.message);
    res.status(500).json({ message: 'Error al eliminar tareas completadas', error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    if (!req.params.id) {
      console.error('ID de tarea no proporcionado');
      return res.status(400).json({ message: 'ID de tarea requerido' });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      console.error('Tarea no encontrada:', req.params.id);
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      console.error('Usuario no autorizado para eliminar esta tarea');
      return res.status(403).json({ message: 'No autorizado' });
    }

    await Task.deleteOne({ _id: req.params.id });

    res.json({ message: 'Tarea eliminada' });
  } catch (error) {
    console.error('Error al eliminar tarea:', error.message);
    res.status(500).json({ message: 'Error al eliminar tarea', error: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  deleteCompletedTasks
};
