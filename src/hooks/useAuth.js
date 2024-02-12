import { useEffect, useState } from "react";
// import { Auth } from "../helper/Auth";
import { login } from './../services/api'
import useLocalStorage from './useLocalStorage'
import moment from 'moment';

export default function useProvideAuth() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    useEffect(() => {
        if (user) {
            console.log("console")
            allowOrNot()
        }
    }, [])

    const allowOrNot = () => {
        if (user) {
            if (!user.rememberMe) {
                var now = moment(new Date()); //todays date
                var end = moment(user.lastLoggedIn); // another date
                var duration = moment.duration(now.diff(end));
                var days = duration.asDays();
                console.log({ days })
                if (days > 1) {
                    setUser(null)
                    localStorage.removeItem("user")
                }
            }
        }
    }

    const signIn = async (data, redirect, loading) => {
        try {
            const res = await login(data)
            const loginData = {
                ...res.data.data,
                lastLoggedIn: moment(),
                rememberMe: data.remember
            }
            // console.log({ loginData })
            setUser(loginData)
            localStorage.setItem('user', JSON.stringify(loginData))
            // sessionStorage.setItem('user', JSON.stringify(res.data.data))
            redirect()
            loading()
        } catch (error) {
            loading()
            console.log({ error })
        }
    };

    const signOut = cb => {
        window.localStorage.clear()
        setUser(null)
        cb();
    };

    return {
        user,
        signIn,
        signOut,
    };
}