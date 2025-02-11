//SCRAPPED
// import { useState } from "react";
// import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";

// const urlBackEnd = import.meta.env.API_URL;

// export default function ToDoCategoryButton() {
//   const [show, setShow] = useState(false);
//   const [categoryName, setCategoryName] = useState("");

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const handleInputChange = (e) => {
//     setCategoryName(e.target.value);
//   };

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (categoryName.trim()) {
//       fetch(`${urlBackEnd}/general/todocategory`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name: categoryName }),
//       })
//         .then((res) => {
//           if (!res.ok) {
//             throw new Error(`HTTP error! status: ${res.status}`);
//           }
//           return res.json();
//         })
//         .then((data) => {
//           console.log("Category added:", data);
//           setCategoryName("");
//           handleClose();
//         })
//         .catch((error) => {
//           console.error("Error adding category:", error);
//         });
//     } else {
//       alert("Category's name is empty");
//     }
//   }

//   return (
//     <>
//       <Button variant="light" onClick={handleShow}>
//         Add a category
//       </Button>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add a category for your todos</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="formTitle">
//               <Form.Label>Category Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Title"
//                 name="categoryName"
//                 value={categoryName}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Form.Group>

//             <div className="d-flex justify-content-center mt-3">
//               <Button variant="dark" type="submit">
//                 Submit
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }
