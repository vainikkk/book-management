import "./App.css";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BookManagement from "./pages/BookManagement";
import Login from "./pages/Login";
import Header from "./components/Navbar/Navbar";
import ToastMessage from "./components/ToastMessage/ToastMessage";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const verifyToken = localStorage.getItem("token");
  if (state.isLoggedIn || verifyToken) {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <BookManagement />
          </Route>
        </Switch>
        {state.showToast && (
          <ToastMessage
            show={state.showToast}
            delay={"3000"}
            closeToast={() => dispatch({ type: "CLOSE_TOAST" })}
            message={state.toastMessage}
          />
        )}
      </div>
    );
  } else {
    return (
      <Switch>
        <Route exact path="*">
          <Login />
        </Route>
      </Switch>
    );
  }
}

export default App;
