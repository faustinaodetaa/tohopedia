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

const Addresses: NextPage = () => {
    

  const GET_USER = gql`query GetCurrUser{
    getCurrentUser{
      id,
      name,
      picture
    }
  }`
  
  const {loading: l, error: e, data: d} = useQuery(GET_USER)
  
  const GET_ADDRESS = gql`
    query Addresses($user:String!){
      addresses(user:$user){
        id
        location
        city
        phone
        postalCode
        title
        isPrimary
      }
    }
  `

  const{loading: l3, error: err3, data: d3} = useQuery(GET_ADDRESS,{
    variables:{
      user: d?.getCurrentUser?.id
    }
  })

  const DELETE_ADDRESS = gql`
    mutation DeleteAddress($id:ID!){
      deleteAddress(id:$id){
        title
      }
    }
  `

  const[deleteAddress, {loading: l4, error: e4, data: d4}] = useMutation(DELETE_ADDRESS)


  async function onSubmit(data:any) {
    try{
      await deleteAddress({
        variables:{
          id: data
        }
      })
    }catch(error){
      console.log(error)
    }
  }

  if(d4){
    Router.reload()
  }
  

    const schema = yup.object({
        name: yup.string().required(),
        description: yup.string().required(),
        price: yup.number().required(),
        discount: yup.number().required(),
        metadata: yup.string().required()
    }).required()

        const{register, handleSubmit, formState:{errors}} = useForm({
            resolver: yupResolver(schema)
        })




  return(
      <>
      <LoggedHeader/>
      <div className={styles.formContainer}>
        <h2>Addresses</h2>
        <button className={styles.button}>
          <a href="/addAddress">Add Address</a>
        </button>
          <div className={styles.formContent}>
            <br />
            {d3?.addresses?.length > 0 ? (d3?.addresses?.map((data:any)=>{
              return(
                <div className={styles.addressContainer} key={data?.id}>
                  <h3>{data?.title}</h3> 
                  <p>{data?.isPrimary === true ? <b>Primary Address</b>: <p></p>}</p>
                  <p>{data?.location}</p>
                  <p>{data?.city}</p>
                  <p>{data?.postalCode}</p>
                  <p>{data?.phone}</p>
                  <button className={styles.button}>
                    <a href={`/editAddress/${data?.id}`} key={data?.id}>Edit Alamat</a>
                  </button>
                  <button className={styles.button} onClick={()=>onSubmit(data?.id)}>
                    Hapus Alamat
                  </button>


                </div>
              )
            })):
              <div>
                <a href="/addAddress">
                  Tambahkan Alamat
                </a>
              </div>
            }
          </div>
        </div>
      <Footer/>
      </>
  )
}

export default Addresses

