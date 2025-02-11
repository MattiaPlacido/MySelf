import { useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const urlBackEnd = import.meta.env.VITE_API_URL;

const initialFormData = {
  title: "",
  content: "",
  hasDeadline: false,
  deadLineDate: "",
};

export default function AddTaskButton() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const { userId } = useGlobalContext();

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
      alert("Il titolo è vuoto.");
      return;
    }

    fetch(`${urlBackEnd}/general/addtask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: formData.content || null,
        title: formData.title,
        date: formData.deadLineDate || null,
        userId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        data
          ? console.log("task added successfully!")
          : console.log("An error has occurred sending the request.");
      })
      .catch((error) => {
        console.log("Error occurred:", error);
      });

    setFormData(initialFormData);
    setShow(false);
  }

  return (
    <>
      <Button variant="light" onClick={handleShow}>
        Add a task!
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

            <Form.Group controlId="formDeadlineCheckbox" className="mt-3">
              <Form.Check
                type="checkbox"
                name="hasDeadline"
                label="Add a deadline"
                checked={formData.hasDeadline}
                onChange={handleInputChange}
              />
            </Form.Group>

            {formData.hasDeadline && (
              <Form.Group controlId="formDeadlineDate" className="mt-3">
                <Form.Label>Select Deadline</Form.Label>
                <Form.Control
                  type="date"
                  name="deadLineDate"
                  value={formData.deadLineDate}
                  onChange={handleInputChange}
                  required={formData.hasDeadline}
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
