import type { NextPage } from 'next';
import LoggedHeader from '../components/loggedHeader';
import Footer from '../components/footer';
import styles from '../styles/product.module.scss';
import Image from 'next/image';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from "yup"


const AddShop: NextPage = () => {

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

    const{loading: load, error: er, data: da} = useQuery(GET_CATEGORIES)
    console.log(da)
    console.log(da?.getAllCategory)
    da?.getAllCategory?.map((category: any) => {
      console.log(category)
      console.log(category?.id)
    })
    const{loading: lo, error: err, data: dat} = useQuery(GET_CURRENT_SHOP)
    console.log(dat)
    const {loading: l, error: e, data: d} = useQuery(GET_USER)
    console.log(d?.getCurrentUser?.id)

    const [create, {loading, error, data}] = useMutation(ADD_PRODUCT_QUERY)
    console.log(data);
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
        console.log(data)
      console.log(data.category)
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
      <div className={styles.formContainer}>
        <h2>Tambah Produk</h2>
                <div className={styles.formContent}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.input}>
                          <label htmlFor="picture">Foto Produk</label>
                          <br />
                          <input type="file" id="picture" name="picture" onChange={handleImage} />
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

export default AddShop


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