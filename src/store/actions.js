import axios from "axios";
import { EDIT_BOOK, BOOKS } from "../util/endpoints";
export const getBookList = () => (dispatch) => {
  axios
    .get(BOOKS)
    .then((res) => res.data)
    .then((res) => {
      if (res) dispatch({ type: "SET_BOOK_LIST", payload: res });
    })
    .catch((err) => {
      dispatch({ type: "SET_TOAST", payload: err.message });
    });
};

export const createBook = (body) => (dispatch) => {
  axios
    .post(BOOKS, body)
    .then((res) => res.data)
    .then((res) => {
      if (res) dispatch(getBookList());
    })
    .catch((err) => {
      dispatch({ type: "SET_TOAST", payload: err.message });
    });
};

export const editBookData = (id, body) => (dispatch) => {
  axios
    .put(EDIT_BOOK + id, body)
    .then((res) => res.data)
    .then((res) => {
      if (res) dispatch(getBookList());
    })
    .catch((err) => {
      dispatch({ type: "SET_TOAST", payload: err.message });
    });
};

export const deleteBookData = (id) => (dispatch) => {
  axios
    .delete(EDIT_BOOK + id)
    .then((res) => res.data)
    .then((res) => {
      dispatch(getBookList());
    })
    .catch((err) => {
      dispatch({ type: "SET_TOAST", payload: err.message });
    });
};
