import type { NextPage } from 'next';
import LoggedHeader from '../components/loggedHeader';
import Footer from '../components/footer';
import styles from '../styles/product.module.scss';
import Image from 'next/image';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaBox, FaCog, FaComment, FaHome } from "react-icons/fa";

import * as yup from "yup"
import Router from 'next/router';

let images: any[] = [] 
let flag= false

const AddProduct: NextPage = () => {
    const ADD_PRODUCT_QUERY = gql`
      mutation CreateProduct($name:String!, $description: String!, $price: Int!, $discount: Float!, $stock: Int!, $metadata: String!, $category: String!){
        createProduct(input:{name:$name, description: $description, price: $price, discount: $discount, stock: $stock, metadata: $metadata, category:$category}){
          id
        }
      }
    `
    

    const GET_USER = gql`query GetCurrUser{
        getCurrentUser{
          id,
          name
        }
      }`

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

    const GET_CATEGORIES = gql`
      query GetAllCategory{
        getAllCategory{
          id
          name
        }
      }
    `
    const ADD_PRODUCT_IMAGE = gql`
      mutation CreateImage($image:String!, $product:String!){
        createImage(input:{image:$image, product:$product}){
          id
        }
      }
    `

    const{loading: load, error: er, data: da} = useQuery(GET_CATEGORIES)
    // console.log(da)
    // console.log(da?.getAllCategory)
    // da?.getAllCategory?.map((category: any) => {
    //   console.log(category)
    //   console.log(category?.id)
    // })
    const{loading: lo, error: err, data: dat} = useQuery(GET_CURRENT_SHOP)
    // console.log(dat)
    const {loading: l, error: e, data: d} = useQuery(GET_USER)
    // console.log(d?.getCurrentUser?.id)

    const [create, {loading, error, data}] = useMutation(ADD_PRODUCT_QUERY)
    // console.log(data);
    
    const [createImg, {loading: l2, error: e2, data: d2}] = useMutation(ADD_PRODUCT_IMAGE)


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

        
        async function onSubmit(data:any){
          //   console.log(data)
          // console.log(data.category)
      
          let imagesInput = (document.getElementById('picture') as HTMLInputElement).files
          if (imagesInput) {
            for (let idx = 0; idx < imagesInput?.length; idx++) {
              let image = (await convertToBase64(imagesInput[idx])) as string
              images.push(image)
            }
          }
          
          try{
            await create({
              variables:{
                name: data.name,
                description: data.description,
                price: data.price,
                discount: data.discount,
                stock: data.stock,
                metadata: data.metadata,
                category: data.category
              }
            })
        }catch(error){
            console.log(error)
        }
    }
    if(data){
        console.log("added product")
        Router.reload()

    }

    if (!flag && data && images) {
      images.forEach(e => {
        createImg({ variables: { image: e, product: data.createProduct.id } })
      });
      console.log('tes')
      console.log(data.createProduct.id)
      flag = true
    }


    let profilepic = null
    const handleImage = async (e: any) => {
      const image = e.target.files[0]
      profilepic = (await convertToBase64(image)) as string
  
      console.log(profilepic) 
    }


  return(
      <>
      <LoggedHeader/>
      <div className={styles.addProductContainer}>
      <div className={styles.sideContainer}>

<h2>Tohopedia Seller</h2>
<div className={styles.side}>
    <p className={styles.shopName}>{d?.getShop?.name}</p>
      <ul className={styles.sideList}>
        <li>
          <a href="../shop">
            <FaHome></FaHome> Home
          </a>
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
        <h2>Tambah Produk</h2>
                <div className={styles.formContent}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.input}>
                          <label htmlFor="picture">Foto Produk</label>
                          <br />
                          <input type="file" id="picture" name="picture" multiple onChange={handleImage} />
                          <br />
                        </div>
                        <br />
                        <h4>Informasi Produk</h4>
                        <div className={styles.input}>
                            <label htmlFor="name">Nama Produk</label>
                            <br />
                            <input type="text" id="name" {...register("name")}/>
                            <br />
                            <p className={styles.error}></p>
                        </div>
                        <br />
                        <div className={styles.input}>
                            <label htmlFor="category">Kategori</label>
                            <br />
                            <select {...register("category")}>
                              {da?.getAllCategory?.length > 0 ?(
                                da?.getAllCategory?.map((cat: any) =>{return(
                                  <option value={cat?.id} key={cat?.id}>{cat?.name}</option>
                                )})
                              ):
                                <option value="" key="">No Category</option>
                            }
                            
                            </select>
                            <p className={styles.error}></p>
                        </div>
                        <br />
                        <div className={styles.input}>
                            <label htmlFor="description">Deskripsi</label>
                            <br />
                            <textarea id="description" {...register("description")}></textarea>
                            <br />
                            <p className={styles.error}></p>
                        </div>
                        <br />
                        <div className={styles.input}>
                            <label htmlFor="price">Harga</label>
                            <br />
                            <input type="number" id="price" {...register("price")}/>
                            <br />
                            <p className={styles.error}></p>
                        </div>
                        <br />
                        <div className={styles.input}>
                            <label htmlFor="stock">Stok Produk</label>
                            <br />
                            <input type="number" id="stock" {...register("stock")}/>
                            <br />
                            <p className={styles.error}></p>
                        </div>
                        <br />
                        <div className={styles.input}>
                            <label htmlFor="discount">Diskon</label>
                            <br />
                            <input type="number" id="discount" {...register("discount")}/>
                            <br />
                            <p className={styles.error}></p>
                        </div>
                        <br />
                        <div className={styles.input}>
                            <label htmlFor="metadata">Metadata</label>
                            <br />
                            <input type="text" id="metadata" {...register("metadata")}/>
                            <br />
                            <p className={styles.error}></p>
                        </div>
                        <br />
                        <div className={styles.submitContainer}>
                            <button type='submit' className={styles.submit}>
                                Tambah Produk
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

export default AddProduct


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