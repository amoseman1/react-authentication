import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import { PrivateRoute } from './auth/PrivateRoute';

export const Routes = () => {
    return (
        <Router>
            <Switch>
                {/* path and exact are our 2 props being passed to our Route comp is the user is allowed to visit our page */}
                <PrivateRoute path="/" exact>
                    <UserInfoPage />
                </PrivateRoute>
                <Route path='/login'>
                    <LoginPage />
                </Route>
                <Route path='/signup'>
                    <SignUpPage />
                </Route>
            </Switch>
        </Router >
    );
}