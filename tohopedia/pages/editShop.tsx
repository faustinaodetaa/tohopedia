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

    const EDIT_SHOP_QUERY = gql`
        mutation UpdateShop($id: ID!, $name: String!, $nameSlug: String!, $profile:String!, $slogan: String!, $description:String!, $openHour: Time!, $closeHour:Time!, $isOpen:Boolean!){
          updateShop(id: $id, input:{name:$name, nameSlug:$nameSlug, profile:$profile, slogan:$slogan, description:$description, openHour:$openHour, closeHour:$closeHour, isOpen:$isOpen}){
            id
            name
            nameSlug
            slogan
            description
            profile
            openHour
            closeHour
            isOpen
            
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

    const GET_USER = gql`query GetCurrUser{
      getCurrentUser{
        id,
        name
      }
    }`

    const {loading: load, error: err, data: dat} = useQuery(GET_USER)

    const {loading: l, error: e, data: d} = useQuery(GET_CURRENT_SHOP)
    console.log(d?.getShop?.id)
    
    const [update, {loading, error, data}] = useMutation(EDIT_SHOP_QUERY)
    // console.log(data);

    const schema = yup.object({
        name: yup.string().required(),
        slug: yup.string().required(),
        description: yup.string().required(),
        slogan: yup.string().required()
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
        console.log(profilepic)
        console.log(d?.getShop?.id)
        console.log(data.name)
        console.log(data.slug)
        console.log(data.slogan)
        console.log(data.description)
        console.log(data.openHour)
        console.log(data.closeHour)
        console.log(data.isOpen)



        try{
            await update({
                variables:{
                  id: d?.getShop?.id,
                  name: data.name,
                  nameSlug: data.slug,
                  profile: profilepic,
                  slogan: data.slogan,
                  description: data.description,
                  openHour: data.openHour,
                  closeHour: data.closeHour,
                  isOpen: data.isOpen
                  
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

    if(loading || load || l){
      return(
        <div>Loading</div>
      )
    }
    
  return(
      <>
      <LoggedHeader/>
      <div className={styles.editShopContainer}>
        <div className={styles.sideContainer}>

        <h2>Tohopedia Seller</h2>
        <div className={styles.side}>
            <p className={styles.shopName}>{d?.getShop?.name}</p>
              <ul className={styles.sideList}>
                <li>
                  <FaHome></FaHome> Home
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
      <div className={styles.formContainer}>
                {/* <div className={styles.formTitle}> */}
                    <h3 className={styles.formTitle}>Halo, {dat?.getCurrentUser?.name} silahkan edit tokomu!</h3>
                {/* </div> */}
                <div className={styles.formContent}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.input}>
                            <label htmlFor="name">Edit nama toko dan domain</label>
                            <br />
                            <label htmlFor="name">Nama Toko</label>
                            <br />
                            <input type="text" id="name" {...register("name")} placeholder={d?.getShop?.name}/>
                            <br />
                            <label htmlFor="slug">Nama Domain</label>
                            <br />
                            <input type="text" id="slug" {...register("slug")} placeholder={d?.getShop?.nameSlug}/>
                            
                            <p className={styles.error}></p>

                        </div>
                        <br />
                        <div className={styles.input}>
                            <label htmlFor="slogan">Edit slogan</label>
                            <br />
                            <input type="text" id="slogan" {...register("slogan")} placeholder={d?.getShop?.slogan}/>
                            <p className={styles.error}></p>
                        </div>
                        <br />
                        <div className={styles.input}>
                            <label htmlFor="slogan">Edit description</label>
                            <br />
                            <input type="text" id="description" {...register("description")} placeholder={d?.getShop?.description}/>
                            <p className={styles.error}></p>
                        </div>
                        <br />
                        <div className={styles.input}>
                            <label htmlFor="open">Edit open hour</label>
                            <br />
                            <input type="text" id="openHour" {...register("openHour")} placeholder={d?.getShop?.openHour}/>
                            <p className={styles.error}></p>
                        </div>
                        <br />
                        <div className={styles.input}>
                            <label htmlFor="close">Edit close hour</label>
                            <br />
                            <input type="text" id="closeHour" {...register("closeHour")} placeholder={d?.getShop?.closeHour}/>
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
                        <div className={styles.input}>

                            <input type="checkbox" {...register("isOpen")}  id="isOpen" />
                            <label htmlFor="isOpen">Is the Shop Open?</label>

                            {/* <input type="text" id="isOpen" {...register("isOpen")} placeholder={d?.getShop?.isOpen.toString()}/> */}
                            <p className={styles.error}></p>
                        </div>
                        <br />
                        
                        <div className={styles.submitContainer}>
                            <button type='submit' className={styles.submit}>
                                Update Shop
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