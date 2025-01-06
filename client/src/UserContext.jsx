

import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    // useEffect(() => {
    //     fetch('http://127.0.0.1:3000/profile', {
    //         credentials: 'include',
    //     })
    //     .then(res => {
    //         if (res.ok) {
    //             return res.json();
    //         } 
    //         else {
    //             throw new Error('Failed to fetch user profile');
    //         }
    //     })
    //     .then(userInfo => {
    //         console.log("User info:", userInfo);
    //         setUserInfo(userInfo);
    //         setIsLoading(false);
    //         setIsLoggedIn(true);
    //     })
    //     .catch(error => {
    //         console.error("Fetch error:", error);
    //         setIsLoading(false);
    //         setIsLoggedIn(false); // Set isLoggedIn to false in case of error
    //     });
    // }, []);
    
    // const loginUser = (userInfo) => {
    //     setUserInfo(userInfo);
    //     setIsLoggedIn(true);
    // };

    // const logoutUser = () => {
    //     setUserInfo(null);
    //     setIsLoggedIn(false);
    // };

    useEffect(()=>{
        fetch('http://127.0.0.1:3000/profile',{
            credentials:'include',
        })
        .then((res)=>{
            res.json().then(userInfo=>{
                console.log(userInfo);
                setUserInfo(userInfo);
                setIsLoading(false);
            })
        })
        .catch(error=>{
            setIsLoading(true);
            console.log("Fetch error:",error)
        })
    },[])

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo, isLoading }}>
            {children}
        </UserContext.Provider>
    );
}

