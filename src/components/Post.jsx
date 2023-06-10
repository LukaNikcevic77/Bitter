import React from "react";  
import { useState, useEffect, useContext } from "react";
import  {HomeContext} from "../contexts/HomeContext";
import Comment from "./Comment";
import Like from "./Like";
function Post(props) {
   
                const [profile, setProfile] = useState(null);
                const [postImg, setPostImg] = useState(null);
                const {giveMeProfileInfo, getImage, setProfileToShowCast, setShowcaseOn, giveMeInfoForProfileDisplay, profileList} = useContext(HomeContext);
            
            const timestampTranslated = props.makingTime.toDate();

            const monthNames = [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
            ];

            const postHours = timestampTranslated.getHours().toString().padStart(2, "0");
            const postMinutes = timestampTranslated.getMinutes().toString().padStart(2, "0");

            const month = monthNames[timestampTranslated.getMonth()];
            const day = timestampTranslated.getDate().toString().padStart(2, "0");
            const getProfile = async() => {
                
                                    const retrievedData = await giveMeProfileInfo(props.uid);
                                    setProfile(retrievedData);
                                }
            useEffect(() => {

                if(profileList != null) {
                  getProfile();
                getImage(props.uid, setPostImg);  
                }
                
                
            }, [profileList])
           
    return (

        
        <>
        
             <div className="postHolder"
                onClick={() => {setProfileToShowCast(props.uid); setShowcaseOn(true); giveMeInfoForProfileDisplay(props.uid)}}>
                <span className="gridPostContainer">
                    <img className="mediumImage" src={postImg} alt="Image" />
                <span className="postDetailsContainer">
                    <span className="postNameAndTime">

                        {profile != null &&
                         <>
                         <h1 className="smallText">{profile.userName}</h1>
                         <h1 className="smallText">@{profile.tag}</h1>
                         <h1 className="smallText" style={{marginRight: '2vw', marginBottom: '1vw'}}>|</h1>
                         <span style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                         <p className="smallText">{month} {day}</p>
                         <p >{postHours} : {postMinutes}</p>
                         </span>
                         </>}

                    </span>

                    <span className="postContent smallText">
                    <h1>{props.content}</h1>
                    </span>
                 </span>
                </span>
                
                    
               
                
                
                <span className="grid grid-cols-2 gap-4">
                
                <Like likes={props.likes} postId={props.postId} className="col-span-2" />
                <Comment comments={props.comments} postId={props.postId} className="col-span-2" />
                </span>
                
                
            
           
                
            </div>

            
                
                

        
            
        </>
    )

}

export default Post;