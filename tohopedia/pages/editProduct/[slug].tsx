import type { NextPage } from 'next';
import LoggedHeader from '../../components/loggedHeader';
import Footer from '../../components/footer';
import styles from '../../styles/shop.module.scss';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from "yup"
import { getCookie } from 'cookies-next';
import { FaBox, FaCog, FaComment, FaHome } from "react-icons/fa";
import Router, { useRouter } from 'next/router';


const EditProduct: NextPage = () => {

  const router = useRouter()
  const {query : {id},} = router
  const productId = router.asPath.split('/')[2]

  const EDIT_PRODUCT = gql`
    mutation UpdateProduct($id:ID!, $name:String!, $description:String!, $price:Int!, $discount:Float!, $stock:Int!, $metadata:String!, $category:String!){
      updateProduct(id:$id, input:{name:$name, description:$description, price:$price, discount:$discount, stock:$stock, metadata:$metadata, category:$category}){
        name
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

  const GET_PRODUCT = gql `
    
  query GetProductById($id:ID!){
    product(id:$id){
      name
      images{
        image
      }
      description
      price
      discount
      stock
      metadata
      category{
        name
      }
      shop{
        user{
          id
        }
        name
        profile
        address
      }
      soldCount
      
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

  const{loading: l3, error: e3, data: d3} = useQuery(GET_CATEGORIES)


  const{loading: l2, error: e2, data: d2} = useQuery(GET_PRODUCT,{
    variables:{
      id: productId
    }
  })

  const {loading: load, error: err, data: dat} = useQuery(GET_USER)

  const {loading: l, error: e, data: d} = useQuery(GET_CURRENT_SHOP)

    
    const [update, {loading, error, data}] = useMutation(EDIT_PRODUCT)
    // console.log(data);

    const schema = yup.object({
        name: yup.string().required(),
        description: yup.string().required(),
        price: yup.string().required(),
        discount: yup.string().required()
    }).required()

        const{register, handleSubmit, formState:{errors}} = useForm({
            resolver: yupResolver(schema)
        })

    async function onSubmit(data:any){
        try{
            await update({
                variables:{
                  id: productId,
                  name: data.name,
                  description: data.description,
                  price: data.price,
                  discount: data.discount,
                  stock: data.stock,
                  metadata: data.metadata,
                  category: data.category,
                  
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

    if(loading || l || load || l2 || l3){
      return(
        <div>Loading</div>
      )
    }
    
  return(
      <>
      <LoggedHeader/>
      <div className={styles.editShopContainer}>
      <div className={styles.formContainer}>
                {/* <div className={styles.formTitle}> */}
                    <h3 className={styles.formTitle}>Edit Produk</h3>
                {/* </div> */}
                <div className={styles.formContent}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.input}>
                            <label htmlFor="name">Edit nama</label>
                            <br />
                            <input type="text" id="name" {...register("name")} placeholder={d2?.product?.name}/>
                            <p className={styles.error}>{errors.name?.message}</p>
                        </div>
                        <br />
                        <div className={styles.input}>
                            <label htmlFor="description">Edit deskripsi</label>
                            <br />
                            <input type="text" id="description" {...register("description")} placeholder={d2?.product?.description}/>
                            <p className={styles.error}>{errors.description?.message}</p>
                        </div>
                        <br />
                        <div className={styles.input}>
                            <label htmlFor="price">Edit harga</label>
                            <br />
                            <input type="number" id="price" {...register("price")} placeholder={d2?.product?.price}/>
                            <p className={styles.error}>{errors.price?.message}</p>
                        </div>
                        <br />
                        <div className={styles.input}>
                            <label htmlFor="discount">Edit diskon</label>
                            <br />
                            <input type="number" id="discount" {...register("discount")} placeholder={d2?.product?.discount}/>
                            <p className={styles.error}>{errors.discount?.message}</p>
                        </div>
                        <br />
                        <div className={styles.input}>
                            <label htmlFor="stock">Edit stok</label>
                            <br />
                            <input type="number" id="stock" {...register("stock")} placeholder={d2?.product?.stock}/>
                            <p className={styles.error}>{errors.stock?.message}</p>
                        </div>
                        <br />
                        <div className={styles.input}>
                            <label htmlFor="metadata">Edit metadata</label>
                            <br />
                            <input type="text" id="metadata" {...register("metadata")} placeholder={d2?.product?.metadata}/>
                            <p className={styles.error}>{errors.metadata?.message}</p>
                        </div>
                        <br />
                        <div className={styles.input}>
                            <label htmlFor="category">Kategori</label>
                            <br />
                            <select {...register("category")}>
                              {d3?.getAllCategory?.length > 0 ?(
                                d3?.getAllCategory?.map((cat: any) =>{return(
                                  <option value={cat?.id} key={cat?.id}>{cat?.name}</option>
                                )})
                              ):
                                <option value="" key="">No Category</option>
                            }
                            
                            </select>
                            <p className={styles.error}>{errors.category?.message}</p>
                        </div>
                        <br />


                      
                        
                        <div className={styles.submitContainer}>
                            <button type='submit' className={styles.submit}>
                                Update Produk
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

export default EditProduct
