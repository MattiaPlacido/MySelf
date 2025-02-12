import { useGeneralContext } from "../../contexts/GeneralContext";
import { Spinner as BootstrapSpinner } from "react-bootstrap";
import AddTaskButton from "./AddTaskButton";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const { userTasks, status } = useGeneralContext();
  const { tasks } = userTasks;
  const { loading } = status;

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <BootstrapSpinner animation="border" variant="light" />
      </div>
    );
  }

  return (
    <div>
      <div className="border rounded pt-2 text-white">
        <div className="px-3 d-flex justify-content-between py-3">
          <h5>Your tasks</h5>
          <AddTaskButton className="position" />
        </div>
        {tasks.map((task, index) => (
          <TaskItem task={task} key={index} />
        ))}
      </div>
    </div>
  );
}
