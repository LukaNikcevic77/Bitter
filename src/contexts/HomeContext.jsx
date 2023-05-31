import React from "react";
import {useContext, useState, useEffect, createContext} from "react";
import { db, storage } from "../firebase/firebase";
import {getDocs, collection, orderBy, updateDoc, doc} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

export const HomeContext = createContext(null);

export const HomeContextProvider = (props) => {

    const profileListRef = collection(db, "Profiles")
    const [profileList, setProfileList] = useState(null);
    const [url, setUrl] = useState(null);

    const getProfiles = async() => {
        try{
            const profiles = await getDocs(profileListRef);
            const filteredPosts = profiles.docs
            .map((post) => ({...post.data()}));
            setProfileList(filteredPosts)
           
            
        } catch(err) {
          alert(err);
        }
          }
          const updatePost =  (postId, fieldToUpdate, value) => {
            console.log({postId, fieldToUpdate, value});
            const postRef = doc(db, "Posts", postId);
             updateDoc(postRef, {
              [fieldToUpdate]: value
            })}

            const getImage = async(a) => {
              const profileImage = ref(storage, `profileImages/${a}`)
              getDownloadURL(profileImage).then((url) => {setUrl(url)})
              
          }
        
    
          
      useEffect(() => {

          getProfiles();
          
          

      }, [])

      const giveMeProfileInfo = (a) => {
       
        
            return profileList.find((profile) => profile.userId === a);
      }

    const [refreshFeed, setRefreshFeed] = useState(false);
    
    const contextValue = {refreshFeed, setRefreshFeed, profileList, giveMeProfileInfo, updatePost, getImage, url}

    return <HomeContext.Provider value={contextValue}>
           {props.children};
           </HomeContext.Provider>
    
}