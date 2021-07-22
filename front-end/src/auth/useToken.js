import { useState } from 'react'

export const useToken = () => {
    //create and internal state that is linked to user's local storage in their browser
    const [token, setTokenInternal] = useState(() => {
        //this func allows us to compute local state ourselves
        return localStorage.getItem('token') // if already a token in LS this will set that token as the initial value for our state
    });
    const setToken = newToken => {
        localStorage.setItem('token', newToken); //setting value of the token in LS to the new token
        setTokenInternal(newToken)

    };
    //if any comp's change the token it will change in LS as well
    return [token, setToken];

}
