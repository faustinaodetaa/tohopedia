import type { NextPage } from 'next';
import styles from '../../styles/productDetail.module.scss';
import LoggedHeader from '../../components/loggedHeader';
import Header from '../../components/header';
import Footer from '../../components/footer';
import React from 'react'
import { getCookie } from 'cookies-next';
import { FaBox, FaCog, FaComment, FaHeart, FaHome, FaPlus, FaShare, FaStore } from "react-icons/fa";
import { gql, useMutation, useQuery } from '@apollo/client';
import ProuctCard from '../../components/card';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';


const ProductDetail: NextPage = () => {

  const router = useRouter()
  const {query : {id},} = router
  const productId = router.asPath.split('/')[2]
  // console.log(router.asPath.split('/')[2])
  const GET_USER = gql`query GetCurrUser{
    getCurrentUser{
      id,
      name
    }
  }`

const {loading: loa, error: er, data: da} = useQuery(GET_USER)
// console.log(da?.getCurrentUser?.id)

  const ADD_CART = gql`
    mutation CreateCart($product:String!, $qty: Int!, $user:String!){
    createCart(input:{product:$product, qty: $qty, user: $user}){
      id
    }
  }
  `
  const [createCart,{loading: l, error: e, data: d}] = useMutation(ADD_CART)

  const{register, handleSubmit, formState:{errors}} = useForm()
  async function onSubmit(data:any){
    try {
      await createCart({
        variables:{
          qty:data.qty,
          user:da?.getCurrentUser?.id,
          product: productId
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  if(d){
    console.log("added to cart")
  }

  const GET_PRODUCT_BY_ID = gql `
    
    query GetProductById($id:ID!){
      product(id:$id){
        name
        images{
          image
        }
        description
        price
        discount
        stock
        metadata
        category{
          name
        }
        shop{
          name
        }
      }
    }
  `





    const {loading: load, error: err, data: dat} = useQuery(GET_PRODUCT_BY_ID,{
      variables: {
        id: productId
      }
    })
    // console.log(dat?.product?.name)

    if(load){
      return(
        <div>loading</div>
      )
    }
    return getCookie('currUser') === undefined?(
      <>
      <Header></Header>
      <div className={styles.productContainer}>
        <div className={styles.imageContainer}>
          <Image src={dat?.product?.images ? dat?.product?.images[0]?.image : '/image.png'} className={styles.img} alt="profile" width={200} height={200}/>
        </div>
        <div className={styles.productDetail}>
          <h1>{dat?.product?.name}</h1>
          <h3>Rp. {dat?.product?.price}</h3>
          <p>Description: <br></br> {dat?.product?.description}</p>
          <p>Category: {dat?.product?.category.name}</p>
          <h5><FaStore></FaStore> {dat?.product?.shop.name}</h5>
        </div>
        <div className={styles.cartDetail}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="number" {...register("qty")} id="qty" placeholder='1'/>
          <p>Stock: {dat?.product?.stock}</p>
          <h4>Subtotal Rp {dat?.product?.price * 2}</h4>
          {/* <button className={styles.button} type='submit'> <FaPlus></FaPlus>Keranjang</button> */}
          <a href="/login" className={styles.button}><FaPlus></FaPlus>Keranjang</a>


          </form>
          <br />
          <button className={styles.buttonSecondary}>Beli Langsung</button>
          <div className={styles.icon}>
            <p className={styles.icons}>
              <FaComment></FaComment> Chat
            </p>
            <p className={styles.icons}>
              <FaHeart></FaHeart> Wishlist 
            </p>
            <p className={styles.icons}>
              <FaShare></FaShare> Share
            </p>
          </div>

        </div>
        </div>
      <Footer></Footer>
      </>
        
    ) : (
      <>
      <LoggedHeader></LoggedHeader>
      <div className={styles.productContainer}>
        <div className={styles.imageContainer}>
          <Image src={dat?.product?.images ? dat?.product?.images[0]?.image : '/image.png'} className={styles.img} alt="profile" width={200} height={200}/>
        </div>
        <div className={styles.productDetail}>
          <h1>{dat?.product?.name}</h1>
          <h3>Rp. {dat?.product?.price}</h3>
          <p>Description: <br></br> {dat?.product?.description}</p>
          <p>Category: {dat?.product?.category.name}</p>
          <h5><FaStore></FaStore> {dat?.product?.shop.name}</h5>
        </div>
        <div className={styles.cartDetail}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="number" {...register("qty")} id="qty" placeholder='1'/>
          <p>Stock: {dat?.product?.stock}</p>
          <h4>Subtotal Rp {dat?.product?.price}</h4>
          <button className={styles.button} type='submit'> <FaPlus></FaPlus>Keranjang</button>


          </form>
          <br />
          <button className={styles.buttonSecondary}>Beli Langsung</button>
          <div className={styles.icon}>
            <p className={styles.icons}>
              <FaComment></FaComment> Chat
            </p>
            <p className={styles.icons}>
              <FaHeart></FaHeart> Wishlist 
            </p>
            <p className={styles.icons}>
              <FaShare></FaShare> Share
            </p>
          </div>

        </div>
        </div>
      <Footer></Footer>
      </>
    )
    
}

export default ProductDetail