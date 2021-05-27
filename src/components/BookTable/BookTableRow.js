import React from "react";
import EDIT_IMAGE from "../../assets/images/Edit.svg";
import DELETE_IMAGE from "../../assets/images/delete.svg";

function BookTableRow({ data, deleteBook, editBook }) {
  return (
    <tr>
      <td>
        {typeof data.image === "object" ? (
          <img src={URL.createObjectURL(data.image)} alt="book" className="round-image" />
        ) : (
          <img src={`data:image/jpeg;base64,${data.image}`} alt="book" className="round-image" />
        )}
      </td>
      <td>{data.title}</td>
      <td>{data.price}</td>
      <td>{data.author}</td>
      <td>{data.rating}</td>
      <td>{data.category}</td>
      <td>{data.description || "NA"}</td>
      <td>
        <img src={EDIT_IMAGE} alt={"EDIT"} onClick={() => editBook(data._id)} className="svg-image" />
      </td>
      <td>
        <img src={DELETE_IMAGE} alt={"DELETE"} onClick={() => deleteBook(data._id)} className="svg-image" />
      </td>
    </tr>
  );
}

export default BookTableRow;
