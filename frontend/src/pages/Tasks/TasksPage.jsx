import { useState, useEffect } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { useGeneralContext } from "../../contexts/GeneralContext";
import TaskList from "../../components/TaskList";

const urlBackEnd = import.meta.env.API_URL;

const initialData = {
  title: "Titolo prova",
  content: "Contenuto prova",
  hasDeadLine: false,
  date: 0,
};

export default function TasksPage() {
  const { userTasks, status } = useGeneralContext();
  const { setTasks } = userTasks;
  const { loading, error } = status;

  const { userId } = useUserContext();

  useEffect(() => {
    if (!userId) {
      setTasks([]);
      window.location.href = "/login";
    }
  }, []);

  if (error) {
    return <h1 className="text-white">Error: {error}</h1>;
  }

  return (
    <>
      <div className="">
        <TaskList />
      </div>
    </>
  );
}
