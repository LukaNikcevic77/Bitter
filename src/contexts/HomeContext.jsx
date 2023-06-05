import React from "react";
import {useContext, useState, useEffect, createContext} from "react";
import { db, storage } from "../firebase/firebase";
import {getDocs, collection, orderBy, updateDoc, doc, getDoc, addDoc, serverTimestamp, arrayUnion, arrayRemove} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

export const HomeContext = createContext(null);

export const HomeContextProvider = (props) => {

    const profileListRef = collection(db, "Profiles")
    const postsListRef = collection(db, "Posts");
    const [showcaseOn, setShowcaseOn] = useState(false);
    const [profileToShowCase, setProfileToShowCast] = useState(null);
    const [profileToShowCaseObject, setProfileToShowCaseObject] = useState(null);

    const [profileList, setProfileList] = useState(null);
    const [url, setUrl] = useState(null);
    const [canPost, setCanPost] = useState(false);
    const [canComment, setCanComment] = useState(false);

    const [postList, setPostList] = useState(null);
    const [postsLoaded, setPostsLoaded] = useState(false);
    
    const removeQuotes = (a) => {
        return a.replace(/^"(.*)"$/, '$1');
    }

    const getProfiles = async() => {
        try{
            const profiles = await getDocs(profileListRef);
            const filteredPosts = profiles.docs
            .map((post) => ({...post.data(), profileId: post.id}));
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
            
            const getImage = async(a, b) => {

              const profileImage = ref(storage, `profileImages/${a}`)
              getDownloadURL(profileImage).then((url) => {b(url)})
            }

           const follow = async(a, b, whatToDo) => {

                const Target = doc(db, "Profiles", a.profileId);
                 const User = doc(db, "Profiles", b.profileId);


            if(whatToDo === "follow"){
                
               updateDoc(Target, {
                followers: arrayUnion(b.userId)
               })
               updateDoc(User, {
                following: arrayUnion(a.userId)
               })

            }
            else if(whatToDo === "unfollow"){
              updateDoc(Target, {
                followers: arrayRemove(b.userId)
               })
               updateDoc(User, {
                following: arrayRemove(a.userId)
               })
            }
          
            /* updateDoc(postRef, {
              Comments: arrayUnion(content)
            })
            setCanComment(false);
            getPosts();

            } */
           }
        
            const giveMeProfileInfo = async(a) => {
       
              if(profileList == null){
                await getProfiles();
                return profileList.find((profile) => profile.userId === a);
              }
              else {
                return profileList.find((profile) => profile.userId === a);
              }
        }

        const giveMeInfoForProfileDisplay = async (documentId) => {
          try {
            const docRef = doc(db, "Profiles", documentId);
            const docSnapshot = await getDoc(docRef);
            
            if (docSnapshot.exists()) {
              const documentData = docSnapshot.data();
              console.log("It passed!");
              setProfileToShowCaseObject(documentData);
            } else {

              console.log("Document does not exist");
            }
          } catch (error) {
            console.log("Error getting document:", error);
          }
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
        const addComment = async(postId, content) => {
          setCanComment(true);
          const postRef = doc(db, "Posts", postId);
             updateDoc(postRef, {
              Comments: arrayUnion(content)
            })
            setCanComment(false);
            getPosts();
        }
        const getPosts = async() => {
        try{
            const posts = await getDocs(postsListRef);
            const filteredPosts = posts.docs
            .map((post) => ({...post.data(), postId: post.id}))
            .sort((a, b) => a.CreatedTime.toMillis() > b.CreatedTime.toMillis() ? -1 : 1);
            setPostList(filteredPosts)
           
         
            setPostsLoaded(true);
            
        } catch(err) {
          alert(err);
        }
          }
          
          
            useEffect(() => {
              
              getProfiles();
              
              
              
            }, [])
            
            

    const [refreshFeed, setRefreshFeed] = useState(false);
    
    const contextValue = {refreshFeed, setRefreshFeed, profileList, giveMeProfileInfo, updatePost, getImage, url,
       canPost, addPost, postList, postsLoaded, getPosts, addComment, removeQuotes, 
      showcaseOn, setShowcaseOn, profileToShowCase, setProfileToShowCast, follow, giveMeInfoForProfileDisplay, profileToShowCaseObject}

    return <HomeContext.Provider value={contextValue}>
           {props.children};
           </HomeContext.Provider>
    
}