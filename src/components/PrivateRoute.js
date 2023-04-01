import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    return (
        <Route {...rest} render={(props) => (
            isAuthenticated === true
                ? <Component {...props} />
                : <Redirect to='/login' />
        )} />
    )
};

export default PrivateRoute;