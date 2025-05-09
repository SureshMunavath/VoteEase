

import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
   
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


// import React, { createContext, useEffect, useState } from "react";

// export const UserContext = createContext({});

// export function UserContextProvider({ children }) {
//     const [userInfo, setUserInfo] = useState(() => {
//         // Load user info from localStorage on mount
//         const storedUser = localStorage.getItem("userInfo");
//         return storedUser ? JSON.parse(storedUser) : null;
//     });

//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         fetch('http://127.0.0.1:3000/profile', { credentials: 'include' })
//             .then(res => res.json())
//             .then(userInfo => {
//                 console.log(userInfo);
//                 setUserInfo(userInfo);
//                 localStorage.setItem("userInfo", JSON.stringify(userInfo)); // Save to localStorage
//                 console.log(localStorage.getItem("userInfo"));
//                 setIsLoading(false);
//             })
//             .catch(error => {
//                 console.log("Fetch error:", error);
//                 setIsLoading(false);
//             });
//     }, []);

//     return (
//         <UserContext.Provider value={{ userInfo, setUserInfo, isLoading }}>
//             {children}
//         </UserContext.Provider>
//     );
// }


