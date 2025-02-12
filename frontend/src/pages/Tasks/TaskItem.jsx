import { Form } from "react-bootstrap";
import DeleteTaskButton from "./DeleteTaskButton";
import UpdateTaskButton from "./UpdateTaskButton";
import { useState } from "react";
import { useGeneralContext } from "../../contexts/GeneralContext";

export default function TaskItem({ task }) {
  const [completionStatus, setCompletionStatus] = useState(task.completed);

  const { userTasks } = useGeneralContext();
  const { updateTaskStatus } = userTasks;

  function handleTaskCompletion(event) {
    const newStatus = event.target.checked;
    setCompletionStatus(newStatus);
    updateTaskStatus(task.id, newStatus);
  }

  return (
    <div className="border-light border-top border-bottom p-3 d-flex justify-content-between">
      <div className="row">
        <h6 className="pb-2 col">{task.title}</h6>
        <Form.Check
          type="checkbox"
          id={`task-checkbox-${task.id}`}
          className="me-3 col"
          label="Done"
          name="completionStatus"
          value={completionStatus}
          onChange={handleTaskCompletion}
        />
        <div>
          <p>{task.content}</p>
          {task.date && <p>For : {new Date(task.date).toLocaleDateString()}</p>}
        </div>
      </div>
      <div className="d-flex flex-column justify-content-between">
        <UpdateTaskButton taskId={task.id} />
        <DeleteTaskButton taskId={task.id} />
      </div>
    </div>
  );
}
