import type { NextPage } from 'next';
import styles from '../styles/header.module.scss';
import Image from 'next/image';
import { FaBell, FaEnvelope, FaMapMarkerAlt, FaSearch, FaShoppingCart } from "react-icons/fa";


const Header: NextPage = () => {
    return(
        <div className={styles.container}>
            <header>
              <li className={styles.list}>
                <ul>
                  <a href="/home">
                    <Image src="/tohopedia_logo.png" className={styles.logo} alt="" width={200} height={50}/>
                    
                  </a>
                </ul>
                <div className={styles.searchRes}>
                  <ul>
                    <p className={styles.category}>Category</p>
                  </ul>
                  <ul className={styles.searchContainer}>
                    <input type="text" name="search" id="" className={styles.searchBar} placeholder='Search Product'/>
                  <button className={styles.button} type="submit"><FaSearch></FaSearch></button>
                  </ul>

                  
                </div>
                <div className={styles.dropdownTitle}>
                  <a href="/login">
                    <h2 ><FaShoppingCart></FaShoppingCart></h2>
                    
                  </a>
                    
                    <div className={styles.dropdownContentContainer}>No Items in Cart</div>
                    
                  </div>
                
                <ul>
                  <button className={styles.login}><a href="/login">Login</a></button>
                </ul>
                <div>
                  <ul>
                    <button className={styles.register}><a href="/register">Register</a></button>                  
                  </ul>
                  <ul>
                  <p><FaMapMarkerAlt></FaMapMarkerAlt> Alam Sutera</p>
                  </ul>
                </div>

              </li>
            </header>
        </div>
    )
}

export default Header