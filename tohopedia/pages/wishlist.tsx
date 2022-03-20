import type { NextPage } from 'next';
import styles from '../styles/wishlist.module.scss';
import LoggedHeader from '../components/loggedHeader';
import Header from '../components/header';
import Footer from '../components/footer';
import React from 'react'
import { getCookie } from 'cookies-next';
import { FaBox, FaCog, FaComment, FaHome, FaStore, FaTicketAlt } from "react-icons/fa";
import { gql, useMutation, useQuery } from '@apollo/client';
import ProuctCard from '../components/card';
import Image from 'next/image';
import Card from '../components/card';
import Link from 'next/link';


const Wishlist: NextPage = () => {

  const GET_USER = gql`query GetCurrUser{
    getCurrentUser{
      id,
      name,
      picture
    }
  }`
  
  
  const GET_WISHLIST = gql`
    query Wishlists($user:String!){
      wishlists(user:$user){
        id
        product{
          id
          name
          images{
            image
          }
          description
          price
          discount
          stock
          category{
            name
          }
          shop{
            name
          }
        }
        
      }
    }
  `

  const DELETE_WISHLIST = gql`
      mutation DeleteWishlist($id:ID!){
        deleteWishlist(id:$id){
          product{
            name
          }
        }
      }
    `

  const ADD_CART = gql`
    mutation CreateCart($product:String!, $qty: Int!, $user:String!){
    createCart(input:{product:$product, qty: $qty, user: $user}){
      id
    }
    }
  `

  const [createCart,{loading: l3, error: e3, data: d3}] = useMutation(ADD_CART)
  async function addToCart(data:any){
    try {
      await createCart({
        variables:{
          qty:1,
          user:d?.getCurrentUser?.id,
          product: data
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const {loading: l, error: e, data: d} = useQuery(GET_USER)
  const{loading, error, data} = useQuery(GET_WISHLIST,{
    variables:{
      user: d?.getCurrentUser?.id
    }
  })
  
  const[del, {loading: l2, error: e2, data:d2}] = useMutation(DELETE_WISHLIST)
  async function deleteWishlist(data:any) {
    try{
      await del({
        variables:{
          id: data
        }
      })
    }catch(error){
      console.log(error)
    }
  }
  
  if(loading || l || l2){
    return(
      <div>loading</div>
      )
    }
    console.log(data?.wishlists[0]?.product?.id)
    return(
      
      <>
      <LoggedHeader></LoggedHeader>
          <div className={styles.cartContainer}>
            <div className={styles.cartProductContainer}>
              <h2>Wishlist</h2>
              {data?.wishlists?.length > 0 ? (data?.wishlists?.map((data:any)=>{
                return(
                  <Link href={`/productDetail/${data?.product?.id}`} >
                    <a>
                  <div className={styles.container}>
                  <div className={styles.productContainer}>
                      <Image src={data?.product?.images[0] ? data?.product?.images[0]?.image : '/image.png'} alt="picture" width={30} height={30}/>
                      <h3>{data?.product?.name}</h3>
                      
                      <h4 className={styles.strike}>Rp. {data?.product?.price} </h4> 
                      {data?.product?.discount > 0 ?
                      <div>
                          <p className={styles.discount}>{data?.product?.discount}%  off!</p> 
                          <h4>Rp.{data?.product?.discount}</h4>
                      </div>                 
                          :
                          <p>no disc</p>

                      }
                      <h5>Category: {data?.product?.category?.name}</h5>
                      <p> <FaStore></FaStore> {data?.product?.shop?.name}</p>
                      <button className={styles.button} onClick={()=>addToCart(data?.product?.id)}>Buy</button>

                      <button className={styles.button} onClick={()=>deleteWishlist(data?.id)}>Delete Wishlist</button>
                  </div>
              </div>
              </a>
              </Link>
                )
              })):
              <div>No Items in Wishlist</div>
              }


            </div>
            
            </div>
          
   
      <Footer></Footer>
      </>
    )
    
}

export default Wishlist