import { createContext, ReactNode, useContext, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

interface Props {
    children?: ReactNode;
}
const AuthContext = createContext({
    isAuthenticated: false,
    login: () => {},
    logout: () => {}
});

export function AuthProvider({ children, ...props }: Props) {

    const [isAuthenticated, setAuthenticated] = useState(false);

    const login = () => {
        setAuthenticated(true);
    }

    const logout = () => {
        setAuthenticated(false);
    }
    
    return (
        <AuthContext.Provider value={{ isAuthenticated: isAuthenticated, login: login, logout: logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default function UserAuth () {
    return useContext(AuthContext)
}

























// import { createContext, ReactNode, useContext, useEffect, useState } from "react";
// import { 
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//     signOut,
//     onAuthStateChanged 
// } from "firebase/auth";
// import { auth } from "../../../firebase";

// interface Props {
//     children?: ReactNode;
//     email: string;
//     password: string;
// }
// const UserContext = createContext<Props>({} as Props);

// export const AuthContextProvider = ({ children, ...props }: Props) => {
    
//     const [user, setUser] = useState({});
//     const createUser = (email: string, password: string) => {
//         return createUserWithEmailAndPassword(auth, email, password)
//     }

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//             console.log(currentUser);
//             // setUser(currentUser);
//         })
//         return () => {
//             unsubscribe();
//         }
//     }, [])

//     return (
//         <UserContext.Provider value={props}>
//             {children}
//         </UserContext.Provider>
//     )
// }

// export function UserAuth() {
//     return useContext(UserContext)
// }
