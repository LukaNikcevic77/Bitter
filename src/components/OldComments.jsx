import React from "react";  
import { useState, useEffect, useContext } from "react";
import { HomeContext } from "../contexts/HomeContext";

function OldComments(props) {

    const {giveMeProfileInfo, getImage, removeQuotes} = useContext(HomeContext);
    const [postImage, setPostImage] = useState(null);
    const [profile, setProfile] = useState(null);

    const{comment} = props;

    const getProfile = async(a) => {
        const retrievedData = await giveMeProfileInfo(a);

        setProfile(retrievedData);
    }
    useEffect(() => {

                getImage(comment.uid, setPostImage)
                getProfile(comment.uid);
    }, [])

    return (
        <>
                

               
                    <div className="oldComments">
                <span className="bigSpanHolder">
                <span className="imageHolder">
                    {postImage != null && <img src={postImage} alt="Image" className="mediumImage"/>}
                    
                

                </span>
                <span className="profileDetailHolderOne">
                <span className="focusedProfileDetailHolder">
                    {profile != null && <><h1 className="mediumText bold" style={{marginRight: '0.7vw'}}>{profile.userName}</h1>
                    <p className="mediumText normal">@{profile.tag}</p></>}
                </span>
                <span className="contentHolder">
                <p className="mediumText normal">{removeQuotes(comment.content)}</p>
                </span>
                </span>
                </span>
           
                
            </div>
        </>
    )
}

export default OldComments