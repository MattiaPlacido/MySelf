import { useState } from "react";
import { useGeneralContext } from "../../contexts/GeneralContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const initialFormData = {
  title: "",
  content: "",
  time: "",
  hasTime: false,
};

export default function AddDailyTaskButton() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const { userDailyTasks } = useGeneralContext();
  const { addDailyTask } = userDailyTasks;

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

  function handleSubmit(e) {
    e.preventDefault();
    if (formData.title == "") {
      alert("Title cannot be empty");
      return;
    }

    addDailyTask(formData);

    setFormData(initialFormData);
    setShow(false);
  }

  return (
    <>
      <Button variant="light" onClick={handleShow}>
        Add a daily task!
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={3}
                placeholder="Leave your thoughts"
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="formTimeCheckbox" className="mt-3">
              <Form.Check
                type="checkbox"
                name="hasTime"
                label="Add a time for your task"
                checked={formData.hasTime}
                onChange={handleInputChange}
              />
            </Form.Group>

            {formData.hasTime && (
              <Form.Group controlId="formTime" className="mt-3">
                <Form.Label>Select Time</Form.Label>
                <Form.Control
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required={formData.hasTime}
                />
              </Form.Group>
            )}

            <div className="d-flex justify-content-center mt-3">
              <Button variant="dark" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
