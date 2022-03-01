import type { NextPage } from 'next';
import styles from '../styles/header.module.scss';
import Image from 'next/image';
import { gql, useQuery } from '@apollo/client';
import { FaBell, FaEnvelope, FaMapMarkerAlt, FaSearch, FaShoppingCart } from "react-icons/fa";
import Link from 'next/link';



const Header: NextPage = () => {
  const GET_USER = gql`query GetCurrUser{
    getCurrentUser{
      id,
      name,
      picture
    }
  }`
  
  const {loading: l, error: e, data: d} = useQuery(GET_USER)

  const GET_SHOP = gql`query GetCurrentShop{
    getShop{
     id,
     name,
     profile
   }
   }
   `

   const {loading, error, data} = useQuery(GET_SHOP)
   console.log(data)
   
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
                <ul className={styles.searchContainer}>
                  <input type="text" name="search" id="" className={styles.searchBar} placeholder='Search Product'/>
                </ul>
                  <h2><FaSearch></FaSearch></h2>
                  <h2><FaShoppingCart></FaShoppingCart></h2>
                  <h2><FaBell></FaBell></h2>
                  <h2><FaEnvelope></FaEnvelope></h2>
                
                <div>
                  <ul>
                
                    {/* <button className={styles.login}><a href="/addShop">Open Shop</a></button> */}
                    {/* <Image src="/{data?.getShop?.profile}" width={50} height={50} ></Image> */}

                  <p>
                    {data?
                        <div className={styles.profile}>
                          <Image src="/tohopedia_logo.png" alt="profile" width={50} height={50}/>
                        <a href="../shop">
                        {data?.getShop?.name}
                        </a>
                      </div>   : <button className={styles.login}><a href="/addShop">Open Shop</a></button>}
                  </p>
                  </ul>
                </div>
                <div>
                  <ul>
                    <div className={styles.profile}>
                      <Image src="/tohopedia_logo.png" alt="profile" width={50} height={50}/>
                      <p>{d?.getCurrentUser?.name}</p>  
                    </div>
                  </ul>
                  <ul>
                    <p><FaMapMarkerAlt></FaMapMarkerAlt> address</p>
                    
                  </ul>
                </div>

              </li>
            </header>
        </div>
    )
}

export default Header