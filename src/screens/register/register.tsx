import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../../features/slices/userSlice";
import { auth } from "../../firebase"; //onAuthStateChanged

// https://blog.gmagnenat.co/user-authentication-and-persistence-firebase-9-react-redux-toolkit
function Register() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     onAuthStateChanged(auth, (userAuth) => {
    //         if (userAuth) {
    //             dispatch(
    //                 login({
    //                     email: userAuth.email,
    //                     uid: userAuth.uid,
    //                     displayName: userAuth.displayName,
    //                     photoUrl: userAuth.photoURL,
    //                 })
    //             );
    //         } else {
    //             dispatch(logout());
    //         }
    //     });
    // }, []);
}