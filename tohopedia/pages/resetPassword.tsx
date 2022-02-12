import type { NextPage } from 'next';
import styles from '../styles/style.module.scss';
import Image from 'next/image';

const Reset: NextPage = () => {
    return(
        <div className={styles.container}>
            <header>
                <Image src="/tohopedia_logo.png" alt="" width={200} height={50}/>
            </header>
            <div className={styles.formContainer}>
              <Image src="/image.png" width={500} height={400} ></Image>
              <div className={styles.loginFormContainer}>
                <h1>Reset Password</h1>
                  <p className={styles.example}>Enter your regisered e-mail. We will send you a verification code to reset password.</p>
                <div className={styles.formContent}>
                    <form action="">
                        <div className={styles.input}>
                            <input type="email" name="email" id="email" placeholder='Email'/>
                        </div>
                        <br />
                        
                        <div className={styles.submitContainer}>
                            <input type="button" className={styles.submit} value="Next" />
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

export default Reset