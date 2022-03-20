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
import { FaBox, FaCog, FaComment, FaHome } from "react-icons/fa";
import Router from 'next/router';


const EditShop: NextPage = () => {

    const EDIT_USER = gql`
        mutation UpdateUser($id:ID!,$email:String!, $picture:String!, $name: String!, $dob:Date!, $gender:String!, $phone:String!){
        updateUser(id:$id, input:{email:$email, picture:$picture, name:$name, dob:$dob, gender:$gender, phone:$phone}){
          email
          password
          username
          name
          role
          phone
          gender
        }
      }
    `

    const GET_USER = gql`query GetCurrUser{
      getCurrentUser{
        id
        name
        email
        password
        username
        phone
        gender
        dob
      }
    }`

    const {loading: load, error: err, data: dat} = useQuery(GET_USER)
    
    const [update, {loading, error, data}] = useMutation(EDIT_USER)
    console.log(data);

    const schema = yup.object({
        name: yup.string().required(),
        email: yup.string().required(),
        phone: yup.string().required()
    }).required()

        const{register, handleSubmit, formState:{errors}} = useForm({
            resolver: yupResolver(schema)
        })
    let profilepic:any
        
    const handleImage = async (e: any) => {
      const image = e.target.files[0]
      profilepic = (await convertToBase64(image)) as string
  
      console.log(profilepic) 
    }


    async function onSubmit(data:any){
        console.log(data)
      console.log(profilepic) 

        try{
            await update({
                variables:{
                  id: dat?.getCurrentUser?.id,
                  email: data.email,
                  name: data.name,
                  dob: data.dob,
                  gender: data.gender,
                  phone: data.phone,
                  picture: profilepic,
                  
                }
            })
        }catch(error){
            console.log(error)
        }
    }
    if(data){
        console.log("updated")
        Router.reload()

    }
    
    
  return(
      <>
      <LoggedHeader/>
      <div className={styles.editShopContainer}>
        
      <div className={styles.formContainer}>
                {/* <div className={styles.formTitle}> */}
                    <h3 className={styles.formTitle}>Halo, {dat?.getCurrentUser?.name} silahkan edit profilmu!</h3>
                {/* </div> */}
                <div className={styles.formContent}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.input}>
                            <label htmlFor="name">Edit Nama</label>
                            <br />
                            <input type="text" id="name" {...register("name")} placeholder={dat?.getCurrentUser?.name}/>
                            <br />
                            <label htmlFor="dob">Edit Date of Birth</label>
                            <br />
                            <input type="date" id="dob" {...register("dob")} placeholder={dat?.getCurrentUser?.dob}/>
                            
                            <p className={styles.error}></p>

                        </div>
                        <br />
                        <div className={styles.input}>
                            <label htmlFor="gender">Edit gender</label>
                            <br />
                            <label htmlFor="female">Female</label>
                            <input type="radio" id="gender" {...register("gender")} value="female"/>
                            <label htmlFor="male">Male</label>
                            <input type="radio" id="gender" {...register("gender")} value="male"/>

                            <p className={styles.error}></p>
                        </div>
                        <br />
                        <div className={styles.input}>
                            <label htmlFor="email">Edit email</label>
                            <br />
                            <input type="email" id="email" {...register("email")} placeholder={dat?.getCurrentUser?.email}/>
                            <p className={styles.error}></p>
                        </div>
                        <br />
                        <div className={styles.input}>
                            <label htmlFor="phone">Edit phone number</label>
                            <br />
                            <input type="text" id="phone" {...register("phone")} placeholder={dat?.getCurrentUser?.phone}/>
                            <p className={styles.error}></p>
                        </div>
                        <br />
                        <div className={styles.input}>
                            <label htmlFor="profile">Edit profile</label>
                            <br />
                            <input type="file" id="picture" name="picture" onChange={handleImage} />
                            {/* <input type="text" id="profile" {...register("profile")} placeholder={d?.getShop?.profile}/> */}

                            <p className={styles.error}></p>
                        </div>
                        <br />
                      
                        <div className={styles.submitContainer}>
                            <button type='submit' className={styles.submit}>
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>

      
      </div>
      <div className={styles.addShopContainer}>
      
      </div>


          
      <Footer/>
      </>
  )
}

export default EditShop

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