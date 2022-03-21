import type { NextPage } from 'next';
import styles from '../../styles/voucher.module.scss';
import LoggedHeader from '../../components/loggedHeader';
import React from 'react'
import { getCookie } from 'cookies-next';
import { FaBox, FaCog, FaComment, FaHome, FaTicketAlt } from "react-icons/fa";
import { gql, useMutation, useQuery } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../../components/footer';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

let flag = false

const RedeemVoucher: NextPage = () => {
  const router = useRouter()
  const {query : {id},} = router
  const voucherId = router.asPath.split('/')[2]
  var vouchercode = Math.random().toString(36).substring(5)


  const REDEEM_VOUCHER = gql`
    mutation RedeemVoucher($user:String!, $voucher:String!){
      redeemVoucher(input:{user:$user, voucher:$voucher}){
        voucher{
          name
        }
      }
    }
  `

  const[redeem,{loading: l, error: e, data: d}] = useMutation(REDEEM_VOUCHER)

  const GET_USER = gql`
    query GetCurrUser{
      getCurrentUser{
        id,
        name
      }
    }
  `
  const{loading:l2, error: e2, data: d2} = useQuery(GET_USER)

  const{register, handleSubmit, formState:{errors}} = useForm()

  async function onSubmit() {
    let inputTopup = document.getElementById("code").value
    console.log(flag)
  
    console.log(inputTopup)
    if(inputTopup == vouchercode){
      flag =true
    }
    console.log(flag)
  }

  if(flag){
    redeem({
      variables:{
        user: d2?.getCurrentUser?.id,
        voucher: voucherId
      }
    })
    flag = false;

  }

  if(l || l2){
    return(
      <div>Loading</div>
    )
  }
  
    return (
    <>
      <LoggedHeader></LoggedHeader>
        <div>
          <h1 className={styles.titleMain}>Redeem Voucher</h1>
          <div className={styles.redeemContainer}>
            <h3>Unique Code: {vouchercode}</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="">Input unique code above:</label>
              <input type="text" id="code" {...register("code")}/>
              <button type="submit" className={styles.button} >Redeem Voucher</button>
            </form>
          </div>
        </div>
      <Footer></Footer>
    </>
    
  
    )
    
}

export default RedeemVoucher