import { Navigate } from "react-router-dom";

// protect certain routes from lesser roles or users not logged in
const PrivateRoute = ({ children, roles }) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    // user not logged in so redirect to log in page
    // if(!currentUser){
    //     return <Navigate to="/login" />
    // }
    // user lacks permissions but is logged in so redirect to home page
    if(roles && roles.indexOf(currentUser.role) === -1){
        return <Navigate to="/" />
    }
    // user is logged in and has correct permissions so render component
    return children
}

export default PrivateRoute;