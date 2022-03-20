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
import { useNavigate } from "react-router-dom";
import Footer from '../components/footer';
import Header from '../components/header';
import LoggedHeader from '../components/loggedHeader';
import Card from '../components/card';

import { getCookie } from 'cookies-next';


const Search: NextPage = () => {

  const router = useRouter()
  const {query : {name},} = router
  console.log(router)
  // const SEARCH_PRODUCT = gql`
  // query SearchProduct($name:String, $category:String, $minPrice:Int, $maxPrice: Int, $store:[String], $location: [String], $shipping: [String], $rating:[Int], $shippingTime:[String], $productAdded: [Int], $order:String!){
  //   productSearch(input:{name:$name, category:$category, minPrice:$minPrice, maxPrice:$maxPrice, store:$store, location:$location, shipping:$shipping, rating:$rating, shippingTime:$shippingTime, productAdded:$productAdded}, order:$order){
  //     name
  //   }
  // }
  // `
    const { register, handleSubmit, formState:{errors} } = useForm()

  
    
    // const {loading: lo, data: da} = useQuery(SEARCH_PRODUCT, {
    //   variables: {
    //     name: name
    //   }
    // })


  

    const searchBtn = (d:any) => {
      // console.log(d.name)
      // setName(d.name)
      // var navigate = useNavigate()
      // navigate("/search/", d.name)
    }

  // if(da != null){
  //   var productList = da?.productSearch
  // }



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
   
   return getCookie('currUser') === undefined?(
    <>
    <Header></Header>
    <div className={styles.sideContainer}>
        <h2>Filter</h2>
      <div className={styles.productContainer}>
        <div className={styles.side}>
            <ul className={styles.sideList}>
              {d?.getAllCategory?.length > 0 ? (
                d?.getAllCategory?.map((cat:any) => {return(
                  <li>
                    <div className={styles.category}>{cat?.name}</div>
                  </li>

                )})
              ):  null}
            </ul>
          </div>
          <div className={styles.productCard}>
            {data?.getAllProduct?.map((data:any)=>{
              return(
                <div className={styles.cardProductContainer}>
                  <Card name={data?.name} price = {data?.price} disc={data?.discount} discount = {data?.price - (data?.discount / 100 * data?.price)} category =  {data?.category?.name} image = {data.images[0] ? data?.images[0]?.image : '/image.png'} shop = {data?.shop?.name} id={data?.id}></Card>
                </div>
              )
            })}

          </div>


      </div>
    
    </div>

    <Footer></Footer>
    </>
      
  ) : (
    <>
    <LoggedHeader></LoggedHeader>
    
    <div className={styles.sideContainer}>
        <h2>Filter</h2>
      <div className={styles.productContainer}>
        <div className={styles.side}>
            <ul className={styles.sideList}>
              {d?.getAllCategory?.length > 0 ? (
                d?.getAllCategory?.map((cat:any) => {return(
                  <li>
                    <div className={styles.category}>{cat?.name}</div>
                  </li>

                )})
              ):  null}
            </ul>
          </div>
          <div className={styles.productCard}>
            {data?.getAllProduct?.map((data:any)=>{
              return(
                <div className={styles.cardProductContainer}>
                  <Card name={data?.name} price = {data?.price} disc={data?.discount} discount = {data?.price - (data?.discount / 100 * data?.price)} category =  {data?.category?.name} image = {data.images[0] ? data?.images[0]?.image : '/image.png'} shop = {data?.shop?.name} id={data?.id}></Card>
                </div>
              )
            })}

          </div>


      </div>
    
    </div>
    <Footer></Footer>
    </>
  )
}

export default Search