import { Form } from "react-bootstrap";
import DeleteTaskButton from "./DeleteTaskButton";
import UpdateTaskButton from "./UpdateTaskButton";
import { useState } from "react";
import { useGeneralContext } from "../../contexts/GeneralContext";

export default function TaskItem({ taskData }) {
  const [completionStatus, setCompletionStatus] = useState(taskData.completed);

  const { userTasks } = useGeneralContext();
  const { updateTaskStatus } = userTasks;

  function handleTaskCompletion(event) {
    const newStatus = event.target.checked;
    setCompletionStatus(newStatus);
    updateTaskStatus(taskData.id, newStatus);
  }

  return (
    <div className="border-light border-top border-bottom p-3 d-flex justify-content-between">
      <div className="row text-white">
        <h6 className="pb-2 col">{taskData.title}</h6>
        <Form.Check
          type="checkbox"
          id={`task-checkbox-${taskData.id}`}
          className="me-3 col"
          label="Done"
          name="completionStatus"
          value={completionStatus}
          onChange={handleTaskCompletion}
        />
        <div>
          <p>{taskData.content}</p>
          {taskData.date && (
            <p>Due : {new Date(taskData.date).toLocaleDateString()}</p>
          )}
        </div>
      </div>
      <div className="d-flex flex-column justify-content-between">
        <UpdateTaskButton taskId={taskData.id} />
        <DeleteTaskButton taskId={taskData.id} />
      </div>
    </div>
  );
}
