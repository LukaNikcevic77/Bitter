import React from "react";
import {useContext, useState, useEffect, createContext} from "react";
import { db, storage } from "../firebase/firebase";
import {getDocs, collection, orderBy, updateDoc, doc, addDoc, serverTimestamp} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

export const HomeContext = createContext(null);

export const HomeContextProvider = (props) => {

    const profileListRef = collection(db, "Profiles")
    const postsListRef = collection(db, "Posts");

    const [profileList, setProfileList] = useState(null);
    const [url, setUrl] = useState(null);
    const [canPost, setCanPost] = useState(false);
    

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
        
            const giveMeProfileInfo = (a) => {
       
        
              return profileList.find((profile) => profile.userId === a);
        }
        const addPost = async(userId, content, updateDom) => {


          setCanPost(true);
          const timestamp = serverTimestamp();
          await addDoc(postsListRef, {
            Comments: [],
            Content: content,
            CreatedBy: userId,
            CreatedTime: timestamp,
            Likes: 0
          })

          setCanPost(false);
          updateDom();


        }
          
            useEffect(() => {
              
              getProfiles();
              
              
              
            }, [])
            
            

    const [refreshFeed, setRefreshFeed] = useState(false);
    
    const contextValue = {refreshFeed, setRefreshFeed, profileList, giveMeProfileInfo, updatePost, getImage, url, canPost, addPost}

    return <HomeContext.Provider value={contextValue}>
           {props.children};
           </HomeContext.Provider>
    
}