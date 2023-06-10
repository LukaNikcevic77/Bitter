import React from "react";  
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";
import { LogInContext } from "../contexts/LogInContext";
import {auth, googleProvider} from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { faLemon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function WelcomeScreen(){
  const [typeOfLogin, setTypeOfLogin] = useState("");
    const navigate = useNavigate();

    const youAreWelcome = (a) => {
      if (typeOfLogin !== "guest" && auth.currentUser) {
        setLoggedInUSerId(auth.currentUser.uid);
      }
      
        navigate(a, {replace: true});
    }

    const profileListRef = collection(db, "Profiles");
    


    const {loggedIn, setLoggedInUSerId} = useContext(LogInContext);
    
    const [wrongPassword, setWrongPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUpMail = async() => {
        
        try{

            await createUserWithEmailAndPassword(auth, email, password);

        
        youAreWelcome("/ProfileMaker");

        } catch(err) {
            setWrongPassword(true);
        }
        

    }

    const anonymous = async() => {
      try {
        await signOut(auth);
       await setTypeOfLogin("guest");
       youAreWelcome("/Home");

      } catch (err) {
      }

    }

    const signInMail = async() => {

       try {
        await signInWithEmailAndPassword(auth, email, password);

        
        youAreWelcome("/Home");
    
    } catch(err){
        setWrongPassword(true);
    }
    }



    const signInGoogle = async() => {

        await signInWithPopup(auth, googleProvider);

        const profiles = await getDocs(profileListRef);
        const filteredProfiles = profiles.docs.map((user) => ({...user.data(), id: user.id}))
        
        if(filteredProfiles.map((userL) => {

            if(userL.userId == auth.currentUser.uid){
              return true;
            }
          })){
          youAreWelcome("/Home");

        }
        else {
          youAreWelcome("/ProfileMaker");
        }
        

    }

    

    if(!loggedIn){
            return (
            <>
              
              <div className="welcomeScreen mediumText">
                <div className="welcomeForm mediumText">
                  {typeOfLogin === "" && (
                    <>
                    <span className="nameSpan">
                      <p className="largeText">
                      <FontAwesomeIcon
                      icon={faLemon}
                      className="logo mediumText"
                    />
                   
                      </p> 
                      <p className="largeText title">Bitter</p>
                    </span>
                        <button
                          className="btn-1 mediumText"
                          onClick={() => {
                            setTypeOfLogin("google");
                            signInGoogle();
                          }}
                        >
                          Sign in with Google
                        </button>
                        <button
                          className="btn-1 mediumText"
                          onClick={() => setTypeOfLogin("mail")}
                        >
                          Sign up
                        </button>
                        <button
                          className="btn-1 mediumText"
                          onClick={() => setTypeOfLogin("mailLogin")}
                        >
                          Sign in
                        </button>
                        
                        <button
                          className="btn-2 mediumText"
                          onClick={() => anonymous()}
                        >
                          Continue as Anonymous
                        </button>
                 </>
                    
                  )}
          
                  {typeOfLogin === "mail" && (
                    <>
                      <label htmlFor="emailInput" className="largeText">
                        Email:
                      </label>
                      <input
                        type="email"
                        name="emailInput"
                        id="emailInput"
                        placeholder="Email..."
                        className="input-1 mediumText"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label htmlFor="passwordInput" className="largeText">
                        Password
                      </label>
                      <input
                        type="password"
                        name=""
                        id="passwordInput"
                        placeholder="Password..."
                        className="input-1 mediumText"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {wrongPassword && (<p className="mistake">Email is allready in use!</p>)}
                      
                      <button
                        className="btn-1 mediumText"
                        onClick={() => signUpMail()}
                      >
                        Start the chase!
                      </button>
                      <button
                        className="btn-2 smallText"
                        onClick={() => {
                          setTypeOfLogin("");
                          setEmail("");
                          setPassword("");
                        }}
                      >
                        Go back
                      </button>
                    </>
                  )}
                  {typeOfLogin === "mailLogin" && (
                    <>
                      <label htmlFor="emailInput" className="largeText">
                        Email:
                      </label>
                      <input
                        type="email"
                        name="emailInput"
                        id="emailInput"
                        placeholder="Email..."
                        className="input-1 mediumText"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label htmlFor="passwordInput" className="largeText">
                        Password
                      </label>
                      <input
                        type="password"
                        name=""
                        id="passwordInput"
                        placeholder="Password..."
                        className="input-1 mediumText"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {wrongPassword && (<p className="mistake">Wrong password!</p>)}
                      
                      <button
                        className="btn-1 mediumText"
                        onClick={() => signInMail()}
                      >
                        Start the chase!
                      </button>
                      <button
                        className="btn-2 smallText"
                        onClick={() => {
                          setTypeOfLogin("");
                          setEmail("");
                          setPassword("");
                        }}
                      >
                        Go back
                      </button>
                    </>
                  )}
                </div>
              
            </div>
            </>
          )
          
            
        }
                    
    }
                

                



export default WelcomeScreen;