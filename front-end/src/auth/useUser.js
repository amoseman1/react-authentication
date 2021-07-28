import { useState, useEffect } from "react";
import { useToken } from './useToken';

function b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
}

export const useUser = () => {
    //get the token using useToekn state
    const [token] = useToken();
    //define a func for getting the payload from the token, need to parase token into a json obj
    const getPayloadFromToken = token => {
        const encodedPayload = token.split('.')[1]; //middle portion - index 1
        ;
        return JSON.parse(b64_to_utf8(encodedPayload));
    }

    const [user, setUser] = useState(() => {
        if (!token) return null;
        return getPayloadFromToken(token);
    })

    useEffect(() => {
        if (!token) {
            setUser(null)
        } else {
            setUser(getPayloadFromToken(token));
        }
    }, [token]);

    return user;
}