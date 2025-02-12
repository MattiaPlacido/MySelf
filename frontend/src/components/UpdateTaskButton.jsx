import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const initialFormData = {
  title: "",
  content: "",
  deadLineDate: "01-01-2025",
};

export function UpdateTaskButton({ taskId }) {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //AGGIUNGERE INPUT DATA
  //AGGIUNGERE TASTO PER COMPLETARE TASK

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
              <Form.Control type="text" placeholder="Enter task title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="taskDescription">
              <Form.Label>Update description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter task description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={() => console.log("Task updated")}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
