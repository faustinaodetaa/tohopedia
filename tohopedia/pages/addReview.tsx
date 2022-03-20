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

const AddReview: NextPage = () => {
    

    const GET_USER = gql`query GetCurrUser{
        getCurrentUser{
          id,
          name
        }
      }`

    
    const {loading: l, error: e, data: d} = useQuery(GET_USER)
    // console.log(d?.getCurrentUser?.id)

    const ADD_REVIEW = gql`
      mutation CreateReview($score:Int!, $description:String!, $image: String!, $anonymous: Boolean!, $product:String!){
        createReview(input:{score:$score, description:$description,image:$image, anonymous:$anonymous, product:$product}){
          id
        }
      }
    `

    const [addReview, {loading: l2, error: e2, data: d2}] = useMutation(ADD_REVIEW)
    

    const schema = yup.object({
        score: yup.string().required(),
        description: yup.string().required(),
        image: yup.string().required(),
        anonymous: yup.string().required(),
        product: yup.number().required()
    }).required()

        const{register, handleSubmit, formState:{errors}} = useForm({
            resolver: yupResolver(schema) 
        })
        let productpic:any
        
        const handleImage = async (e: any) => {
          const image = e.target.files[0]
          productpic = (await convertToBase64(image)) as string
      
          console.log(productpic) 
        }
        
    async function onSubmit(data:any){
        console.log('tes')
        try{
          await addReview({
            variables:{
              score:data.score,
              description: data.description,
              image: productpic,
              anonymous: data.anonymous,
              product: data.product
            }
          })
      }catch(error){
          console.log(error)
      }
    }
    if(d2){
        console.log("added review")
        // Router.reload()
        // Router.push("/addresses")

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
        <h2>Tambah Ulasan</h2>
          <div className={styles.addressContainer}>
              <form onSubmit={handleSubmit(onSubmit)}>  
                <div className={styles.input}>
                  <label htmlFor="score">Skor</label>
                  <br />
                  <input type="number" id="score" {...register("score")}/>
                  <br />
                  <p className={styles.error}>{errors.score?.message}</p>
                </div>   
                <br />       
                  <div className={styles.input}>
                      <label htmlFor="description">Deskripsi</label>
                      <br />
                      <input type="text" id="description" {...register("description")}/>
                      <br />
                      <p className={styles.error}>{errors.description?.message}</p>
                  </div>
                  <br />
                  <div className={styles.input}>
                    <label htmlFor="picture">Foto Produk</label>
                    <br />
                    <input type="file" id="picture" name="picture" multiple onChange={handleImage} />
                    <br />
                  </div>
                  <br />
                  <div>

                    <input type="checkbox" {...register("anonymous")}  id="anonymous" />
                    <label htmlFor="anonymous">Is Anonymous?</label>

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

export default AddReview

export const convertToBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = () => {
      resolve(fileReader.result)
    }
    fileReader.readAsDataURL(file)

    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}