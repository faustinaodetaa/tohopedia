import type { NextPage } from 'next';
import styles from '../styles/shop.module.scss';
import LoggedHeader from '../components/loggedHeader';
import Header from '../components/header';
import Footer from '../components/footer';
import React from 'react'
import { getCookie } from 'cookies-next';
import { FaBox, FaCog, FaComment, FaHome } from "react-icons/fa";
import { gql, useQuery } from '@apollo/client';
import ProuctCard from '../components/card';

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
    const {loading: l, error: e, data: d} = useQuery(GET_CURRENT_SHOP)


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
                  <FaComment></FaComment> Chat
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
            <h5>Shop Information</h5>
            <p>{d?.getShop?.name}</p>
            <p>{d?.getShop?.nameSlug}</p>
            <p>{d?.getShop?.slogan}</p>
            <p>{d?.getShop?.description}</p>
            <p>{d?.getShop?.isOpen === true ? <p>Shop is Currently Open</p> : <p>Shop is Currently Close</p>}</p>
            <ProuctCard></ProuctCard>
          </div>
        </div>
      <Footer></Footer>
      </>
    )
    
}

export default Shop