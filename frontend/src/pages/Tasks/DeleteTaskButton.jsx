import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { useGeneralContext } from "../../contexts/GeneralContext";

export default function DeleteTaskButton({ taskId }) {
  const { userTasks } = useGeneralContext();
  const { deleteTask } = userTasks;

  function handleDelete() {
    deleteTask(taskId);
  }

  //TODO CONFIRMATION MODAL BEFORE DELETING

  return (
    <Button variant="danger" onClick={handleDelete}>
      <FontAwesomeIcon icon={faTrash} />
    </Button>
  );
}
