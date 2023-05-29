import React from "react";
import {useContext, useState, useEffect, createContext} from "react";


export const HomeContext = createContext(null);

export const HomeContextProvider = (props) => {

    const [refreshFeed, setRefreshFeed] = useState(false);
    
    const contextValue = {refreshFeed, setRefreshFeed}

    return <HomeContext.Provider value={contextValue}>
           {props.children};
           </HomeContext.Provider>
    
}