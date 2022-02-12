import type { NextPage } from 'next';
import styles from '../styles/header.module.scss';
import Image from 'next/image';
import { gql } from '@apollo/client';

const Header: NextPage = () => {
    return(
        <div className={styles.container}>
            <header>
              <li className={styles.list}>
                <ul>
                  <Image src="/tohopedia_logo.png" alt="" width={200} height={50}/>
                </ul>
                <ul>
                  <p>Category</p>
                </ul>
                <ul> 
                  <input type="search" name="search" id="" className='searchBar' placeholder='Search Product'/>
                </ul>
                <ul>
                  <button className={styles.search}>
                  <Image src="/search.png" alt="" width={20} height={20}/>

                  </button>
                </ul>
                <ul>
                  <button className={styles.cart}>
                  <Image src="/cart.png" alt="" width={20} height={20}/>

                  </button>
                </ul>
                <ul>
                  <button className={styles.login}>Login</button>
                </ul>
                <ul>
                  <button className={styles.register}>Register</button>
                </ul>
              </li>
            </header>
             
        </div>
    )
}

export default Header