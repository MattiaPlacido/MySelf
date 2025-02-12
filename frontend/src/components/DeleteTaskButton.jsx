import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { useGeneralContext } from "../contexts/GeneralContext";

const urlBackEnd = import.meta.env.VITE_API_URL;

export default function DeleteTaskButton({ taskId }) {
  const { userTasks } = useGeneralContext();
  const { deleteTask } = userTasks;

  function handleDelete() {
    deleteTask(taskId);
  }

  //MODALE DI CONFERMA DA FARE

  return (
    <Button variant="danger" onClick={handleDelete}>
      <FontAwesomeIcon icon={faTrash} />
    </Button>
  );
}
