import AddTaskButton from "../../components/addTaskButton";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../../contexts/GlobalContext";

const urlBackEnd = import.meta.env.API_URL;

const initialData = {
  title: "Titolo prova",
  content: "Contenuto prova",
  hasDeadLine: false,
  date: 0,
};

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { userId } = useGlobalContext();

  async function retrieveTasks(id) {
    try {
      const fetch = await fetch(`${urlBackEnd}/general/tasks/${id}`, {
        method: "GET",
      });

      if (!fetch.ok) {
        throw new Error("Failed to retrieve tasks. Please try again.");
      }

      const tasksData = await fetch.json();

      const tasksCopy = [];

      tasksData.forEach((task) => {
        if (task.category_id === 1) {
          tasksCopy.push(task);
        } else {
        }
      });

      setTasks(tasksCopy);
    } catch (error) {
      console.error("Error occurred while retrieving tasks:", error.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (userId === 0) {
      setTasks([]);
      window.location.href = "/login";
    } else {
      retrieveTasks(userId);
    }
  }, [userId]);

  return (
    <>
      <div className="d-flex justify-content-around pt-5">
        <div className="d-flex flex-column justify-content-around text-white">
          <div className="container border p-4">
            <h5>Your tasks</h5>
            {tasks.map((task, index) => (
              <div key={index}>
                <h6>{task.title}</h6>
                <p>{task.content}</p>
                {task.date && (
                  <p>For : {new Date(task.date).toLocaleDateString()}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="d-flex flex-column gap-5">
          <AddTaskButton />
        </div>
      </div>
    </>
  );
}
