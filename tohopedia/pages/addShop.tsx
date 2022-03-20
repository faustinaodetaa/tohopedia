import type { NextPage } from 'next';
import LoggedHeader from '../components/loggedHeader';
import Footer from '../components/footer';
import styles from '../styles/shop.module.scss';
import Image from 'next/image';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from "yup"
import { getCookie } from 'cookies-next';
import Router from 'next/router';


const AddShop: NextPage = () => {

    const ADD_SHOP_QUERY = gql`
        mutation CreateShop($name:String!, $nameSlug: String!, $address: String!, $user:String!, $phone: String!){
        createShop(input:{name: $name, nameSlug: $nameSlug, address: $address, user: $user, phone: $phone}){
            id
            name
            nameSlug
            address
            phone
        }
        }
    `
    

    const GET_USER = gql`query GetCurrUser{
        getCurrentUser{
          id,
          name
        }
      }`

    const {loading: l, error: e, data: d} = useQuery(GET_USER)
    console.log(d?.getCurrentUser?.id)
    
    const [create, {loading, error, data}] = useMutation(ADD_SHOP_QUERY)
    console.log(data);
    const schema = yup.object({
        phone: yup.string().required(),
        name: yup.string().required(),
        slug: yup.string().required(),
        address: yup.string().required()
    }).required()

        const{register, handleSubmit, formState:{errors}} = useForm({
            resolver: yupResolver(schema)
        })

    async function onSubmit(data:any){
        console.log(data)

        try{
            await create({
                variables:{
                    name: data.name,
                    nameSlug: data.slug,
                    address: data.address,
                    user: d?.getCurrentUser?.id,
                    phone: data.phone
                }
            })
        }catch(error){
            console.log(error)
        }
    }
    if(data){
        console.log("created")
        Router.reload()
    }
console.log(getCookie('currUser'))
  return(
      <>
      <LoggedHeader/>
      <div className={styles.addShopContainer}>

      <div className={styles.container}> 
          <h3 className={styles.title}>Nama toko yang unik, selalu terlihat menarik</h3>
          <p className={styles.description}>Gunakan nama yang singkat dan sederhana agar tokomu mudah diingat pembeli.</p>
          <Image src="/shop.png" width={350} height={300} ></Image>

      </div>

      <div className={styles.formContainer}>
                <div className={styles.formTitle}>
                    <h3 className={styles.formTitle}>Halo, {d?.getCurrentUser?.name} ayo isi detail tokomu!</h3>
                </div>
                <div className={styles.formContent}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.input}>
                            <label htmlFor="phone">Masukkan No. HP-mu</label>
                            <br />
                            <input type="text" id="phone" {...register("phone")}/>
                            <p className={styles.error}></p>
                        </div>
                        <br />
                        <div className={styles.input}>
                            <label htmlFor="name">Masukkan Nama Toko dan Domain</label>
                            <br />
                            <label htmlFor="name">Nama Toko</label>
                            <br />
                            <input type="text" id="name" {...register("name")}/>
                            <br />
                            <label htmlFor="slug">Nama Domain</label>
                            <br />
                            <input type="text" id="slug" {...register("slug")}/>
                            
                            <p className={styles.error}></p>

                        </div>
                        <br />
                        <div className={styles.input}>
                            <label htmlFor="address">Masukkan Alamat Tokomu</label>
                            <br />
                            <input type="text" id="address" {...register("address")}/>
                            <p className={styles.error}></p>
                        </div>
                        <br />
                        
                        <div className={styles.submitContainer}>
                            <button type='submit' className={styles.submit}>
                                Register Shop
                            </button>
                        </div>
                    </form>
                </div>
            </div>
      </div>
          
          
      <Footer/>
      </>
  )
}

export default AddShop

