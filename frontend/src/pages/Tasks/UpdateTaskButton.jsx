import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faStrikethrough,
  faThumbTackSlash,
} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useGeneralContext } from "../../contexts/GeneralContext";

const initialFormData = {
  title: "",
  content: "",
  date: "",
};

export default function UpdateTaskButton({ taskId }) {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [hasDeadline, toggleHasDeadline] = useState(false);

  const { userTasks } = useGeneralContext();
  const { retrieveSingleTask, updateTask } = userTasks;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleDeadLine = () => {
    if (hasDeadline) {
      toggleHasDeadline(false);
    } else {
      toggleHasDeadline(true);
    }
  };

  useEffect(() => {
    async function fetchTask() {
      const task = await retrieveSingleTask(taskId);
      if (task) {
        const parsedDate = new Date(task.date).toISOString().split("T")[0];
        const today = new Date().toISOString().split("T")[0];
        if (parsedDate >= today) {
          toggleHasDeadline(true);
          const parsedTask = {
            ...task,
            date: parsedDate,
          };
          setFormData(parsedTask);
        } else {
          setFormData(task);
        }
      }
    }
    fetchTask();
  }, [taskId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleUpdate = () => {
    if (formData.title === "") {
      alert("Title cannot be empty");
      return;
    }

    if (hasDeadline) {
      const today = new Date().toISOString().split("T")[0];
      const parsedDate = new Date(formData.date).toISOString().split("T")[0];
      if (parsedDate < today) {
        alert("The deadline date must be greater than today");
        return;
      }
      updateTask(taskId, formData);
    } else {
      updateTask(taskId, {
        ...formData,
        date: null,
      });
    }
    handleClose();
  };

  return (
    <>
      <Button variant="light" onClick={handleShow}>
        <FontAwesomeIcon icon={faPencil} />
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="taskTitle">
              <Form.Label>Update title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                value={formData.title}
                onChange={handleInputChange}
                name="title"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="taskDescription">
              <Form.Label>Update description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.content}
                name="content"
                placeholder="Enter task description"
                onChange={handleInputChange}
              />
            </Form.Group>
            {hasDeadline && (
              <Form.Group controlId="formDeadlineDate" className="mt-3">
                <Form.Label>Select Deadline</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Form.Group controlId="formDeadlineCheckbox" className="mt-3">
            <Form.Check
              type="checkbox"
              name="hasDeadline"
              label="Has deadline"
              checked={hasDeadline}
              onChange={toggleDeadLine}
            />
          </Form.Group>
          <Button variant="dark" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
