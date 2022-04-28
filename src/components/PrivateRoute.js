import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, roles }) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
}