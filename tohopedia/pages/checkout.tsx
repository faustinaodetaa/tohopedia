import { gql, useMutation, useQuery } from "@apollo/client"
import { yupResolver } from "@hookform/resolvers/yup";
import { NextPage } from "next"
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaStore } from "react-icons/fa";
import Footer from "../components/footer";
import LoggedHeader from "../components/loggedHeader"
import styles from '../styles/checkout.module.scss';
let flag = false;

const Checkout: NextPage = () =>{
  const [count, setState] = useState(0);
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

  const{loading: l2, error: e2, data: d2} = useQuery(GET_ADDRESS,{
    variables:{
      user: d?.getCurrentUser?.id
    }
  })

  const GET_CART_BY_USER = gql`
    query GetCartByUser($user:String!){
      getCartByUser(user:$user){
        id
        product{
          id
          name
          images{
            image
          }
          shop{
            name
          }
          price
          discount
        }
        qty
      }
      }
  `
  const {loading: l3, error: e3, data: d3} = useQuery(GET_CART_BY_USER,{
    variables:{
      user: d?.getCurrentUser?.id

    }
  })

  const GET_COURIERS = gql`
      query Couriers{
        couriers{
          id
          name
          price
          estimatedTime
        }
      }
    `

  const{loading: l4, error: e4, data:d4} = useQuery(GET_COURIERS)
// console.log(d4?.couriers[0]?.id)
  const GET_USER_VOUCHER = gql `	
  query UserVouchers($user:String!){
    userVouchers(user:$user){
      voucher{
        id
        name
        discount
      }
    }
  }
`

  const GET_GLOBAL_VOUCHER = gql`
  query GlobalVoucher{
    globalVoucher{
      name
      description
      discount
      tnc
      startTime
      endTime
      isGlobal
    }
  }
`
const {loading: l5, error: e5, data:d5} = useQuery(GET_USER_VOUCHER,{
  variables:{
    user: d?.getCurrentUser?.id,
  }
})
const{loading: l10, error: e10, data:d10} = useQuery(GET_GLOBAL_VOUCHER)

console.log(d5?.userVouchers[0]?.voucher?.id)
  const CREATE_TRANSACTION = gql`
    mutation CreateTransaction($user:String!, $address:String!, $courier:String!, $voucher: String!){
      createTransaction(input:{user:$user, address:$address, courier:$courier, voucher:$voucher}){
        id
      }
    }
  `
  const[addTransaction, {loading: l6, error: e6, data:d6}] = useMutation(CREATE_TRANSACTION)

  const CREATE_TRANSACTION_DETAIL = gql`
    mutation CreateTransactionDetail($transaction:String!, $product:String!, $qty:Int!){
      createTransactionDetail(input:{transaction:$transaction, product:$product, qty:$qty}){
        product{
          name
        }
      }
    }
  `
  const[addTransactionDetail, {loading: l7, error:e7, data:d7}] = useMutation(CREATE_TRANSACTION_DETAIL)

  const UPDATE_BALANCE = gql`
    mutation UpdateBalance($id:ID!, $balance:Int!){
      updateBalance(id:$id, input:{balance:$balance}){
        id,
        balance
      }
    }
  `
  const[updateUserBalance,{loading:l8, error:e8,data:d8}] = useMutation(UPDATE_BALANCE)

  const DELETE_CART = gql`
    mutation DeleteCart($id:ID!){
      deleteCart(id:$id){
        product{
          name
        }
      }
    }
  `
  const[deleteCart,{loading:l9, error:e9,data:d9}] = useMutation(DELETE_CART)


  async function createTransaction(data:any) {
    try{
      console.log(data.voucher)
      await addTransaction({
        variables:{
          user: d?.getCurrentUser?.id,
          address: data.address,
          courier: data.courier,
          voucher: data.voucher
        }
      })
    }catch(error){
      console.log(error)
    }

    try{
      console.log(data.total)
      await updateUserBalance({
        variables:{
          id: d?.getCurrentUser?.id,
          balance: -data.total
        }
      })
    }catch(error){
      console.log(error)
    }
  }
   if (!flag && d6){
     console.log(flag)
    {d3?.getCartByUser?.length > 0 ? (d3?.getCartByUser?.map((data:any)=>{addTransactionDetail({
      variables:{
        transaction: d6?.createTransaction?.id,
        product: data?.product?.id,
        qty: data?.qty
    }})})) : null}
    flag = true;

  }




  const{register, handleSubmit, formState:{errors}} = useForm()
let totalDisc = 0;
let subtotal = 0
  {d3?.getCartByUser?.map((data:any)=>{return(
    totalDisc += data?.product?.discount / 100 * data?.product?.price
  )})}
  {d3?.getCartByUser?.map((data:any)=>{return(
    subtotal +=(data?.product?.price - (data?.product?.discount / 100 * data?.product?.price)) * (data?.qty)

  )})}
  console.log(totalDisc)
  console.log(subtotal)



  if(l || l2 || l3 || l4){
    return(
      <div>Loading</div>
    )
  }
  

  return(
    <>
      <LoggedHeader></LoggedHeader>
      <form onSubmit={handleSubmit(createTransaction)}>
      <div className={styles.container}>
        <h1>Checkout</h1>
        <div className={styles.addressContainer}>
          <h3>Pilih Alamat Pengiriman</h3>
              <div className={styles.addresses}>

              <div className={styles.addressContent}>
                  <div className={styles.input}>
                    <label htmlFor="address">Alamat</label>
                    <br />
                    <select {...register("address")} className={styles.button}>
                      {d2?.addresses?.length > 0 ?(
                        d2?.addresses?.map((cat: any) =>{return(
                          <option value={cat?.id} key={cat?.id}>{cat?.title} {cat.location} {cat.city}</option>
                        )})
                      ):
                        <option value="" key="">No ADdress </option>
                    }
                    
                    </select>
                    <p className={styles.error}>{errors.address?.message}</p>
                </div>
              </div>
            </div>
            </div>
            {d3?.getCartByUser?.length > 0 ? (d3?.getCartByUser?.map((data:any)=>{
              return(
                <div className={styles.productContainer}>
                  <div className={styles.productContentContainer}> 
                    <h5><FaStore></FaStore>{data?.product?.shop?.name}</h5>
                    <div className={styles.productContent}>
                      <Image src={data ? data?.product?.images[0]?.image : '/image.png'} alt="picture" className={styles.img} width={100} height={50} />
                      <div>

                        <p>{data?.product?.name} x{data?.qty}</p>
                        {/* <p>Rp.{data?.product?.price}</p> */}
                        <h4 className={styles.strike}>Rp. {data?.product?.price} </h4> 
                      {data?.product?.discount > 0 ?
                      <div>
                          <p className={styles.discount}>{data?.product?.discount}%  off!</p> 
                          <h4>Rp.{data?.product?.price - (data?.product?.discount / 100 * data?.product?.price)}</h4>
                      </div>                 
                          :
                          <p>no disc</p>

                      }
                      </div>
                      
                    </div>

                    {/* {d3?.getCartByUser?.length > 0 ? (d3?.getCartByUser?.map((data:any)=>{}} */}

                  </div>                 
                </div>
              )
            })):
            <div>No Items in Cart</div>
          }
                    <div className={styles.shipping}>
                    <h3>Pilih Pengiriman</h3>
                      <div className={styles.shippingContent}>
                      <div className={styles.input}>
                            <label htmlFor="courier">Pengiriman</label>
                            <br />
                            <select {...register("courier")}>
                              {d4?.couriers?.length > 0 ?(
                                d4?.couriers?.map((cat: any) =>{return(
                                  <option value={cat?.id} key={cat?.id}>{cat?.name} - IDR{cat?.price}</option>
                                )})
                              ):
                                <option value="" key="">No Shipping </option>
                            }
                            
                            </select>
                            <p className={styles.error}>{errors.courier?.message}</p>
                        </div>
                      </div>

                    </div>
                    <div className={styles.voucherContainer}>
                      <h3>Vouchers</h3>
                      {/* <input type="number" onChange={(e) => setState(e.target.valueAsNumber)}/>  */}
                      <div className={styles.input}>
                            <label htmlFor="vouchers">User Voucher</label>
                            <br />
                            <select {...register("voucher")}>
                              {d5?.userVouchers?.length > 0 ?(
                                d5?.userVouchers?.map((cat: any) =>{return(
                                  <option value={cat?.voucher?.id} key={cat?.voucher?.id}>{cat?.voucher?.name} - {cat?.voucher?.discount}%</option>
                                )})
                              ):
                                <option value="" key="">No Category</option>
                            }
                            
                            </select>
                            <br />
                            <label htmlFor="vouchers">Global Voucher</label>
                            <br />
                            <select>
                              {d10?.globalVoucher?.length > 0 ?(
                                d10?.globalVoucher?.map((cat: any) =>{return(
                                  <option value={cat?.id} key={cat?.id}>{cat?.name} - {cat?.discount}%</option>
                                )})
                              ):
                                <option value="" key="">No Category</option>
                            }
                            
                            </select>
                            <p className={styles.error}>{errors.voucher?.message}</p>
                        </div>
                    </div>
            <div>
              <h3>Total Discount Price</h3>
              
              <p>IDR {totalDisc}</p>
              <h3>Subtotal</h3>
              <p>IDR {subtotal}</p>

            </div>
   
              <input type="hidden" {...register("total")} value={subtotal} />
            <button type="submit" className={styles.button}>Pay</button>

      </div>
      </form>
      <Footer></Footer>
    </>
  )
}

export default Checkout