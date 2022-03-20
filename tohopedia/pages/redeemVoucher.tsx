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


const RedeemVoucher: NextPage = () => {
  
    return (
    <>
      <LoggedHeader></LoggedHeader>
        <div>
          <h1 className={styles.titleMain}>Redeem Voucher</h1>
        </div>
      <Footer></Footer>
    </>
    
  
    )
    
}

export default RedeemVoucher