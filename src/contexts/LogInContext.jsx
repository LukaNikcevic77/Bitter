import React from "react";
import {useState, createContext} from "react";


export const LogInContext = createContext(null);

export const LogInContextProvider = (props) => {

    
    const [typeOfLogin, setTypeOfLogin] = useState('');
    const [loggedInUserId, setLoggedInUSerId] = useState(null);
    
    const contextValue = {typeOfLogin, setTypeOfLogin, loggedInUserId, setLoggedInUSerId}

    return <LogInContext.Provider value={contextValue}>
           {props.children};
           </LogInContext.Provider>
    
}