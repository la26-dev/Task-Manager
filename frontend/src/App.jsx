import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API = axios.create({
  baseURL: "http://localhost:3000/tasks",
});

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // ✅ جلب المهام من الباك
  const fetchTasks = async () => {
    const res = await API.get("/");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ إضافة مهمة
  const addTask = async () => {
    if (!newTitle) return;

    await API.post("/", {
      title: newTitle,
      description: newDescription,
    });

    setNewTitle("");
    setNewDescription("");
    fetchTasks();
  };

  // ✅ حذف
  const deleteTask = async (id) => {
    await API.delete(`/${id}`);
    fetchTasks();
  };

  // ✅ تغيير حالة مكتمل
  const toggleComplete = async (task) => {
    await API.put(`/${task.id}`, {
      completed: task.completed ? 0 : 1,
    });

    fetchTasks();
  };

  // ✅ بدء التعديل
  const startEdit = (task) => {
    setEditId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  // ✅ حفظ التعديل
  const saveEdit = async (id) => {
    await API.put(`/${id}`, {
      title: editTitle,
      description: editDescription,
    });

    setEditId(null);
    fetchTasks();
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div className="input-group">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Task title..."
        />

        <input
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Task description..."
        />

        <button onClick={addTask}>Add</button>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div className="task-item" key={task.id}>
            {editId === task.id ? (
              <div className="edit-section">
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />

                <input
                  value={editDescription}
                  onChange={(e) =>
                    setEditDescription(e.target.value)
                  }
                />

                <button onClick={() => saveEdit(task.id)}>
                  Save
                </button>
              </div>
            ) : (
              <>
                <div className="task-content">
                  <span
                    onClick={() => toggleComplete(task)}
                    className={task.completed ? "completed" : ""}
                  >
                    {task.title}
                  </span>

                  <p className="description">
                    {task.description}
                  </p>
                </div>

                <div className="actions">
                  <button onClick={() => startEdit(task)}>
                    Edit
                  </button>
                  <button onClick={() => deleteTask(task.id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
