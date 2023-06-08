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
                

               
                    <div className="h-auto w-90 bg-slate-700 text-white text-base flex flex-col items-left mt-5 ml-10 pb-5 col-span-2 rounded-lg">
                <span className="flex flex-row items-start">
                <span className="grid grid-cols-[2fr,12fr]">
                    {postImage != null && <img src={postImage} alt="Image" className="ml-4 mt-3 mr-1.5" style={{height: '2vw', width: '2vw', borderRadius: '50%'}}/>}
                    
                

                </span>
                <span className="col-span-1 flex flex-col items-start -ml-80 mt-2">
                <span className="flex flex-row items-center">
                    {profile != null && <><h1 className="mr-2 font-bold">{profile.userName}</h1>
                    <h1>@{profile.tag}</h1></>}
                </span>
                <span className="row-span-1 col-span-1">
                <h1>{removeQuotes(comment.content)}</h1>
                </span>
                </span>
                </span>
           
                
            </div>
        </>
    )
}

export default OldComments