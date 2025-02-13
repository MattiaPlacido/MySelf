import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { useGeneralContext } from "../../contexts/GeneralContext";

export default function DeleteDailyTaskButton({ taskId }) {
  const { userDailyTasks } = useGeneralContext();
  const { deleteDailyTask } = userDailyTasks;

  function handleDelete() {
    deleteDailyTask(taskId);
  }

  return (
    <Button variant="danger" onClick={handleDelete}>
      <FontAwesomeIcon icon={faTrash} />
    </Button>
  );
}
