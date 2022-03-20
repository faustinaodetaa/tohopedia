import type { NextPage } from 'next';
import styles from '../styles/voucher.module.scss';
import LoggedHeader from '../components/loggedHeader';
import Header from '../components/header';
import Footer from '../components/footer';
import React from 'react'
import { getCookie } from 'cookies-next';
import { FaBox, FaCog, FaComment, FaHome, FaTicketAlt } from "react-icons/fa";
import { gql, useMutation, useQuery } from '@apollo/client';
import ProuctCard from '../components/card';
import Image from 'next/image';
import Card from '../components/card';
import Link from 'next/link';


const Voucher: NextPage = () => {
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
  const GET_VOUCHER = gql `
    query Vouchers($shop:String!){
      vouchers(shop:$shop){
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
  
    const {loading: l, error: e, data: d} = useQuery(GET_CURRENT_SHOP)
    const {loading: l2, error: e2, data:d2} = useQuery(GET_VOUCHER,{
      variables:{
        shop: d?.getShop?.id
      }
    })
    const{loading: l3, error: e3, data:d3} = useQuery(GET_GLOBAL_VOUCHER)

    if(l2 || l || l3){
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
            <h1>Voucher Management</h1>
            <button className={styles.button}>
              <a href="/addVoucher">
                Add Voucher
              </a>
            </button>
            <h3>Shop Voucher</h3>
            {d2?.vouchers?.map((data:any)=>{
              return(
                <div className={styles.voucherContainer}>
                  <h3>{data.name}</h3>
                  <p>Description: {data.description}</p>
                  <p>Discount: {data.discount}%</p>
                  <p>Terms and Condition: {data.tnc}</p>
                  <p>Valid From: {data.startTime} - {data.endTime}</p>
                </div>
              )
            })}
            <h3>Global Voucher</h3>
            {d3?.globalVoucher?.map((data2:any)=>{
              return(
                <div className={styles.voucherContainer}>
                  <h3>{data2.name}</h3>
                  <p>Description: {data2.description}</p>
                  <p>Discount: {data2.discount}%</p>
                  <p>Terms and Condition: {data2.tnc}</p>
                  <p>Valid From: {data2.startTime} - {data2.endTime}</p>
                </div>
              )
            })}

          </div>
        </div>
      <Footer></Footer>
      </>
    )
    
}

export default Voucher