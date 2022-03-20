import type { NextPage } from 'next';
import styles from '../../styles/address.module.scss';
import LoggedHeader from '../../components/loggedHeader';
import Header from '../../components/header';
import Footer from '../../components/footer';
import React, { useState } from 'react'
import { getCookie } from 'cookies-next';
import { FaBox, FaCog, FaComment, FaHeart, FaHome, FaMinus, FaPlus, FaShare, FaStore } from "react-icons/fa";
import { gql, useMutation, useQuery } from '@apollo/client';
import ProuctCard from '../../components/card';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Router from "next/router";

import { useForm } from 'react-hook-form';


const EditAddress: NextPage = () => {

  const router = useRouter()
  const {query : {id},} = router
  const addressId = router.asPath.split('/')[2]
  console.log(router.asPath.split('/')[2])
  const GET_USER = gql`query GetCurrUser{
    getCurrentUser{
      id,
      name
    }
  }`

  const {loading: loa, error: er, data: da} = useQuery(GET_USER)

  const GET_CURRENT_ADDRESS = gql`
    query AddressByID($id:ID!){
      addressById(id:$id){
        title,
        location,
        city,
        postalCode,
        phone
      }
    }
  `

  const {loading: l2, error: e2, data: d2} = useQuery(GET_CURRENT_ADDRESS,{
    variables:{
      id: addressId
    }
  })

  

  const{register, handleSubmit, formState:{errors}} = useForm()
  
  const UPDATE_ADDRESS = gql`
    mutation UpdateAddress($id:ID! $location:String!,$city:String!, $phone:String!, $postcode:Int!, $title:String!, $isPrimary:Boolean!){
      updateAddress(id:$id, input:{location:$location, city:$city, phone:$phone, postalCode: $postcode, title:$title, isPrimary:$isPrimary}){
        title
        location
        city
        phone
        postalCode
      }
    }
  `

  const[updateAddress, {loading: l, error: e, data: d}] = useMutation(UPDATE_ADDRESS)

  async function onSubmit(data:any) {
    console.log(data.isPrimary)
    try{
      await updateAddress({
        variables:{
          id: addressId,
          location: data.location,
          city: data.city,
          phone: data.phone,
          postcode: data.postcode,
          title: data.title,
          isPrimary: data.isPrimary
        }
      })
    }catch(error){
      console.log(error)
    }
  }

  if(d){
    console.log("updated successfully")
    
  }

  if(l || loa){
    return(
      <div>Loading</div>
    )
  }





    
    return (
      <>
      <LoggedHeader/>

 
      <div className={styles.formContainer}>
                {/* <div className={styles.formTitle}> */}
                    <h3 className={styles.formTitle}>Edit Address</h3>
                {/* </div> */}
                <div className={styles.addressContainer}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        
                        <br />
                        <div className={styles.input}>
                            <label htmlFor="location">Edit lokasi</label>
                            <br />
                            <input type="text" id="location" {...register("location")} placeholder={d2?.addressById?.location}/>
                            <p className={styles.error}></p>
                        </div>
                        <br />
                        <div className={styles.input}>
                            <label htmlFor="city">Edit kota</label>
                            <br />
                            <input type="text" id="city" {...register("city")} placeholder={d2?.addressById?.city}/>
                            <p className={styles.error}></p>
                        </div>
                        <br />
                        <div className={styles.input}>
                            <label htmlFor="phone">Edit no handphone</label>
                            <br />
                            <input type="text" id="phone" {...register("phone")} placeholder={d2?.addressById?.phone}/>
                            <p className={styles.error}></p>
                        </div>
                        <br />
                        <div className={styles.input}>
                            <label htmlFor="postcode">Edit kode pos</label>
                            <br />
                            <input type="number" id="postcode" {...register("postcode")} placeholder={d2?.addressById?.postalCode}/>
                            <p className={styles.error}></p>
                        </div>
                        <br />
                        <div className={styles.input}>
                            <label htmlFor="title">Edit judul alamat</label>
                            <br />
                            <input type="text" id="title"  {...register("title")} placeholder={d2?.addressById?.title}/>

                            <p className={styles.error}></p>
                        </div>
                        <br />
                        <div className={styles.input}>

                          <input type="checkbox" {...register("isPrimary")}  id="isPrimary" />
                          <label htmlFor="isPrimary">Is Primary?</label>

                          <p className={styles.error}></p>
                        </div>
                        <br />
                        
                        <div className={styles.submitContainer}>
                            <button type='submit' className={styles.button}>
                                Update Address
                            </button>
                        </div>
                    </form>
                </div>

      
      </div>
      <div className={styles.addShopContainer}>
      
      </div>


          
      <Footer/>
      </>
    )
    
}

export default EditAddress