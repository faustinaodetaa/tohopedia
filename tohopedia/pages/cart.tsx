import type { NextPage } from 'next';
import styles from '../styles/cart.module.scss';
import LoggedHeader from '../components/loggedHeader';
import Header from '../components/header';
import Footer from '../components/footer';
import React from 'react'
import { getCookie } from 'cookies-next';
import { FaBox, FaCog, FaComment, FaHeart, FaHome, FaMinus, FaPlus, FaShare, FaStore, FaTrash } from "react-icons/fa";
import { gql, useMutation, useQuery } from '@apollo/client';
import ProuctCard from '../components/card';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { useForm } from 'react-hook-form';


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
        id
        product{
          name
          images{
            image
          }
          shop{
            name
          }
          price
          discount
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

  const {loading: l2, error: e2, data: d2} = useQuery(GET_WISHLIST,{
    variables:{
      user: d?.getCurrentUser?.id
    }
  })

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

  if(d3){
    Router.reload()
  }

  
  const DELETE_WISHLIST = gql`
      mutation DeleteWishlist($id:ID!){
        deleteWishlist(id:$id){
          product{
            name
          }
        }
      }
    `

    const[del, {loading: l4, error: e4, data:d4}] = useMutation(DELETE_WISHLIST)
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
  
    const DELETE_CART = gql`
      mutation DeleteCart($id:ID!){
        deleteCart(id:$id){
          product{
            name
          }
        }
      }
    `
    const[removeCart, {loading: l5, error: e5, data: d5}] = useMutation(DELETE_CART)
    async function delCart(data:any) {
      try{
        await removeCart({
          variables:{
            id: data
          }
        })
      }catch(error){
        console.log(error)
      }
    }
    if(d5){
      console.log('removed from cart')
      Router.reload()
    }

    const GET_CURRENT_SHOP = gql`
    query GetCurrentShop{
      getShop{
        id,
        name,
        profile,
        nameSlug,
        slogan,
        description,
        openHour,
        closeHour,
        isOpen
      }
    }
    `
    const GET_USER_VOUCHER = gql `	
      query UserVouchers($user:String!){
        userVouchers(user:$user){
          voucher{
            name
            discount
          }
        }
      }
    `

  
    const GET_GLOBAL_VOUCHER = gql`
      query GlobalVoucher{
        globalVoucher{
          name
          description
          discount
          tnc
          startTime
          endTime
          isGlobal
        }
      }
    `
    
    const {loading: l6, error: e6, data: d6} = useQuery(GET_CURRENT_SHOP)
    const {loading: l7, error: e7, data:d7} = useQuery(GET_USER_VOUCHER,{
      variables:{
        user: d?.getCurrentUser?.id,
      }
    })
    const{loading: l8, error: e8, data:d8} = useQuery(GET_GLOBAL_VOUCHER)


    const ADD_QTY = gql`
      mutation AddQty($id:ID!){
        addQty(id:$id){
          product{
            name
          }
        }
      }
    `

    const SUBTRACT_QTY = gql`
      mutation SubtractQty($id:ID!){
        subtractQty(id:$id){
          product{
            name
          }
        }
      }
    `

    const[plusQty, {loading: l9, error: e9, data: d9}] = useMutation(ADD_QTY)
    const[minQty, {loading: l10, error: e10, data: d10}] = useMutation(SUBTRACT_QTY)
    async function addQuantity(data:any) {
      try{
        await plusQty({
          variables:{
            id: data
          }
        })
      }catch(error){
        console.log(error)
      }
    }
    async function minQuantity(data:any) {
      try{
        await minQty({
          variables:{
            id: data
          }
        })
      }catch(error){
        console.log(error)
      }
    }

    const{register, handleSubmit, formState:{errors}} = useForm()

      
  


    if(loading || l || l2 || l3 || l4 || l5 || l6 || l7 || l8){
      return(
        <div>loading</div>
      )
    }
    return(
      
      <>
      <LoggedHeader></LoggedHeader>

        <div className={styles.cartContainer}>
          <div className={styles.cartProductContainer}>
            <h2>Cart</h2>
            {data?.getCartByUser?.length > 0 ? (data?.getCartByUser?.map((data:any)=>{
              return(
                <div className={styles.productContainer}>
                  <div className={styles.productContentContainer}> 
                    <h5><FaStore></FaStore>{data?.product?.shop?.name}</h5>
                    <div className={styles.productContent}>
                      <Image src={data ? data?.product?.images[0]?.image : '/image.png'} alt="picture" className={styles.img} width={100} height={50} />
                      <div>

                        <p>{data?.product?.name}</p>
                        {/* <p>Rp.{data?.product?.price}</p> */}
                        <h4 className={styles.strike}>Rp. {data?.product?.price} </h4> 
                      {data?.product?.discount > 0 ?
                      <div>
                          <p className={styles.discount}>{data?.product?.discount}%  off!</p> 
                          <h4>Rp.{data?.product?.price - (data?.product?.discount / 100 * data?.product?.price)}</h4>
                      </div>                 
                          :
                          <p>no disc</p>

                      }
                      </div>
                      
                    </div>
                      <label htmlFor="" className={styles.notesText}>Add notes</label> <br />
                      <input type="text" name="" id="" className={styles.notes}/>
                  
                    
                    <div className={styles.qtyContainer}>
                      <button onClick={()=>minQuantity(data?.id)}>
                        <FaMinus></FaMinus>
                      </button>
                      <p>{data?.qty}</p>
                      <button onClick={()=>addQuantity(data?.id)}>
                        <FaPlus></FaPlus>
                      </button>
                      <button onClick={()=>delCart(data?.id)}>
                        <FaTrash></FaTrash>
                      </button>
                      
                    </div>
                  
                  </div>



                  
                </div>

              )
            })):
            <div>No Items in Cart</div>
            }


          <div className={styles.wishlist}>
            <h4>Your wishlist misses you</h4>
          {d2?.wishlists?.length > 0 ? (d2?.wishlists?.map((data:any)=>{
                return(
                  <Link href={`/productDetail/${data?.product?.id}`} >
                    <a>
                  <div className={styles.container}>
                    <br />
                      <Image src={data?.product?.images[0] ? data?.product?.images[0]?.image : '/image.png'} alt="picture" width={30} height={30}/>
                      <h3>{data?.product?.name}</h3>
                      
                      <h4 className={styles.strike}>Rp. {data?.product?.price} </h4> 
                      {data?.product?.discount > 0 ?
                      <div>
                          <p className={styles.discount}>{data?.product?.discount}%  off!</p> 
                          <h4>Rp.{data?.product?.price - (data?.product?.discount / 100 * data?.product?.price)}</h4>
                      </div>                 
                          :
                          <p>no disc</p>

                      }
                      <h5>Category: {data?.product?.category?.name}</h5>
                      <p> <FaStore></FaStore> {data?.product?.shop?.name}</p>
                      <button className={styles.button} onClick={()=>addToCart(data?.product?.id)}>Add to Cart</button>
                      <button onClick={()=>deleteWishlist(data?.id)}> <FaTrash></FaTrash></button>
              </div>
              </a>
              </Link>
                )
              })):
              <div>No Items in Wishlist</div>
              }

          </div>
          </div>
            <div className={styles.checkout}>
              <h3>Vouchers</h3>
              <div className={styles.input}>
                <div className={styles.voucherContainer}>
                    <label htmlFor="vouchers">User Voucher</label>
                    <br />
                    <select {...register("voucher")}>
                      {d7?.userVouchers?.length > 0 ?(
                        d7?.userVouchers?.map((cat: any) =>{return(
                          <option value={cat?.id} key={cat?.id}>{cat?.voucher?.name} - {cat?.voucher?.discount}%</option>
                        )})
                      ):
                        <option value="" key="">No Voucher Available</option>
                    }
                    
                    </select>
                    <br />
                    <label htmlFor="vouchers">Global Voucher</label>
                    <br />
                    <select {...register("voucher")}>
                      {d8?.globalVoucher?.length > 0 ?(
                        d8?.globalVoucher?.map((cat: any) =>{return(
                          <option value={cat?.id} key={cat?.id}>{cat?.name} - {cat?.discount}%</option>
                        )})
                      ):
                        <option value="" key="">No Voucher Available</option>
                    }
                    
                    </select>
                    <p className={styles.error}></p>
                </div>
                </div>
                <h5>Shopping Summary</h5>
                {data?.getCartByUser?.length > 0 ? (data?.getCartByUser?.map((data:any)=>{return(
                      <div>
                        <h3>Total Discount Price</h3>
                        
                        <p>IDR {data?.product?.discount / 100 * data?.product?.price}</p>
                        <h3>Subtotal</h3>
                        <p {...register("total")}>IDR {(data?.product?.price - (data?.product?.discount / 100 * data?.product?.price)) * (data?.qty)} </p>
                        <input type="hidden" {...register("total")} value={(data?.product?.price - (data?.product?.discount / 100 * data?.product?.price)) * (data?.qty)} />
                      </div>

                    )
                    })) : null}   
              <button className={styles.button}>
                <a href="/checkout">Buy</a>
              </button>
            </div>
              {/* <div className={styles.promo}>
                <h4>Save more with promos</h4>
                {d7?.allVoucher?.length > 0 ? (d7?.allVoucher?.map((data:any)=>{
                  return(
                    <div className={styles.promoContent}>
                      <p>{data?.name}</p>
                    </div>
                  )
                })):
                <div>No voucher available</div>
                }
              </div> */}

            </div>
   
      <Footer></Footer>
      </>
    )
    
}

export default Cart