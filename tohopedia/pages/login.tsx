import type { NextPage } from 'next';
import styles from '../styles/style.module.scss';
import Image from 'next/image';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { setCookies } from 'cookies-next'
import Router from "next/router";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"

const Login: NextPage = () => {
    

    const LOGIN_QUERY = gql `
    mutation auth($email: String!, $password: String!){
        auth{
            login(email:$email, password:$password)
        }
    }
    `

    const[login, {loading, error, data}] = useMutation(LOGIN_QUERY)

    const schema = yup.object({
        email: yup.string().required(),
        password: yup.string().required(),
    }).required()

    const { register, handleSubmit, formState:{errors} } = useForm({
        resolver: yupResolver(schema)
    });

    async function onSubmit(data:any){
        console.log('tes login')
        console.log(data.email)
        console.log(data.password)
        console.log(data)
        

        // alert('hi')
        try {
            await login({
                variables:{
                    email: data.email,
                    password: data.password
                }
            })
            
        } catch (error) {
            console.log(error)
            
        }
        
    }

    if(data){
        setCookies('currUser', data.auth.login.token)
        Router.push('/home')
    }



    return(
        <div className={styles.container}>
            <header >
                <Image src="/tohopedia_logo.png" alt="" width={200} height={50}/>
            </header>
            <div className={styles.formContainer}>
            <div className={styles.header}>
            <Image  src="/image.png" width={500} height={400} ></Image>

            </div>
            <div className={styles.loginFormContainer}>
                <div className={styles.title}>
                    <h1 className={styles.title}>Login</h1>
                    <h3 className={styles.subtitle}><a href="./register">Sign Up</a></h3>
                </div>
                <div className={styles.formContent}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.input}>
                            <label htmlFor="email">Email</label>
                            <br />
                            <input type="email" id="email" {...register("email")}/>
                            <p className={styles.error}>{errors.email?.message}</p>
                        </div>
                        <br />
                        <div className={styles.input}>
                            <label htmlFor="password">Password</label>
                            <br />
                            <input type="password" id="password" {...register("password")}/>
                            <p className={styles.error}>{errors.password?.message}</p>

                        </div>
                        <br />
                        <div className={styles.inputCheckbox}>
                            <label htmlFor="checkbox">
                                <input type="checkbox" name="checkbox" id="checkbox" />
                                Remember Me
                            </label>
                            <label htmlFor="forgot">
                                <a href="./resetPassword" className={styles.forgot}>
                                    Forgot Password?
                                </a>
                            </label>
                        </div>
                        <div className={styles.submitContainer}>
                            <button type='submit' className={styles.submit}>
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
            <footer>
                <p>&copy; 2009-2021, PT Tohopedia</p>
            </footer>
        </div>
    )
}

export default Login