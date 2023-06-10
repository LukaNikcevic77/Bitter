import React from "react";  
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {auth} from "../firebase/firebase";
import { db } from "../firebase/firebase";
import {getDocs, collection, addDoc } from "firebase/firestore";
import { storage } from "../firebase/firebase";
import { ref, uploadBytes } from "firebase/storage";


function ProfileMaker(){

    
    const profileListRef = collection(db, "Profiles")
    
    const navigate = useNavigate();

    const youAreWelcome = () => {
        navigate("/Home", {replace: true});
    }
     const [profileList, setProfileList] = useState([]);

     
    
            const getProfiles = async() => {
              try{
                  const profiles = await getDocs(profileListRef);
                  const filteredProfiles = profiles.docs.map((user) => ({...user.data(), id: user.id}))
                  setProfileList(filteredProfiles)
              } catch(err) {
                alert(err);
              }
                }
    
            useEffect(() => {
    
                getProfiles();
    
            }, [])

            const verifyInput = async() => {

               let isTagUsed = false;
               let  isUserNameUsed = false;
                
                profileList.map((profile) => {

                    if(profile.tag == userAt){
                        
                        isTagUsed = true;
                        
                        return;
                    }
                    else if(profile.userName == userName) {
                        
                        isUserNameUsed = true;
                        return;
                    }
                })

                if(!isTagUsed && !isUserNameUsed && userImage != null){
                  const profileImageRef = ref(storage, `profileImages/${auth.currentUser.uid}`)
                uploadBytes(profileImageRef, userImage);
                await addDoc(profileListRef, {
                    bio: userBio,
                    tag: userAt,
                    userName: userName,
                    userId: auth.currentUser.uid,
                    followers: [],
                    following: []
                });
                youAreWelcome();
                }
                if(isTagUsed == true){
                    setTagUsed(true);
                }
                else {
                    setTagUsed(false);
                }
                 if(isUserNameUsed == true){
                    setUserNameUsed(true);
                }
                else {
                    setUserNameUsed(false);
                }
                

            
                
                
            }


          const [tagUsed, setTagUsed] = useState(false);
          const [userNameUsed, setUserNameUsed] = useState(false);

        const [userImage, setUserImage] = useState(null);
        const [userAt, setUserAt] = useState('');
        const [userName, setUserName] = useState('');
        const [userBio, setUserBio] = useState('');

    return (
        <>
            <div className="profileMaker">
                <div className="profileMakerForm">
                <label htmlFor="Image" className=" smallText">Add your profile image</label>
                <input type="file" name="Image" id="" alt="Add image" accept="image/png, image/jpeg" className="fileInput smallText" 
                onChange={(e) => {setUserImage(e.target.files[0])}}/>
               
                <label htmlFor="At" className="mediumText">Add your at:</label>
                <input type="text" name="At" id=""  maxLength={20} className="input-1 smallText" onChange={(e) => setUserAt(e.target.value)}/>
                {tagUsed && (<p className="mistake">At is allready used!</p>)}
                <label htmlFor="UserName" className="mediumText">Add your username:</label>
                <input type="text" name="UserName" id="" maxLength={30} className="input-1 smallText" onChange={(e) => setUserName(e.target.value)}/>
                {userNameUsed && (<p className="mistake">User name is allready used!</p>)}
                <label htmlFor="Bio" className="mediumText">Your bio down here:</label>
                <textarea name="Bio" id="" cols="30" rows="4" className="input-1 smallText" onChange={(e) => setUserBio(e.target.value)}></textarea>
                <button className="btn-2 smallText" 
                onClick={() => verifyInput()}>Come in!</button>
                </div>

            </div>
        </>
    )


}

export default ProfileMaker;