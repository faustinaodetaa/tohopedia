import type { NextPage } from 'next';
import styles from '../styles/cart.module.scss';
import LoggedHeader from '../components/loggedHeader';
import Header from '../components/header';
import Footer from '../components/footer';
import React from 'react'
import { getCookie } from 'cookies-next';
import { FaBox, FaCog, FaComment, FaHeart, FaHome, FaMinus, FaPlus, FaShare, FaStore, FaTrash } from "react-icons/fa";
import { gql, useQuery } from '@apollo/client';
import ProuctCard from '../components/card';
import Image from 'next/image';


const Cart: NextPage = () => {

  const GET_USER = gql`query GetCurrUser{
    getCurrentUser{
      id,
      name,
      picture
    }
  }`
  
  const {loading: l, error: e, data: d} = useQuery(GET_USER)

  const GET_CART_BY_USER = gql`
    query GetCartByUser($user:String!){
      getCartByUser(user:$user){
        product{
          name
          images{
            image
          }
          shop{
            name
          }
          price
        }
        qty
      }
      }
  `
  const {loading, error, data} = useQuery(GET_CART_BY_USER,{
    variables:{
      user: d?.getCurrentUser?.id

    }
  })
  

    if(loading || l){
      return(
        <div>loading</div>
      )
    }
    return(
      
      <>
      <LoggedHeader></LoggedHeader>

        <div className={styles.cartContainer}>
          <h2>Cart</h2>
          {data?.getCartByUser?.length > 0 ? (data?.getCartByUser?.map((data:any)=>{
            return(
              <div className={styles.productContainer}>
                <h5>{data?.product?.shop?.name}</h5>
                <div className={styles.productContent}>
                  <Image src={data ? data?.product?.images[0]?.image : '/image.png'} alt="picture" className={styles.img} width={100} height={50} />
                  <div>

                    <p>{data?.product?.name}</p>
                    <p>{data?.product?.price}</p>
                  </div>
                  
                </div>
                  <label htmlFor="" className={styles.notesText}>Add notes</label> <br />
                  <input type="text" name="" id="" className={styles.notes}/>
               
                
                <FaTrash></FaTrash>
                <div className={styles.qtyContainer}>
                  <FaMinus></FaMinus>
                  <p>{data?.qty}</p>
                  <FaPlus></FaPlus>
                  
                </div>


              </div>

            )
          })):
          <div>No Items in Cart</div>
          }

        </div>
   
      <Footer></Footer>
      </>
    )
    
}

export default Cart