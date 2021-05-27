import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import BookTableRow from "./BookTableRow";

function BookTable(props) {
  const { filteredData } = useSelector((state) => state);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Author</th>
            <th>Ratings</th>
            <th>Category</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.length > 0 &&
            filteredData.map((value) => (
              <BookTableRow key={value.id} data={value} editBook={props.handleEdit} deleteBook={props.deleteBook} />
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default BookTable;
