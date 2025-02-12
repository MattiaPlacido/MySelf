import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";

const urlBackEnd = import.meta.env.VITE_API_URL;

const GeneralContext = createContext();

export function GeneralContextProvider({ children }) {
  const { userId } = useUserContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //TASKS
  const [tasks, setTasks] = useState([]);
  //TASKS FUNCTIONS
  //retrive tasks
  function retrieveTasks() {
    setLoading(true);

    const token = localStorage.getItem("myToken");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    fetch(`${urlBackEnd}/general/tasks/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          return;
        }
        setTasks(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  //retrieve single task
  async function retrieveSingleTask(taskId) {
    setLoading(true);

    const token = localStorage.getItem("myToken");
    if (!token) {
      setError("No token found. Please log in.");
      return null;
    }

    try {
      const res = await fetch(`${urlBackEnd}/general/task/${taskId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        return null;
      }

      return data;
    } catch (error) {
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  //add task
  function addTask(task) {
    const token = localStorage.getItem("myToken");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }
    setLoading(true);

    fetch(`${urlBackEnd}/general/addtask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: task.content || null,
        title: task.title,
        date: task.deadLineDate || null,
        userId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        data
          ? retrieveTasks()
          : alert("An error has occurred sending the request.");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  //delete task
  function deleteTask(taskId) {
    const token = localStorage.getItem("myToken");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }
    fetch(`${urlBackEnd}/general/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to delete task. Please try again.");
      }
      retrieveTasks();
    });
  }

  //update task
  function updateTask(taskId, taskData) {
    const token = localStorage.getItem("myToken");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }
    fetch(`${urlBackEnd}/general/updatetask/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: taskData.content,
        title: taskData.title,
        date: taskData.date,
      }),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to update task. Please try again.");
      }
      retrieveTasks();
    });
  }

  //update task status
  function updateTaskStatus(taskId, status) {
    const token = localStorage.getItem("myToken");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }
    fetch(`${urlBackEnd}/general/updatetask/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        completed: status,
      }),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to update task's status. Please try again.");
      }
      // retrieveTasks();
    });
  }

  //DATA LOADING
  useEffect(() => {
    if (userId) {
      retrieveTasks();
    }
  }, [userId]);

  const userTasks = {
    tasks,
    setTasks,
    retrieveTasks,
    retrieveSingleTask,
    addTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
  };
  const status = {
    loading,
    error,
  };

  return (
    <GeneralContext.Provider value={{ userTasks, status }}>
      {children}
    </GeneralContext.Provider>
  );
}

export const useGeneralContext = () => useContext(GeneralContext);
