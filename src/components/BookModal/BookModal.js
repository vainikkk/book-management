import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

function BookModal({ show, handleShow, handleClose, addBook, editBook }) {
  const editData = useSelector((state) => state.editData);
  const dispatch = useDispatch();
  const [bookData, setBookData] = useState({
    title: "",
    category: "",
    price: 0,
    rating: 0,
    description: "",
    author: "",
  });

  useEffect(() => {
    if (editData) {
      setBookData(editData);
    }
  }, [editData]);

  const closeModal = () => {
    handleClose();
    setBookData({
      title: "",
      category: "",
      price: 0,
      rating: 0,
      description: "",
      author: "",
    });
  };

  const handleEdit = () => {
    if (!bookData.title || !bookData.title.trim()) {
      dispatch({ type: "SET_TOAST", payload: "Please Enter title" });
      return;
    }
    if (!bookData.category || !bookData.category.trim()) {
      dispatch({ type: "SET_TOAST", payload: "Please Enter category" });
      return;
    }
    if (!bookData.rating) {
      dispatch({ type: "SET_TOAST", payload: "Please enter price" });
      return;
    } else if (bookData.rating > 5) {
      dispatch({ type: "SET_TOAST", payload: "Rating error" });
      return;
    }
    if (!bookData.author || !bookData.author.trim()) {
      dispatch({ type: "SET_TOAST", payload: "Please Enter author name" });
      return;
    }
    if (!bookData.price) {
      dispatch({ type: "SET_TOAST", payload: "Please Enter price" });
      return;
    } else {
      editBook(editData._id, bookData);
      setBookData({
        title: "",
        category: "",
        price: 0,
        rating: 0,
        description: "",
        author: "",
      });
    }
  };

  const handleAdd = () => {
    if (!bookData.title || !bookData.title.trim()) {
      dispatch({ type: "SET_TOAST", payload: "Please Enter title" });
      return;
    }
    if (!bookData.category || !bookData.category.trim()) {
      dispatch({ type: "SET_TOAST", payload: "Please Enter category" });
      return;
    }
    if (!bookData.author || !bookData.author.trim()) {
      dispatch({ type: "SET_TOAST", payload: "Please enter author name" });
      return;
    }
    if (!bookData.image) {
      dispatch({ type: "SET_TOAST", payload: "Please upload a file" });
      return;
    }
    if (!bookData.price) {
      dispatch({ type: "SET_TOAST", payload: "Please enter price" });
      return;
    }
    if (!bookData.rating) {
      dispatch({ type: "SET_TOAST", payload: "Please enter price" });
      return;
    } else if (bookData.rating > 5) {
      dispatch({ type: "SET_TOAST", payload: "Rating error" });
      return;
    } else {
      addBook(bookData);
      setBookData({
        title: "",
        category: "",
        price: 0,
        rating: 0,
        description: "",
        author: "",
      });
    }
  };

  const handleImage = (e) => {
    setBookData({ ...bookData, image: e.target.files[0] });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} className="book-modal-wrapper">
        <Modal.Header>
          <Modal.Title>{editData ? "Edit Book" : "Add Book"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={bookData.title}
                onChange={(v) => setBookData({ ...bookData, title: v.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formBasicName">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Author name"
                name="author"
                value={bookData.author}
                onChange={(v) => setBookData({ ...bookData, author: v.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formBasicType">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category of Book"
                name="category"
                value={bookData.category}
                onChange={(v) => setBookData({ ...bookData, category: v.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formBasicQuantity">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                name="price"
                value={bookData.price}
                onChange={(v) => setBookData({ ...bookData, price: v.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formBasicQuantity">
              <Form.Label>Ratings</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                max={5}
                name="rating"
                value={bookData.rating}
                onChange={(v) => setBookData({ ...bookData, rating: v.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formBasicNote">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a description"
                name="description"
                value={bookData.description}
                onChange={(v) => setBookData({ ...bookData, description: v.target.value })}
              />
            </Form.Group>
            <Form>
              <Form.Label>Image</Form.Label>
              <Form.File id="custom-file" label="upload book image" custom onChange={handleImage} />
            </Form>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          {editData ? (
            <Button variant="primary" onClick={handleEdit}>
              Edit Book
            </Button>
          ) : (
            <Button variant="primary" onClick={handleAdd}>
              Add Book
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BookModal;
