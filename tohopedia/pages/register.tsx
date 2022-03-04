import type { NextPage } from 'next';
import styles from '../styles/style.module.scss';
import Image from 'next/image';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { Router } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"


const Register: NextPage = () => {

    const REGISTER_USER = gql`
        mutation Register($email:String!, $password:String!, $username: String!, $name: String!, $phone: String!, $gender:String!, $dob:Date!){
        auth{
            register(input:{
            email:$email,
            password:$password,
            username:$username,
            name:$name,
            phone:$phone,
            gender:$gender,
            dob:$dob
            })
        }
        }
    `

    const[reg, {loading, error, data}] = useMutation(REGISTER_USER)
    const schema = yup.object().shape({
        email: yup.string().required(),
        password: yup.string().required(),
        username: yup.string().required(),
        name: yup.string().required(),
        phone: yup.string().required(),
        dob: yup.string().required()
    }).required()
    

    const { register, handleSubmit, formState:{errors} } = useForm({
        resolver: yupResolver(schema)
    })
    if(loading){
        return(
            <div>Loading</div>
        )
    }

    async function onSubmit(data:any){
        // alert('hi')
        console.log(data.email)
        console.log(data.password)
        console.log(data.username)
        console.log(data.name)
        console.log(data.phone)
        console.log(data.gender)
        console.log(data.dob)

        try {
            await reg({
                variables:{
                    email: data.email,
                    password: data.password,
                    username: data.username,
                    name: data.name,
                    phone: data.phone,
                    gender: data.gender,
                    dob: data.dob 
                }
            })
            
        } catch (error) {
            console.log(error)
            
        }
        
    }

    if(data){
        // Router.push('/home')
        console.log('registered')
    }

    

    return(
        <div className={styles.container}>
            <header>
                <Image src="/tohopedia_logo.png" alt="" width={200} height={50}/>
            </header>
            <div className={styles.formContainer}>

                <div className={styles.logo}>
                    <Image src="/image.png" width={500} height={400} ></Image>
                    <h3>Discover Millions of Trusted Shops</h3>
                    <h5>Join and enjoty the best online shopping experience</h5>
                </div>


            <div className={styles.loginFormContainer}>
                <h1 className={styles.registerTitle}>Sign Up Now</h1>
                <h5>Already have a Tohopedia account?<a href="./login" className={styles.subtitle}> Log In</a></h5>

                <div className={styles.formContent}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.input}>
                            <label htmlFor="email">Email</label>
                            <br />
                            <input type="email" {...register("email")} id="email" />
                            <p className={styles.error}>{errors.email?.message}</p>
                        </div>
                        <div >
                            <label htmlFor="example" className={styles.example}>
                                Example: email@tohopedia.com
                            </label>
                        </div>
                        <div className={styles.input}>
                            <label htmlFor="password">Password</label>
                            <br />
                            <input type="password" {...register("password")} id="password" />
                            <p className={styles.error}>{errors.password?.message}</p>
                        </div>
                        <div className={styles.input}>
                            <label htmlFor="username">Username</label>
                            <br />
                            <input type="text" {...register("username")} id="username" />
                            <p className={styles.error}>{errors.username?.message}</p>
                        </div>
                        <div className={styles.input}>
                            <label htmlFor="name">Name</label>
                            <br />
                            <input type="text" {...register("name")} id="name" />
                            <p className={styles.error}>{errors.name?.message}</p>
                        </div>
                        <div className={styles.input}>
                            <label htmlFor="phone">Phone</label>
                            <br />
                            <input type="text" {...register("phone")} id="phone" />
                            <p className={styles.error}>{errors.phone?.message}</p>
                        </div>
                        <div className={styles.input}>
                            
                            <label htmlFor="gender">Gender</label>
                            <br />
                            <input type="radio"  {...register("gender")} name="genderrb" value="female" id="female"  />
                            <label htmlFor="female">Female</label>
                            <input type="radio" {...register("gender")} name="genderrb" value="male" id="male" />
                            <label htmlFor="male">Male</label>
                            <p className={styles.error}>{errors.gender?.message}</p>
                        </div>
                        <div className={styles.input}>
                            <label htmlFor="dob">DOB</label>
                            <br />
                            <input type="date" {...register("dob")} id="dob" />
                            <p className={styles.error}>{errors.dob?.message}</p>

                        </div>
                        <br />
                        
                        <div className={styles.submitContainer}>
                            <button type='submit' className={styles.submit}>
                                Register
                            </button>
                        </div>
                    </form>
                    <div >
                            <label htmlFor="example" className={styles.example}>
                                By signing up, I agree to <br /> <a href="http://tokopedia.com" className={styles.subtitle} target="_blank">Terms & Conditions and Privacy Policy</a>
                            </label>
                        </div>
                </div>
            </div>
            </div>
            <footer>
                <p>&copy; 2009-2021, PT Tohopedia</p>
            </footer>
        </div>
    )
}

export default Register