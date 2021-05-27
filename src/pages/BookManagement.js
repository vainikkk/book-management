import React, { useEffect, useState } from "react";
import { Button, Container, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DeleteConfirmation from "../components/DeleteConfirmation/DeleteConfirmation";
import BookModal from "../components/BookModal/BookModal";
import BookTable from "../components/BookTable/BookTable";
import { createBook, getBookList, editBookData, deleteBookData } from "../store/actions";
import { filterArray } from "../util/general";

function BookManagement() {
  const [show, setShow] = useState(false);
  const [id, setId] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const dispatch = useDispatch();
  const { data, filteredData } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getBookList());
  }, [dispatch]);

  const deleteBook = (id) => {
    setId(id);
    setDeleteModalShow(true);
  };

  const confirmDelete = (id) => {
    dispatch(deleteBookData(id));
    setDeleteModalShow(false);
  };

  const handleClose = () => {
    dispatch({ type: "REMOVE_BOOK_EDIT_DATA" });
    setShow(false);
  };

  const handleEdit = (id) => {
    setShow(true);
    dispatch({ type: "EDIT", payload: id });
  };

  const addBook = (data) => {
    let formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("author", data.author);
    formData.append("rating", data.rating);
    data.category && formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("image", data.image);
    setShow(false);
    dispatch(createBook(formData));
  };

  const editBook = (id, data) => {
    let formData = new FormData();
    data.title && formData.append("title", data.title);
    data.price && formData.append("price", data.price);
    data.author && formData.append("author", data.author);
    data.rating && formData.append("rating", data.rating);
    data.category && formData.append("category", data.category);
    data.description && formData.append("description", data.description);
    data.image && formData.append("image", data.image);
    setShow(false);
    dispatch(editBookData(id, data));
  };
  const handleSearch = (e) => {
    let filters = {
      category: e.target.value,
    };
    let filteredData = filterArray(data, filters);
    dispatch({ type: "FILTERED_DATA", payload: filteredData });
  };
  const handleDropdown = (e) => {
    let modifiedData = [];
    if (e === "ALL") {
      modifiedData = data;
    } else {
      modifiedData = data.filter((v) => v.rating >= e && v.rating <= parseInt(e) + 1);
    }
    dispatch({ type: "FILTERED_DATA", payload: modifiedData });
  };

  return (
    <div className="mt-3">
      <Container>
        <div className="add-button">
          <Button onClick={() => setShow(!show)} variant="outline-primary">
            Add Book
          </Button>
        </div>
        {data && data.length > 0 && (
          <div className="filter_box_wrapper">
            <div className="rating_wise_filter">
              <input
                type="text"
                name="search"
                id="search"
                class="form-control"
                width="50%"
                placeholder="Search category"
                onChange={handleSearch}
              />
            </div>
            <div className="dropdown">
              <Dropdown onSelect={(e) => handleDropdown(e)}>
                <Dropdown.Toggle id="dropdown-basic">Rating</Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item eventKey={1}>1-2</Dropdown.Item>
                  <Dropdown.Item eventKey={2}>2-3</Dropdown.Item>
                  <Dropdown.Item eventKey={3}>3-4</Dropdown.Item>
                  <Dropdown.Item eventKey={4}>4-5</Dropdown.Item>
                  <Dropdown.Item eventKey={"ALL"}>All</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        )}
        {filteredData && filteredData.length > 0 && <BookTable handleEdit={handleEdit} deleteBook={deleteBook} />}
        <BookModal editBook={editBook} show={show} handleClose={handleClose} addBook={addBook} />
        <DeleteConfirmation
          title="Confirmation Popup"
          bodyDescription="Are you sure to Delete!"
          buttonName="DELETE"
          show={deleteModalShow}
          id={id}
          handleClose={() => setDeleteModalShow(false)}
          confirmDelete={confirmDelete}
        />
      </Container>
    </div>
  );
}

export default BookManagement;
