import type { NextPage } from 'next';
import styles from '../styles/style.module.scss';
import Image from 'next/image';

const Register: NextPage = () => {
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
                    <form action="">
                        <div className={styles.input}>
                            <label htmlFor="email">Email</label>
                            <br />
                            <input type="email" name="email" id="email" />
                        </div>
                        <div >
                            <label htmlFor="example" className={styles.example}>
                                Example: email@tohopedia.com
                            </label>
                        </div>
                        <br />
                        <div className={styles.submitContainer}>
                            <input type="button" className={styles.submit} value="Sign Up" />
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