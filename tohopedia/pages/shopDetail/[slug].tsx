import type { NextPage } from 'next';
import styles from '../../styles/shop.module.scss';
import LoggedHeader from '../../components/loggedHeader';
import Header from '../../components/header';
import Footer from '../../components/footer';
import React, { useState } from 'react'
import { getCookie } from 'cookies-next';
import { FaAward, FaBox, FaCog, FaComment, FaHeart, FaHome, FaIdBadge, FaMapMarkerAlt, FaMinus, FaPlus, FaShare, FaStar, FaStore, FaTruck } from "react-icons/fa";
import { gql, useMutation, useQuery } from '@apollo/client';
import ProuctCard from '../../components/card';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Router from "next/router";

import { useForm } from 'react-hook-form';
import Card from '../../components/card';
import ImageSlider from '../../components/slider';
import { SliderData } from '../../components/sliderData';


const ShopDetail: NextPage = () => {

  const router = useRouter()
  const {query : {id},} = router
  const shopId = router.asPath.split('/')[2]
  console.log(router.asPath.split('/')[2])
  const [qty, setQty] = useState(1)
  const GET_USER = gql`query GetCurrUser{
    getCurrentUser{
      id,
      name
    }
  }`

  const {loading: loa, error: er, data: da} = useQuery(GET_USER)
// console.log(da?.getCurrentUser?.id)

  const GET_CURRENT_SHOP = gql`
      query ShopById($id: ID!){
      shopById(id:$id){
        name,
        address,
        phone,
        slogan,
        description,
        profile,
        openHour,
        closeHour,
        isOpen,
        points
      }
    }
  `
  const {loading: l, error: e, data: d} = useQuery(GET_CURRENT_SHOP, {
    variables: {
      id: shopId
    }
  })
  
  

  const GET_ALL_PRODUCT = gql `
  query GetProductByShop($shop:String!){
    getProductByShop(shopID:$shop){
      id
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
        profile
      }
    }
  }
`

    const {loading: load, error: err, data: dat} = useQuery(GET_ALL_PRODUCT,{
      variables: {
        shop: shopId
      }
    })
  
  const BEST_SELLING_PRODUCT = gql`
    query BestSellingProduct($shopID:String!){
      bestSellingProduct(shopID:$shopID){
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
        soldCount
      }
    }
  `

  const {loading: l2, error: e2, data: d2} = useQuery(BEST_SELLING_PRODUCT,{
    variables:{
      shopID: shopId
    }
  })


   

    if(load || l || loa || l2){
      return(
        <div>loading</div>
      )
    }

  


    return getCookie('currUser') === undefined?(
      <>
      <Header></Header>
      <div className={styles.shopContent}>
        <h1>Shop Information</h1>
        <h3>Shop Name: {d?.shopById?.name}</h3>
        {/* <p>{d?.getShop?.nameSlug}</p> */}
        <b>Slogan: {d?.shopById?.slogan}</b>
        <p>Description: {d?.shopById?.description}</p>
        <i>{d?.shopById?.isOpen === true ? <i>Shop is Currently Open</i> : <i>Shop is Currently Close</i>}</i>
        <br /> <br /> <br />
        {dat?.getProductByShop?.map((data:any)=>{
          return(
            <div>

              <Card id={data?.id} name={data?.name} price = {data?.price} discount = {data?.price - (data?.discount / 100 * data?.price)} disc = {data?.discount} category =  {data?.category?.name} image = {data.images[0] ? data?.images[0]?.image : '/image.png'} shop = {data?.shop?.name}>
              </Card>

            </div>



              )
            })}
          </div>
      <Footer></Footer>
      </>
        
    ) : (
      <>
      <LoggedHeader></LoggedHeader>
      <div className={styles.shopContent}>
        <br />
        <div className={styles.shopBanner}>
          <div>
            <Image src={d?.shopById?.profile} className={styles.img} width={50} height={50}/>
            <h3>Shop Name: {d?.shopById?.name}</h3>
            <div className={styles.titleHover}>
            <div className={styles.contentHover}>
            <p className={styles.contentHover}>{d?.shopById?.points} points</p>

            </div>
            <span className={styles.titleHover}>{d?.shopById?.points >= 1 && d?.shopById?.points <= 50 ? <p><FaAward></FaAward>Bronze</p> :  d?.shopById?.points >= 51 && d?.shopById?.points <= 100 ? <p><FaAward></FaAward>Silver</p> : d?.shopById?.points >= 101 && d?.shopById?.points <= 150 ? <p><FaAward></FaAward>Gold</p> : <p><FaAward></FaAward>Diamond</p>}</span>

            </div>
            <p><FaMapMarkerAlt></FaMapMarkerAlt>{d?.shopById?.address}</p>
            <i>{d?.shopById?.isOpen === true ? <i>Shop is Currently Open</i> : <i>Shop is Currently Close</i>}</i>
            <br />
            <button className={styles.button}>Follow</button>
            <button className={styles.button}>Chat Seller</button>
            <br />

          </div>
          <div>
            <p>Product Quality</p>
            <p>5.0<FaStar></FaStar><FaStar></FaStar><FaStar></FaStar><FaStar></FaStar><FaStar></FaStar></p>
          </div>
        
        </div>
            
            <br /> <br /> <br />
        <ImageSlider slides={SliderData}></ImageSlider>
        <div className={styles.video}>
          
        <video src="/video.mp4" autoPlay loop className={styles.video}></video>
        </div>
          <div className={styles.productContainerContent}>
                      <h1>Top Best-Selling Product</h1>
                      {d2?.bestSellingProduct?.map((d2:any)=>{
                        return(
                          <div className={styles.cardProductContainer}>
                            <Card name={d2?.name} price = {d2?.price} discount = {d2?.price - (d2?.discount / 100 * d2?.price)} disc = {d2?.discount} category =  {d2?.category?.name} image = {d2?.images[0] ? d2?.images[0]?.image : '/image.png'} shop = {d2?.shop?.name} id={d2?.id}></Card>

                          </div>
                        )
                      })}

          </div>

          <div className={styles.productContainerContent}>
            <h1>All Products</h1>
            {dat?.getProductByShop?.map((data:any)=>{
              return(
                <div>

                  

                  <Card id={data?.id} name={data?.name} price = {data?.price} discount = {data?.price - (data?.discount / 100 * data?.price)} disc = {data?.discount} category =  {data?.category?.name} image = {data.images[0] ? data?.images[0]?.image : '/image.png'} shop = {data?.shop?.name}>
                  </Card>
                

                </div>

              )
            })}


          </div>

          </div>
      <Footer></Footer>
      </>
    )
    
}

export default ShopDetail