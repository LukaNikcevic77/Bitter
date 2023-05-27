import React from "react";  
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { LogInContext } from "../contexts/LogInContext";
import {auth, googleProvider} from "../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";


function WelcomeScreen(){

    const navigate = useNavigate();

    const youAreWelcome = () => {
        navigate("/ProfileMaker", {replace: true});
    }


    const {loggedIn, setLoggedIn} = useContext(LogInContext);
    const [typeOfLogin, setTypeOfLogin] = useState('');
    const [wrongPassword, setWrongPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUpMail = async() => {
        
        try{

            await createUserWithEmailAndPassword(auth, email, password);

        
        youAreWelcome();

        } catch(err) {
            setWrongPassword(true);
        }
        

    }

    const signInMail = async() => {

       try {
        await signInWithEmailAndPassword(auth, email, password);

        
        youAreWelcome();
    
    } catch(err){
        setWrongPassword(true);
    }
    }



    const signInGoogle = async() => {

        await signInWithPopup(auth, googleProvider);
        youAreWelcome();

    }


    useEffect(() => {console.log(typeOfLogin)},[])

    if(!loggedIn){
            return (
            <>
              
              <div className="bg-black text-2xl w-screen h-screen overflow-hidden -mb-10 pt-10">
                <div className="bg-gray-800 opacity-100 text-white flex flex-col items-center m-auto w-2/5 h-2/3 mt-16 py-14 rounded-3xl border-white overflow-hidden">
                  {typeOfLogin === "" && (
                    <>
                      <p className="text-center">
                        Welcome to our app where <br /> you can chase all the clout you
                        want!
                      </p>
          
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
                          onClick={() => {
                            setTypeOfLogin("guest");
                            youAreWelcome();
                          }}
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