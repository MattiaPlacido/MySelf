import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";

const urlBackEnd = import.meta.env.VITE_API_URL;

const GeneralContext = createContext();

export function GeneralContextProvider({ children }) {
  const { userId } = useUserContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //* ==================== TASKS SECTION ==================== */
  const [tasks, setTasks] = useState([]);

  //Retrieve tasks for the logged user
  function retrieveTasks() {
    setLoading(true);

    //Get authentication token from local storage
    const token = localStorage.getItem("myToken");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    //Backend call to get the tasks
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
        //Set the tasks from the retrieved data
        setTasks(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  //Retrieve a single task by its id
  //Needs to be asyncronous because its returning something
  async function retrieveSingleTask(taskId) {
    setLoading(true);

    //Get authentication token from local storage
    const token = localStorage.getItem("myToken");
    if (!token) {
      setError("No token found. Please log in.");
      return null;
    }

    try {
      //Backend call to get the task
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

  //Add a new task
  function addTask(task) {
    //Get authentication token from local storage
    const token = localStorage.getItem("myToken");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }
    setLoading(true);
    //POST call to the backend to add the task
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
        user_id: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        data
          ? retrieveTasks() //Fetch again the tasks if its added successfully
          : alert("An error has occurred sending the request.");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  //Delete a task by its ID
  function deleteTask(taskId) {
    //Get authentication token from local storage
    const token = localStorage.getItem("myToken");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }
    //DELETE request to the backend to delete specified task
    fetch(`${urlBackEnd}/general/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to delete task. Please try again.");
      }
      retrieveTasks(); //Fetch again the tasks if its deleted successfully
    });
  }

  //Update a task by its ID
  function updateTask(taskId, taskData) {
    //Get authentication token from local storage
    const token = localStorage.getItem("myToken");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }
    //PUT request to the backend to update specified task
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
      retrieveTasks(); //Fetch again the tasks if its updated successfully
    });
  }

  //Update a tasks completion status by its ID
  function updateTaskStatus(taskId, status) {
    //Get authentication token from local storage
    const token = localStorage.getItem("myToken");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }
    //PUT request to the backend to update a tasks status
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
  //* ==================== END TASKS SECTION ==================== */

  //* ==================== DAILY TASKS SECTION ==================== */
  const [dailyTasks, setDailyTasks] = useState([]);

  function retrieveDailyTasks() {
    setLoading(true);

    //Get authentication token from local storage
    const token = localStorage.getItem("myToken");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    fetch(`${urlBackEnd}/general/daily/tasks/${userId}`, {
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
        //Set the tasks from the retrieved data
        setDailyTasks(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });

    //Backend call to get the tasks
  }

  async function retrieveSingleDailyTask(taskId) {
    setLoading(true);

    //Get authentication token from local storage
    const token = localStorage.getItem("myToken");
    if (!token) {
      setError("No token found. Please log in.");
      return null;
    }

    try {
      //Backend call to get the task
      const res = await fetch(`${urlBackEnd}/general/daily/task/${taskId}`, {
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

  function addDailyTask(task) {
    //Get authentication token from local storage
    const token = localStorage.getItem("myToken");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }
    setLoading(true);
    //POST call to the backend to add the task
    fetch(`${urlBackEnd}/general/daily/addtask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: task.content || null,
        title: task.title,
        time: task.time || null,
        user_id: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        data
          ? retrieveDailyTasks() //Fetch again the tasks if its added successfully
          : alert("An error has occurred sending the request.");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function deleteDailyTask(taskId) {
    //Get authentication token from local storage
    const token = localStorage.getItem("myToken");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }
    //DELETE request to the backend to delete specified task
    fetch(`${urlBackEnd}/general/daily/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to delete task. Please try again.");
      }
      retrieveDailyTasks(); //Fetch again the tasks if its deleted successfully
    });
  }

  function updateDailyTask(taskId, taskData) {
    //Get authentication token from local storage
    const token = localStorage.getItem("myToken");
    if (!token) {
      setError("No token found. Please log in.");
      return;
    }
    //PUT request to the backend to update specified task
    fetch(`${urlBackEnd}/general/daily/updatetask/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: taskData.content,
        title: taskData.title,
        time: taskData.time,
      }),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to update task. Please try again.");
      }
      retrieveDailyTasks(); //Fetch again the tasks if its updated successfully
    });
  }

  //* ==================== END DAILY TASKS SECTION ==================== */

  //Every time userId changes // when the component mounts if the userId is present fetch the corresponding tasks
  useEffect(() => {
    if (userId) {
      retrieveTasks();
      retrieveDailyTasks();
    }
  }, [userId]);

  //Exporting userTasks and its functions
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
  const userDailyTasks = {
    dailyTasks,
    setDailyTasks,
    retrieveDailyTasks,
    retrieveSingleDailyTask,
    addDailyTask,
    deleteDailyTask,
    updateDailyTask,
  };

  const status = {
    loading,
    error,
  };

  return (
    <GeneralContext.Provider value={{ userTasks, userDailyTasks, status }}>
      {children}
    </GeneralContext.Provider>
  );
}

//Exporting useContext so that other components can access the provided values
export const useGeneralContext = () => useContext(GeneralContext);
