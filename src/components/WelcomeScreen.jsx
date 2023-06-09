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
                    Bitter
                      </p>
                    </span>
                        <button
                          className="rounded-3xl bg-gray-700 text-base text-white hover:bg-white hover:text-black hover:border hover:border-5 hover:border-none mt-10 px-32 py-5"
                          onClick={() => {
                            setTypeOfLogin("google");
                            signInGoogle();
                          }}
                        >
                          Sign in with Google
                        </button>
                        <button
                          className="rounded-3xl bg-gray-700 text-base text-white hover:bg-white hover:text-black hover:border hover:border-5 hover:border-none mt-4 px-44 py-5"
                          onClick={() => setTypeOfLogin("mail")}
                        >
                          Sign up
                        </button>
                        <button
                          className="rounded-3xl bg-gray-500 text-base text-white hover:bg-white hover:text-black hover:border hover:border-5 hover:border-none mt-4 px-44 py-5"
                          onClick={() => setTypeOfLogin("mailLogin")}
                        >
                          Sign in
                        </button>
                        
                        <button
                          className="rounded-3xl bg-white text-base text-black hover:bg-gray-500 hover:text-black hover:border hover:border-5 hover:border-none mt-4 px-44 py-5"
                          onClick={() => anonymous()}
                        >
                          Continue as Anonymous
                        </button>
                 </>
                    
                  )}
          
                  {typeOfLogin === "mail" && (
                    <>
                      <label htmlFor="emailInput" className="mt-10">
                        Email:
                      </label>
                      <input
                        type="email"
                        name="emailInput"
                        id="emailInput"
                        placeholder="Email..."
                        className="mt-4 text-black"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label htmlFor="passwordInput" className="mt-10">
                        Password
                      </label>
                      <input
                        type="password"
                        name=""
                        id="passwordInput"
                        placeholder="Password..."
                        className="mt-4 text-black"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {wrongPassword && (<p className="mt-4 text-red-700">Email is allready in use!</p>)}
                      
                      <button
                        className="rounded-3xl bg-gray-700 text-base text-white hover:bg-white hover:text-black hover:border hover:border-5 hover:border-none mt-4 px-10 py-5"
                        onClick={() => signUpMail()}
                      >
                        Start the chase!
                      </button>
                      <button
                        className="rounded-3xl bg-gray-700 text-base text-white hover:bg-white hover:text-black hover:border hover:border-5 hover:border-none mt-4 px-10 py-5"
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
                      <label htmlFor="emailInput" className="mt-10">
                        Email:
                      </label>
                      <input
                        type="email"
                        name="emailInput"
                        id="emailInput"
                        placeholder="Email..."
                        className="mt-4 text-black"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label htmlFor="passwordInput" className="mt-10">
                        Password
                      </label>
                      <input
                        type="password"
                        name=""
                        id="passwordInput"
                        placeholder="Password..."
                        className="mt-4 text-black"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {wrongPassword && (<p className="mt-4 text-red-700">Wrong password!</p>)}
                      
                      <button
                        className="rounded-3xl bg-gray-700 text-base text-white hover:bg-white hover:text-black hover:border hover:border-5 hover:border-none mt-4 px-10 py-5"
                        onClick={() => signInMail()}
                      >
                        Start the chase!
                      </button>
                      <button
                        className="rounded-3xl bg-gray-700 text-2xl text-white  hover:bg-white hover:text-black hover:border hover:border-5 hover:border-none mt-5 px-10 py-5"
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