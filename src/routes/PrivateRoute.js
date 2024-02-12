import React, { useContext, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/Auth';

function PrivateRoute({ children, ...rest }) {
    let auth = useContext(AuthContext);

    // useEffect(() => {
    //     console.log("consol")
    //     auth.allowOrNot()
    // }, [auth])

    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user ? (
                    // auth.allowOrNot() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute;