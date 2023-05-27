import React from "react";
import {useContext, useState, useEffect, createContext} from "react";


export const LogInContext = createContext(null);

export const LogInContextProvider = (props) => {

    const [loggedIn, setLoggedIn] = useState("");

    const contextValue = {loggedIn, setLoggedIn}

    return <LogInContext.Provider value={contextValue}>
           {props.children};
           </LogInContext.Provider>
    
}