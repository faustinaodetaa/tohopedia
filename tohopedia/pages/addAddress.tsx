import type { NextPage } from 'next';
import LoggedHeader from '../components/loggedHeader';
import Footer from '../components/footer';
import styles from '../styles/address.module.scss';
import Image from 'next/image';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaBox, FaCog, FaComment, FaHome } from "react-icons/fa";

import * as yup from "yup"
import Router from 'next/router';

const AddAddress: NextPage = () => {
    

    const GET_USER = gql`query GetCurrUser{
        getCurrentUser{
          id,
          name
        }
      }`

    
    const {loading: l, error: e, data: d} = useQuery(GET_USER)
    // console.log(d?.getCurrentUser?.id)

    const ADD_ADDRESS = gql`
    mutation AddAddress($location:String!, $city:String!, $phone:String!, $postcode:Int!, $user:String!, $title:String!, $isPrimary:Boolean!){
      createAddress(input:{location:$location, city:$city, phone:$phone, postalCode:$postcode, user:$user, title:$title, isPrimary:$isPrimary}){
        id
      }
    }
    `

    const [addAddress, {loading: l2, error: e2, data: d2}] = useMutation(ADD_ADDRESS)
    

    const schema = yup.object({
        title: yup.string().required(),
        location: yup.string().required(),
        city: yup.string().required(),
        phone: yup.string().required(),
        postcode: yup.number().required()
    }).required()

        const{register, handleSubmit, formState:{errors}} = useForm({
            resolver: yupResolver(schema) 
        })

        
    async function onSubmit(data:any){
        console.log('tes')
        try{
          await addAddress({
            variables:{
              location: data.location,
              city: data.city,
              phone: data.phone,
              postcode: data.postcode,
              title: data.title,
              user: d?.getCurrentUser?.id,
              isPrimary: data.isPrimary
            }
          })
      }catch(error){
          console.log(error)
      }
    }
    if(d2){
        console.log("added product")
        // Router.reload()
        Router.push("/addresses")

    }

    if(l || l2){
      return(
        <div>Loading</div>
      )
    }



  return(
      <>
      <LoggedHeader/>
      <div className={styles.formContainer}>
        <h2>Tambah Alamat</h2>
          <div className={styles.addressContainer}>
              <form onSubmit={handleSubmit(onSubmit)}>  
                <div className={styles.input}>
                  <label htmlFor="title">Nama Alamat</label>
                  <br />
                  <input type="text" id="title" {...register("title")}/>
                  <br />
                  <p className={styles.error}>{errors.title?.message}</p>
                </div>   
                <br />       
                  <div className={styles.input}>
                      <label htmlFor="location">Lokasi</label>
                      <br />
                      <input type="text" id="location" {...register("location")}/>
                      <br />
                      <p className={styles.error}>{errors.location?.message}</p>
                  </div>
                  <br />
                  <div className={styles.input}>
                      <label htmlFor="city">Kota</label>
                      <br />
                      <input type="text" id="city" {...register("city")}/>
                      <br />
                      <p className={styles.error}>{errors.city?.message}</p>
                  </div>
                  <br />
                  <div className={styles.input}>
                      <label htmlFor="phone">No. Handphone</label>
                      <br />
                      <input type="text" id="phone" {...register("phone")}/>
                      <br />
                      <p className={styles.error}>{errors.phone?.message}</p>
                  </div>
                  <br />
                  <div className={styles.input}>
                      <label htmlFor="postcode">Kode Pos</label>
                      <br />
                      <input type="number" id="postcode" {...register("postcode")}/>
                      <br />
                      <p className={styles.error}>{errors.postcode?.message}</p>
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
                          Tambah Alamat
                      </button>
                  </div>
              </form>
          </div>
      </div>         
      <Footer/>
      </>
  )
}

export default AddAddress

