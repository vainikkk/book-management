import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

let initialState = {
  isLoggedIn: false,
  token: "",
  data: [],
  editData: null,
  showToast: false,
  toastMessage: "",
  filteredData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGGED_IN":
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload,
      };
    case "LOG_OUT":
      return {
        ...state,
        isLoggedIn: false,
      };
    case "SET_BOOK_LIST":
      return {
        ...state,
        data: action.payload,
        filteredData: action.payload,
      };
    case "FILTERED_DATA":
      return {
        ...state,
        filteredData: action.payload,
      };
    case "EDIT":
      let arrayOfData = state.data;
      let editData = arrayOfData.find((v) => v._id === action.payload);
      return {
        ...state,
        editData: editData,
      };
    case "REMOVE_BOOK_EDIT_DATA":
      return {
        ...state,
        editData: null,
      };
    case "CLOSE_TOAST":
      return {
        ...state,
        showToast: false,
        toastMessage: null,
      };
    case "SET_TOAST":
      return {
        ...state,
        showToast: true,
        toastMessage: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
