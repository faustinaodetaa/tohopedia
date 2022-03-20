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


const AddVoucherAdmin: NextPage = () => {

    const CREATE_VOUCHER = gql`
        mutation CreateVoucher($name:String!, $description:String!, $discount:Float!, $tnc: String!, $startTime:Time!, $endTime:Time!, $shop:String!, $isGlobal:Boolean!){
        createVoucher(input:{name:$name, description:$description, discount:$discount, tnc:$tnc, startTime:$startTime, endTime:$endTime, shop:$shop, isGlobal:$isGlobal}){
          id
        }
      }
    `

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

    

    const [createVoucher, {loading, error, data}] = useMutation(CREATE_VOUCHER)
    const{loading:l, error: e, data: d} = useQuery(GET_CURRENT_SHOP)
    // console.log(data);
    const schema = yup.object({
        name: yup.string().required(),
        description: yup.string().required(),
        discount: yup.string().required(),
        tnc: yup.string().required(),
        startTime: yup.string().required(),
        endTime: yup.string().required()

    }).required()

        const{register, handleSubmit, formState:{errors}} = useForm({
            resolver: yupResolver(schema)
        })

    async function onSubmit(data:any){
        console.log(data)

        try{
            await createVoucher({
                variables:{
                    name: data.name,
                    description: data.description,
                    discount: data.discount,
                    tnc: data.tnc,
                    startTime: data.startTime,
                    endTime: data.endTime,
                    shop: d?.getShop?.id,
                    isGlobal: true
                }
            })
        }catch(error){
            console.log(error)
        }
    }
    if(data){
        console.log("created voucher")
        // Router.reload()
        // Router.push('/voucher')
    }
// console.log(getCookie('currUser'))
  return(
      <>
      <LoggedHeader/>
      <div className={styles.addShopContainer}>

      <div className={styles.formContainer}>
              
        <div className={styles.formContent}>
            <h1>Add Voucher - Admin</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.input}>
                    <label htmlFor="name">Masukkan Nama Voucher</label>
                    <br />
                    <input type="text" id="name" {...register("name")}/>
                    <p className={styles.error}>{errors.name?.message}</p>
                </div>
                <br />
                <div className={styles.input}>
                    <label htmlFor="description">Masukkan Deskripsi Voucher</label>
                    <br />
                    <input type="text" id="description" {...register("description")}/>
                    <p className={styles.error}>{errors.description?.message}</p>
                </div>
                <br />
                <div className={styles.input}>
                    <label htmlFor="discount">Masukkan Diskon Voucher</label>
                    <br />
                    <input type="text" id="discount" {...register("discount")}/>
                    <p className={styles.error}>{errors.discount?.message}</p>
                </div>
                <br />
                <div className={styles.input}>
                    <label htmlFor="tnc">Masukkan Syarat dan Ketentuan Voucher</label>
                    <br />
                    <input type="text" id="tnc" {...register("tnc")}/>
                    <p className={styles.error}>{errors.tnc?.message}</p>
                </div>
                <br />
                <div className={styles.input}>
                    <label htmlFor="startTime">Masukkan Masa Berlaku Voucher</label>
                    <br />
                    <input type="text" id="startTime" {...register("startTime")}/>
                    <p className={styles.error}>{errors.startTime?.message}</p>
                </div>
                <br />
                <div className={styles.input}>
                    <label htmlFor="endTime">Masukkan Masa Berakhir Voucher</label>
                    <br />
                    <input type="text" id="endTime" {...register("endTime")}/>
                    <p className={styles.error}>{errors.endTime?.message}</p>
                </div>
                <br />
                
                <div className={styles.submitContainer}>
                    <button type='submit' className={styles.submit}>
                        Add Voucher
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

export default AddVoucherAdmin

