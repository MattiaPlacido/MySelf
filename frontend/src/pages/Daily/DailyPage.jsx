import { useGeneralContext } from "../../contexts/GeneralContext";
import { useUserContext } from "../../contexts/UserContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DailyTaskItem from "./DailyTaskItem";
import TaskList from "../../components/TaskList";
import AddDailyTaskButton from "./AddDailyTaskButton";

export default function DailyPage() {
  const navigate = useNavigate();

  const { userDailyTasks, status } = useGeneralContext();
  const { setDailyTasks, dailyTasks } = userDailyTasks;
  const { loading, error } = status;
  const { userId } = useUserContext();

  useEffect(() => {
    if (!userId) {
      setDailyTasks([]);
      navigate("/login");
    }
  }, [userId]);

  if (error) {
    return <h1 className="text-white">Error: {error}</h1>;
  }

  return (
    <div className="text-white">
      <TaskList
        tasksData={dailyTasks}
        Button={AddDailyTaskButton}
        TaskItem={DailyTaskItem}
        loading={loading}
      />
    </div>
  );
}
