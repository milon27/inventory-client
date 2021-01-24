import Header from '../component/layout/Header';
import Body from '../component/layout/Body';
import Footer from '../component/layout/Footer';
import Head from 'next/Head'
import { useRouter } from 'next/router'
import { useContext, useState, useEffect } from 'react';
import { DispatchContext, StateContext } from '../utils/context/AppContext';
import AuthAction from '../utils/actions/AuthAction';
import LoginForm from '../component/login/LoginForm';
import Response from '../utils/Response';
import AppAction from '../utils/actions/AppAction';
import URL from '../utils/URL';


export default function login() {
    const { auth, app } = useContext(StateContext)
    const { authDispatch, appDispatch } = useContext(DispatchContext)

    const router = useRouter()
    //local state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    //life cycle
    useEffect(() => {
        // console.log("auth ", auth.id);
        if (auth.id) {
            router.push(URL.HOME)
        }
    }, [auth])

    //methods
    const onSubmit = async (e) => {
        e.preventDefault();
        AppAction.getInstance(appDispatch).START_LOADING();
        let em = email.toLocaleLowerCase().trim();
        let pass = password.trim();
        let validation_res = validation(em, pass);
        if (validation_res.success) {//user info is valid , call login action
            try {
                const userRes = await AuthAction.getInstance(authDispatch).Login(em, password)
                AppAction.getInstance(appDispatch).STOP_LOADING();
            } catch (e) {
                console.log(e);
                AppAction.getInstance(appDispatch).SET_RESPONSE(Response(false, e.message, "Something Went Wrong! try again", "danger"));
                AppAction.getInstance(appDispatch).STOP_LOADING();

            }
        } else {
            AppAction.getInstance(appDispatch).SET_RESPONSE(validation_res);
            AppAction.getInstance(appDispatch).STOP_LOADING();
        }
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const validation = (email, password) => {
        if (email !== null && email !== "" && password !== null && password !== "") {
            return Response(true, "all field are correctly filled", "all field are correctly filled,please wait for authentication.", "info");
        } else {
            return Response(false, "Enter All the Fields", "may be you missed some fileds to fill", "danger");
        }
    }




    return (
        <>
            <Head>
                <title>login/signup</title>
                <link rel="icon" href="/favicon.png" />
                {/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link> */}
            </Head>
            <Body>

                <LoginForm
                    onSubmit={onSubmit}
                    onChangeEmail={onChangeEmail}
                    onChangePassword={onChangePassword}
                    email={email}
                    password={password}
                />

            </Body>
            <Footer />
        </>
    )
}
