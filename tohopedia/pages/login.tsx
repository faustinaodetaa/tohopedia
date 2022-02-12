import type { NextPage } from 'next';
import styles from '../styles/style.module.scss';
import Image from 'next/image';
import { gql, useQuery } from '@apollo/client';

const Login: NextPage = () => {

    const USER_QUERY = gql `
    query GetAllUser{
        users{
            id
            email
            password
            username
            name
            
        }
        }
    `

    const{loading, error, data} = useQuery(USER_QUERY)
console.log(data)
    return(
        <div className={styles.container}>
            <header>
                <Image src="/tohopedia_logo.png" alt="" width={200} height={50}/>
            </header>
            <div className={styles.formContainer}>

            <Image src="/image.png" width={500} height={400} ></Image>
            <div className={styles.loginFormContainer}>
                <div className={styles.title}>
                    <h1 className={styles.title}>Login</h1>
                    <h3 className={styles.subtitle}><a href="./register">Sign Up</a></h3>
                </div>
                <div className={styles.formContent}>
                    <form action="">
                        <div className={styles.input}>
                            <label htmlFor="email">Email</label>
                            <br />
                            <input type="email" name="email" id="email" />
                        </div>
                        <br />
                        <div className={styles.input}>
                            <label htmlFor="password">Password</label>
                            <br />
                            <input type="password" name="password" id="password" />
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
                            <input type="button" className={styles.submit} value="Login" />
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