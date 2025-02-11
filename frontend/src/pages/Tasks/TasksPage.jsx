import AddTaskButton from "../../components/addTaskButton";
import { useState, useEffect } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { useGeneralContext } from "../../contexts/GeneralContext";
import { Spinner as BootstrapSpinner } from "react-bootstrap";

const urlBackEnd = import.meta.env.API_URL;

const initialData = {
  title: "Titolo prova",
  content: "Contenuto prova",
  hasDeadLine: false,
  date: 0,
};

export default function TasksPage() {
  const { userTasks, status } = useGeneralContext();
  const { tasks, setTasks, retrieveTasks } = userTasks;
  const { loading, error } = status;

  const { userId } = useUserContext();

  useEffect(() => {
    if (!userId) {
      setTasks([]);
      window.location.href = "/login";
    } else {
      retrieveTasks();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <BootstrapSpinner animation="border" variant="light" />
      </div>
    );
  }

  if (error) {
    return <h1 className="text-white">Error: {error}</h1>;
  }

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
