import type { NextPage } from 'next';
import styles from '../styles/header.module.scss';
import Image from 'next/image';
import { gql, useQuery } from '@apollo/client';
import { FaBell, FaEnvelope, FaMapMarkerAlt, FaSearch, FaShoppingCart } from "react-icons/fa";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';


const Header: NextPage = () => {

  const router = useRouter()
  const { pid } = router.query

  const [word, setWord] = useState('')

  const SEARCH_PRODUCT = gql`query ProductByName($name:String!){
    productSearch(name:$name){
      name
      description
    }
  }`
    const { register, handleSubmit, formState:{errors} } = useForm()

  
    
    const {loading: lo, data: da} = useQuery(SEARCH_PRODUCT, {
      variables: {
        name: word
      }
    })
    const searchBtn = (d:any) => {
      // console.log(d.name)
      setWord(d.name)
    }

  if(da != null){
    var productList = da?.productSearch
  }



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
  //  console.log(data)

   const GET_CART_BY_USER = gql`
    query GetCartByUser($user:String!){
    getCartByUser(user:$user){
      product{
        name
        images{
          image
        }
        price
      }
      qty
    }
  }
   `

const{loading: load, error: err2, data: d2} = useQuery(GET_CART_BY_USER,{
  variables:{
    user: d?.getCurrentUser?.id
  }
})
console.log(d?.getCurrentUser?.id)
console.log(d2?.getCartByUser[0]?.qty)

   if(loading || l || load){
     return(
       <div>loading</div>
     )
   }
   
   return(
     <div className={styles.container}>
            <header>
              <li className={styles.list}>
                <div className={styles.leftNav}>
                  <ul>
                    <a href="/home">
                      <Image src="/tohopedia_logo.png" alt="" width={200} height={50}/>

                    </a>
                  </ul>
                  <ul>
                    <p className={styles.category}>Category</p>
                  </ul>
                  <ul className={styles.searchContainer}>
                    <div className={styles.searchFormContainer}>

                      <form onSubmit={handleSubmit(searchBtn)}>

                        <div className={styles.input}>

                        <input type="text" id="name" className={styles.searchBar} placeholder=' Cari Baju' {...register("name")}/>
                        <button className={styles.button} type="submit"><FaSearch></FaSearch></button>
                        </div>
                        
                        
                      </form>

                    </div>
                  </ul>
                  
                </div>
                  {/* <h2></h2> */}
                  <div className={styles.icons}>
                    
                    <div className={styles.dropdownTitle}>
                      <h2 >
                        <a href="/cart">
                          
                        <FaShoppingCart></FaShoppingCart>
                        </a>
                        </h2>
                      {d2?.getCartByUser?.length > 0 ? (d2?.getCartByUser?.map((data:any)=>{
                        return(
                          <div className={styles.dropdownContentContainer}>
                            <Image src={data?.product?.images[0]?.image} alt="picture" className={styles.profilepic} width={30} height={30}/>
                            <ul>{data?.qty}  Barang</ul>
                            <ul>{data?.product?.name}</ul>
                            <ul>Rp. {data?.product?.price}</ul>
                          </div>
                        )
                      })): 
                      <div className={styles.dropdownContentContainer}>No Items in Cart</div>
                      }
                    </div>
                    <div className={styles.dropdownTitle}>
                      <h2><FaBell></FaBell></h2>  
                      <div className={styles.dropdownContentContainer}>
                        No Notifications Yet!
                      </div>
                    </div>
                    <div className={styles.dropdownTitle}>
                      <h2><FaEnvelope></FaEnvelope></h2>
                      <div className={styles.dropdownContentContainer}>
                        No Messages Yet!
                      </div>
                    </div>
                  </div>
                <div className={styles.profileMenu}>

                <div >
                  <ul>
                  <p>
                    {data?
                        <div className={styles.profile}>
                          <div className={styles.dropdownTitle}>
                            <Image src={data.getShop?.profile ? data?.getShop?.profile : '/image.png'} className={styles.img} alt="profile" width={50} height={50}/>
                            <a href="../shop">
                            {data?.getShop?.name}
                            </a>
                            <div className={styles.dropdownProfile}>
                              <a href="/shop">Enter Seller Site</a>
                            </div>
                            
                          </div>
                      </div>   : <button className={styles.login}><a href="/addShop">Open Shop</a></button>}
                  </p>
                  </ul>
                </div>
                <div>
                  <ul>
                    <div className={styles.profile}>
                      <div className={styles.dropdownTitle}>
                        <Image src={d.getCurrentUser?.picture ? d?.getCurrentUser?.picture : '/image.png'} className={styles.img} alt="profile" width={50} height={50}/>
                        <a href='/editProfile'>{d?.getCurrentUser?.name}</a>  
                        <div className={styles.dropdownProfile}>
                          <a href="/editProfile">Edit Profile</a>  
                          <br />
                          <a href="/login">Logout</a>
                        </div>
                      </div>
                    </div>
                  </ul>
                  <ul>
                    <p><FaMapMarkerAlt></FaMapMarkerAlt> Alam Sutera</p>
                    
                  </ul>
                </div>
                </div>

              </li>
            </header>
        </div>
    )
}

export default Header