import type { NextPage } from 'next';
import styles from '../../styles/productDetail.module.scss';
import LoggedHeader from '../../components/loggedHeader';
import Header from '../../components/header';
import Footer from '../../components/footer';
import React, { useState } from 'react'
import { getCookie } from 'cookies-next';
import { FaBox, FaCog, FaComment, FaHeart, FaHome, FaMapMarkerAlt, FaMinus, FaPlus, FaShare, FaStore, FaTruck } from "react-icons/fa";
import { gql, useMutation, useQuery } from '@apollo/client';
import ProuctCard from '../../components/card';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Router from "next/router";

import { useForm } from 'react-hook-form';


const ProductDetail: NextPage = () => {

  const router = useRouter()
  const {query : {id},} = router
  const productId = router.asPath.split('/')[2]
  // console.log(router.asPath.split('/')[2])
  const [qty, setQty] = useState(1)

  const GET_USER = gql`query GetCurrUser{
    getCurrentUser{
      id,
      name
    }
  }`

// console.log(da?.getCurrentUser?.id)

  const ADD_CART = gql`
    mutation CreateCart($product:String!, $qty: Int!, $user:String!){
    createCart(input:{product:$product, qty: $qty, user: $user}){
      id
    }
  }
  `


  const {loading: loa, error: er, data: da} = useQuery(GET_USER)
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
          id
          user{
            id
          }
          name
          profile
          address
        }
        soldCount
      }
    }
  `

    const {loading: load, error: err, data: dat} = useQuery(GET_PRODUCT_BY_ID,{
      variables: {
        id: productId
      }
    })
    // console.log(dat?.product?.name)

    const GET_ALL_REVIEW = gql`
      query ReviewByProduct($product:String!){
        review(productID:$product){
          id
          description
        }
      }
    `

    const {loading:l2, error:e2, data:d2} = useQuery(GET_ALL_REVIEW,{
      variables:{
        product: productId
      }
    })

    const GET_COURIERS = gql`
      query Couriers{
        couriers{
          name
          price
          estimatedTime
        }
      }
    `

    const {loading:l3, error:e3, data:d3} = useQuery(GET_COURIERS)
    console.log(d3?.couriers[0]?.name)

    const DELETE_PRODUCT_IMAGE = gql`
      mutation DeleteProductImage($id:ID!){
        deleteImage(id:$id){
          id
        }
      }
    `
    const DELETE_PRODUCT = gql`
      mutation DeleteProduct($id:ID!){
        deleteProduct(id:$id){
          name
        }
      }
    `

    const [delImage, {loading: l4, error: e4, data:d4}] = useMutation(DELETE_PRODUCT_IMAGE)
    const [delProduct, {loading: l5, error: e5, data:d5}] = useMutation(DELETE_PRODUCT) 

    const ADD_WISHLIST = gql`
    mutation CreateWishlist($product:String!, $user:String!){
      createWishlist(input:{product:$product, user:$user}){
        id
      }
    }
  `
    const[createWishlist, {loading: l6, error: e6, data: d6}] = useMutation(ADD_WISHLIST)
  async function addWishlist() {
    try{
      await createWishlist({
        variables:{
          product: productId,
          user: da?.getCurrentUser?.id
        }
      })
    }catch(error){
      console.log(error)
    }
  }

  if(d6){
    console.log("added to wishlist")
  }


    async function deleteProduct(data:any) {
      try{
        await delImage({
          variables:{
            id:data
          }
        })
      }catch(error){
        console.log(error)
      }
    }
    
    if(d4){
      delProduct({variables:{id:productId}})
      console.log('product deleted')
    }


  const GET_VOUCHER = gql `
    query Vouchers($shop:String!){
      vouchers(shop:$shop){
        id
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
  const{loading:l7, error:e7, data:d7} = useQuery(GET_VOUCHER,{
    variables: {
    shop: dat?.product?.shop?.id

  }
  })
  console.log(d7?.vouchers[0]?.name)

    if(load || l || l2 ||loa || l3 || l4 || l5 || l6 || l7){
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
          {dat?.product?.images?.length > 0 ? (
            dat?.product?.images?.map((p: any)=>{return(
              <Image src={p?.image} className={styles.img} alt="profile" width={200} height={200}/>

            )})
          ):
          <div></div>
          }

        </div>
        <div className={styles.productDetail}>
          <h1>{dat?.product?.name}</h1>
          <p>Terjual {dat?.product?.soldCount}</p>
          <h3>Rp. {dat?.product?.price}</h3>
          <p>Description: <br></br> {dat?.product?.description}</p>
          <p>Category: {dat?.product?.category.name}</p>
          <h5>{}</h5>
          <hr />

          <Image src={dat?.product?.shop.profile} className={styles.img} width={50} height={50}/>

          <span><FaStore></FaStore>
          <a href={`/shopDetail/${dat?.product?.shop?.id}`} key={dat?.product?.shop?.id}>{dat?.product?.shop.name}</a>
          
            
          
          </span>
          <p>Pengiriman</p>
          <p><FaMapMarkerAlt></FaMapMarkerAlt>Dikirim dari {dat?.product?.shop?.address} </p>
          <p><FaTruck></FaTruck> Ongkir {d3?.couriers[0]?.name} {d3?.couriers[0]?.price}rb</p>
          <div className={styles.dropdownTitle}>
            <p className={styles.dropdownTitle}>Lihat lainnya</p>
            <div className={styles.dropdownContent}>
              {d3?.couriers?.length > 0 ? (d3?.couriers?.map((data:any)=>{
                return(
                  <div >
                    <span >{data?.name}</span>
                    <span> {data?.price}rb</span>
                    <span> {data?.estimatedTime} hari</span>
                    <button className={styles.button}>Pilih</button>
                  </div>
                )
              })):
              <div>
                Tidak ada pilihan lain
              </div>
              }
            </div>


          </div>
          <p>Estimasi tiba {d3?.couriers[0]?.estimatedTime} hari</p>
          <hr />
          <h2>Voucher Toko</h2>
          {d7?.vouchers?.length > 0 ?(
            d7?.vouchers?.map((data:any)=>{
              return(
                <div className={styles.voucherContainer}>
                  <p>{data?.name}</p>
                  <p>{data?.description}</p>
                  <p>Discount: {data?.discount}%</p>
                  <button className={styles.button}>
                    <a href={`/redeemVoucher/${data?.id}`} key={data?.id}>
                      Redeem Voucher
                    </a>
                  </button>
                </div>
              )
            })
          ) : <p>No Vouchers Available</p>}
          <hr />
          <h2>Ulasan</h2>
          <hr />
          <h2>Diskusi</h2>
          <hr />
          {da?.getCurrentUser?.id == dat?.product?.shop?.user?.id ? 
          <div>
            <button className={styles.button}>
              <a href={`/editProduct/${productId}`}>
                Update Produk
              </a>
            </button>
            <button className={styles.button} onClick={()=>deleteProduct(productId)}>Hapus Produk</button>
          </div> 
          : 
          <div></div>}
        </div>
        <div className={styles.cartDetail}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="number" {...register("qty")} id="qty" placeholder='1'/>
 
          <p>Stock: {dat?.product?.stock}</p>
          <input type="text" name="note" id="note" className={styles.notes} placeholder="note"/>
          <h4>Subtotal Rp {dat?.product?.price}</h4>
          <button className={styles.button} type='submit'> <FaPlus></FaPlus>Keranjang</button>


          </form>
          <br />
          <button className={styles.buttonSecondary}>
            <a href="/checkout">
              Beli Langsung

            </a>
          </button>
          <div className={styles.icon}>
            <p className={styles.icons}>
              <a href="/chat">
                <FaComment></FaComment> Chat
              </a>
            </p>
            <p className={styles.icons}>
              <button onClick={()=>addWishlist()}>
                <FaHeart></FaHeart> Wishlist 
              </button>
            </p>
            <p className={styles.icons}>
              <button  onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                  }}>

              <FaShare></FaShare> Share

                  </button>
            </p>
          </div>

        </div>
        </div>
        <div>

        </div>
      <Footer></Footer>
      </>
    )
    
}

export default ProductDetail