import React from "react";  
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import { LogInContext } from "../contexts/LogInContext";
import {auth, googleProvider} from "../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";


function WelcomeScreen(){

    const navigate = useNavigate();

    const youAreWelcome = () => {
        navigate("/Home", {replace: true});
    }


    const {loggedIn, setLoggedIn} = useContext(LogInContext);
    const [typeOfLogin, setTypeOfLogin] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signInMail = async() => {

        await createUserWithEmailAndPassword(auth, email, password);
        youAreWelcome();

    }

    const signInGoogle = async() => {

        await signInWithPopup(auth, googleProvider);
        youAreWelcome();

    }

    if(!loggedIn){

        

        return (
            <>
            <div className="bg-black text-9xl w-screen h-screen overflow-hidden -mb-10">

                <div className="bg-black">
                    
                    <p className="text-white flex flex-row items-start pt-10 pl-20">
                    <FontAwesomeIcon icon={faCertificate} className="text-yellow-300 mr-10 text-8xl pt-4"/>Clout</p>
                </div>

                <div className="bg-gray-800 opacity-100 text-white flex flex-col items-center m-auto w-2/5 mt-80 py-44 rounded-3xl border-white overflow-hidden">
                    {typeOfLogin === "" &&
                   <>
                   <p className="text-center">Welcome to our app where <br /> you can chase all the clout you want!</p>
                   <button className="rounded-3xl bg-gray-700 text-4xl text-white p-10 hover:bg-white hover:text-black hover:border hover:border-5 hover:border-none mt-28 px-20"
                   onClick={() => {setTypeOfLogin("google"), signInGoogle()}}>Sign in with Google</button>
                   <button className="rounded-3xl bg-gray-500 text-4xl text-white p-10 hover:bg-white hover:text-black hover:border hover:border-5 hover:border-none mt-10 px-44"
                   onClick={() => setTypeOfLogin("mail")}>Sign up</button>
                   <button className="rounded-3xl bg-white text-4xl text-black p-10 hover:bg-gray-500 hover:text-black hover:border hover:border-5 hover:border-none mt-10">Continue as Anonymous</button>
                   </>}
                   {typeOfLogin === "mail" && 
                   <>
                   <label htmlFor="emailInput" className="">Email:</label>
                   <input type="email" name="emailInput" id="emailInput" placeholder="Email..." className="mt-10 text-black" onChange={(e) => setEmail(e.target.value)}/>
                   <label htmlFor="passwordInput" className="mt-20">Password</label>
                   <input type="password" name="" id="passwordInput" placeholder="Password..." className="mt-10 text-black" onChange={(e) => setPassword(e.target.value)}/>
                   <button className="rounded-3xl bg-gray-700 text-9xl text-white p-10 hover:bg-white hover:text-black hover:border hover:border-5 hover:border-none mt-8 px-20"
                   onClick={() => signInMail()}>Start the chase!</button>
                   <button className="rounded-3xl bg-gray-700 text-4xl text-white p-10 hover:bg-white hover:text-black hover:border hover:border-5 hover:border-none mt-10 px-20"
                   onClick={() => {setTypeOfLogin(''), setEmail(''), setPassword('')}}>Go back</button>
                   </>}
                   </div>
            </div>
            </>
        )
        
        
    }
       

}

export default WelcomeScreen;