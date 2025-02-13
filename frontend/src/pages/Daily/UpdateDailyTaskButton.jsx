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
  time: "",
  hasTime: true,
};

export default function UpdateDailyTaskButton({ taskId }) {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const { userDailyTasks } = useGeneralContext();
  const { retrieveSingleDailyTask, updateDailyTask } = userDailyTasks;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  //Get existing data to fill form
  useEffect(() => {
    async function fetchTask() {
      const task = await retrieveSingleDailyTask(taskId);
      if (task) {
        if (task.time) {
          setFormData({ ...task, hasTime: true });
        } else {
          setFormData(task);
        }
      }
    }
    fetchTask();
  }, [taskId]);

  const handleUpdate = () => {
    if (formData.title === "") {
      alert("Title cannot be empty");
      return;
    }
    //Time validation if present
    if (formData.hasTime) {
      const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

      if (!timeRegex.test(formData.time)) {
        alert("Invalid time format! Please enter time as HH:mm (e.g., 14:30)");
        return false;
      }
      updateDailyTask(taskId, formData);
    } else {
      updateDailyTask(taskId, {
        ...formData,
        time: null,
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
                required
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
            {formData.hasTime && (
              <Form.Group controlId="formTime" className="mt-3">
                <Form.Label>Select Time of day</Form.Label>
                <Form.Control
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Form.Group controlId="formTimeCheckbox" className="mt-3">
            <Form.Check
              type="checkbox"
              name="hasTime"
              label="Has time"
              checked={formData.hasTime}
              onChange={handleInputChange}
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
