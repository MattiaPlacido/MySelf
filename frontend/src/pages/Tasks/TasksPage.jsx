import { useState, useEffect } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useGeneralContext } from "../../contexts/GeneralContext";
import TaskList from "../../components/TaskList";
import TaskItem from "./TaskItem";
import AddTaskButton from "./AddTaskButton";

export default function TasksPage() {
  const navigate = useNavigate();

  const { userTasks, status } = useGeneralContext();
  const { setTasks, tasks = [] } = userTasks;
  const { loading, error } = status;
  const { userId } = useUserContext();

  useEffect(() => {
    if (!userId) {
      setTasks([]);
      navigate("/login");
    }
  }, [userId]);

  if (error) {
    return <h1 className="text-white">Error: {error}</h1>;
  }

  return (
    <>
      <div className="">
        <TaskList
          tasksData={tasks}
          Button={AddTaskButton}
          TaskItem={TaskItem}
          loading={loading}
        />
      </div>
    </>
  );
}
