import React, {useId} from 'react'
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next"
import {Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import mock from  "../../mock.json"


type Inputs = { 
    userName: string,
    password: string
}


const Login = () => {
    const [t, i18n] = useTranslation("login")

    const {register, formState: { errors }, handleSubmit, watch, getValues} = useForm<Inputs>({
        defaultValues: {
            userName: '',
            password: ''
        }
    })
    const id = useId()
    let navigate = useNavigate();

    const user = mock.user.userId.toLowerCase()
    const userPassword = mock.user.password

    const formSubmit = (data) =>{
        navigate("/home")
        console.log(data)  
    }
    const userValidator = (value) =>{
        return value === user
    }
    const passwordValidator = (value) =>{
        return value === userPassword
    }
    return(
        <div>
            <button onClick={() => i18n.changeLanguage("es")}>ES</button>
            <button onClick={() => i18n.changeLanguage("en")}>EN</button>
            <p>{t("login.title")}</p>
            <form  onSubmit={handleSubmit(formSubmit)}>
                <div>
                <label htmlFor={id + 'user'}>{t("login.user")}</label>
                    <input id={id + 'user'} type="text"  {...register('userName', {
                        required: true,
                        validate: userValidator
                        
                    })}/>
                    {errors.userName?.type && <p>{t("login.erruser")}</p>}
                </div>
                <div>
                    <label htmlFor={id + 'pass'}>{t("login.password")}</label>
                    <input id={id + 'pass'} type="password"  {...register('password', {
                        required: true,
                        validate: passwordValidator
                        
                    })}/>
                    {errors.password?.type && <p>{t("login.errpass")}</p>}
                </div>
                
                <input type="submit" value={t("login.enter")}/>
            </form>
        </div>
    )
}

export default Login;