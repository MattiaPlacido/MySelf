import { useGeneralContext } from "../contexts/GeneralContext";
import { Spinner as BootstrapSpinner } from "react-bootstrap";
import AddTaskButton from "../components/AddTaskButton";

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
      <div className="container border p-4 text-white">
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
        <div className="d-flex justify-content-end p-2">
          <AddTaskButton />
        </div>
      </div>
    </div>
  );
}
