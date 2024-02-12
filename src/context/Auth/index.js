import React, { createContext } from "react";
import useProvideAuth from "../../hooks/useAuth";

export const AuthContext = createContext();

function ProvideAuth({ children }) {

    const auth = useProvideAuth();

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}

export default ProvideAuth;