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
  async function retrieveTasks() {
    setLoading(true);
    try {
      const token = localStorage.getItem("myToken");
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      const response = await fetch(`${urlBackEnd}/general/tasks/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to retrieve tasks. Please try again.");
      }

      const tasksData = await response.json();

      setTasks(tasksData);
    } catch (error) {
      setError(error.message);
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
    addTask,
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
