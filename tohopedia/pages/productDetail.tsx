import type { NextPage } from 'next';
import styles from '../styles/productDetail.module.scss';
import LoggedHeader from '../components/loggedHeader';
import Header from '../components/header';
import Footer from '../components/footer';
import React from 'react'
import { getCookie } from 'cookies-next';
import { FaBox, FaCog, FaComment, FaHeart, FaHome, FaPlus, FaShare, FaStore } from "react-icons/fa";
import { gql, useQuery } from '@apollo/client';
import ProuctCard from '../components/card';
import Image from 'next/image';


const ProductDetail: NextPage = () => {
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
  const GET_ALL_PRODUCT = gql `
    query GetAllProduct{
      getAllProduct{
        name
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
        images{
          id
          image
        }
      }
    }
  `
  
    const {loading: l, error: e, data: d} = useQuery(GET_CURRENT_SHOP)
    const {loading: load, error: err, data: dat} = useQuery(GET_ALL_PRODUCT)
    console.log(dat?.getAllProduct[0].images)

    if(load || l ){
      return(
        <div>loading</div>
      )
    }
    return getCookie('currUser') === undefined?(
      <>
      <Header></Header>
      <Footer></Footer>
      </>
        
    ) : (
      <>
      <LoggedHeader></LoggedHeader>
      <div className={styles.productContainer}>
        <div className={styles.imageContainer}>
          <Image src={dat?.getAllProduct[0]?.images[0] ? dat?.getAllProduct[0]?.images[0]?.image : '/image.png'} className={styles.img} alt="profile" width={200} height={200}/>
        </div>
        <div className={styles.productDetail}>
          <h1>{dat?.getAllProduct[0]?.name}</h1>
          <h3>Rp. {dat?.getAllProduct[0]?.price}</h3>
          <p>Description: <br></br> {dat?.getAllProduct[0]?.description}</p>
          <p>Category: {dat?.getAllProduct[0]?.category.name}</p>
          <h5><FaStore></FaStore> {dat?.getAllProduct[0]?.shop.name}</h5>
        </div>
        <div className={styles.cartDetail}>
          <input type="number" name="qty" id="qty" placeholder='1'/>
          <p>Stock: {dat?.getAllProduct[0]?.stock}</p>
          <h4>Subtotal Rp</h4>
          <button className={styles.button}> <FaPlus></FaPlus>Keranjang</button>
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