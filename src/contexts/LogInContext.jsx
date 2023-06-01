import React from "react";
import {useContext, useState, useEffect, createContext} from "react";


export const LogInContext = createContext(null);

export const LogInContextProvider = (props) => {

    const [loggedIn, setLoggedIn] = useState("");
    const [typeOfLogin, setTypeOfLogin] = useState('');
    const [loggedInUserId, setLoggedInUSerId] = useState(null);
    
    const contextValue = {loggedIn, setLoggedIn, typeOfLogin, setTypeOfLogin, loggedInUserId, setLoggedInUSerId}

    return <LogInContext.Provider value={contextValue}>
           {props.children};
           </LogInContext.Provider>
    
}