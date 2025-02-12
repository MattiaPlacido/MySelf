import { useGeneralContext } from "../contexts/GeneralContext";
import { Spinner as BootstrapSpinner } from "react-bootstrap";
import AddTaskButton from "../components/AddTaskButton";
import DeleteTaskButton from "./DeleteTaskButton";
import { UpdateTaskButton } from "./UpdateTaskButton";

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
          <div
            key={index}
            className="border-light border-top border-bottom p-3 d-flex justify-content-between"
          >
            <div>
              <h6 className="pb-2">{task.title}</h6>
              <p>{task.content}</p>
              {task.date && (
                <p>For : {new Date(task.date).toLocaleDateString()}</p>
              )}
            </div>
            <div className="d-flex flex-column justify-content-between">
              <UpdateTaskButton taskId={task.id} />
              <DeleteTaskButton taskId={task.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
