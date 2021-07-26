import { Redirect, Route } from "react-router-dom";
import { useUser } from './useUser'

export const PrivateRoute = props => {
    // we are checking if the user is checked in
    const user = useUser();


    //if they are not already logged in (user=true) redirect them to the login page
    if (!user) return <Redirect to="/login" />
    return <Route {...props} />
}