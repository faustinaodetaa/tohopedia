import type { NextPage } from 'next';
import styles from '../styles/shop.module.scss';
import LoggedHeader from '../components/loggedHeader';
import Header from '../components/header';
import Footer from '../components/footer';
import React from 'react'
import { getCookie } from 'cookies-next';
import { FaBox, FaCog, FaComment, FaHome, FaTicketAlt } from "react-icons/fa";
import { gql, useQuery } from '@apollo/client';
import ProuctCard from '../components/card';
import Image from 'next/image';
import Card from '../components/card';
import Link from 'next/link';


const Shop: NextPage = () => {
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
        }
      }
    }
  `
  
    const {loading: l, error: e, data: d} = useQuery(GET_CURRENT_SHOP)
    const {loading: load, error: err, data: dat} = useQuery(GET_ALL_PRODUCT,{
      variables:{
        shop: d?.getShop?.id
      }
    })
    console.log(dat)

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
      <div className={styles.shopContainer}>

        <div className={styles.sideContainer}>
          <h2>Tohopedia Seller</h2>
          <div className={styles.side}>
            <p className={styles.shopName}>{d?.getShop?.name}</p>
              <ul className={styles.sideList}>
                <li>
                  <a href="../shop">
                  <FaHome></FaHome> Home
                  </a>
                </li>
                <li>
                  <FaComment></FaComment> 
                  <a href="/chat"> Chat</a>
                </li>
                <li>
                  <FaTicketAlt></FaTicketAlt>
                  <a href="/voucher"> Voucher Management</a>
                </li>
                <li className={styles.product}>
                  <FaBox></FaBox> Product
                  <div className={styles.dropdownProduct}>
                    <a href='../addProduct'> Tambah Produk</a>
                  </div>                 
                </li>
                <li className={styles.setting}>
                  <FaCog></FaCog> Pengaturan
                  <li className={styles.dropdownShop}>
                    <a href='../editShop'> Edit Toko</a>
                  </li>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.shopContent}>
            <h1>Shop Information</h1>
            <h3>Shop Name: {d?.getShop?.name}</h3>
            {/* <p>{d?.getShop?.nameSlug}</p> */}
            <b>Slogan: {d?.getShop?.slogan}</b>
            <p>Description: {d?.getShop?.description}</p>
            <i>{d?.getShop?.isOpen === true ? <i>Shop is Currently Open</i> : <i>Shop is Currently Close</i>}</i>
            <br /> <br /> <br />
            {dat?.getProductByShop?.map((data:any)=>{
              return(
                <div>

                  <Card id={data?.id} name={data?.name} price = {data?.price} discount = {data?.price - (data?.discount / 100 * data?.price)} disc = {data?.discount} category =  {data?.category?.name} image = {data.images[0] ? data?.images[0]?.image : '/image.png'} shop = {data?.shop?.name}>
                  </Card>
                  {/* <button className={styles.button}>Update</button>
                  <button className={styles.button}>Delete</button> */}


                </div>



                // <div className={styles.cardProduct}>

                //   <Image src={data.images[0] ? data?.images[0]?.image : '/image.png'} className={styles.img} alt="profile" width={50} height={100}/>
                //   <h3>{data?.name}</h3>
                //   <h5>Rp. {data?.price}</h5>
                //   <p>Category: {data?.category?.name}</p> 
                // </div>
              )
            })}
          </div>
        </div>
      <Footer></Footer>
      </>
    )
    
}

export default Shop