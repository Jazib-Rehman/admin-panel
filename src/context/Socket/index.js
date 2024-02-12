import { createContext, useState, useEffect } from 'react';
import { initSockets } from '../../services/socket';


// create Socket Context
export const SocketContext = createContext(null);

export default function SocketProvider({ children }) {

    const [value, setValue] = useState(null);

    useEffect(() => initSockets({ setValue }), [initSockets]);

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    )

}
