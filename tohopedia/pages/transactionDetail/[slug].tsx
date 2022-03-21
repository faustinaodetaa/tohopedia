import { gql, useQuery } from "@apollo/client";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaAward } from "react-icons/fa";
import Footer from "../../components/footer";
import Header from "../../components/loggedHeader";
import styles from '../../styles/transaction.module.scss';
import Link from 'next/link';

const TransactionDetail: NextPage = () =>{
  const router = useRouter()
  const {query : {id},} = router
  const transactionId = router.asPath.split('/')[2]
  // console.log(transactionId)

  const GET_USER = gql`
    query GetCurrUser{
      getCurrentUser{
        id,
        name
      }
    }
  `
  const {loading: l, error: e, data: d} = useQuery(GET_USER)

  const GET_TRANSACTION = gql`
    query UserTransaction($user:String!){
      userTransaction(user:$user){
        id
        date
        address{
          location
        }
        courier{
          name
        }
      }
    }
  `

  const{loading: l2, error: e2, data:d2} = useQuery(GET_TRANSACTION,{
    variables:{
      user: d?.getCurrentUser?.id
    }
  })

  const GET_TRANSACTION_DETAIL = gql`
    query UserTransactionDetail($transaction:String!){
      userTransactionDetail(transaction:$transaction){
        id
        product{
          id
          name
          images{
            image
          }
          description
          price
          discount
          stock
          shop{
            name
            points
            
          }
          isReviewed
        }
        qty
        isReviewed
      }
    }
  `

  const{loading: l3, error:e3, data:d3} = useQuery(GET_TRANSACTION_DETAIL,{
    variables:{
      transaction: d2?.userTransaction[0]?.id
      
      // d2?.userTransaction?.length > 0 ?(
      //   d2?.userTransaction?.map((d:any)=>{d.id})
      // ) : null
    
    }
    
  })

  const GET_TRANSACTION_BY_ID = gql`
    query UserTransactionById($transaction:String!){
      userTransactionById(transaction:$transaction){
        id
        user{
          name
        }
        date
        courier{
          name
        }
        address{
          location
          city
          phone
          postalCode
          title

        }
      }
    }
  `
  const{loading:l4, error:e4, data:d4} = useQuery(GET_TRANSACTION_BY_ID,{
    variables:{
      transaction: transactionId
    }
  })

  if(l || l2 || l3){
    return(
      <div>Loading</div>
    )
  }
  
  return(
    <>
      <Header></Header>
      <div className={styles.container}>
        <h3>Transaction Detail</h3>
        <p>Selesai</p>
        <p>No. Invoice    {d4?.userTransactionById?.id}</p>
        <p>Tanggal Pembelian    {d4?.userTransactionById?.date}</p>
        <br />
        <h4>Detail Produk</h4>
        {d3?.userTransactionDetail?.length > 0 ?(
                  d3?.userTransactionDetail?.map((d:any)=>{return(
                    <div className={styles.transactionDetailContainer}>

                      <p><FaAward></FaAward>{d?.product?.shop?.name}</p>
                      <Image src={d?.product?.images[0] ? d?.product?.images[0].image : '/image.png'} alt="profile" width={50} height={50}/>
                      
                      <p>{d?.product?.name}</p>
                      <p>{d?.qty} x Rp{d?.product?.price}</p>
                      <p>Total harga Rp {d?.qty * d?.product?.price}</p>
                      <br />
                      <p>Payment Method: Tohopedia Balance</p>
                      <p>Payment Discounts: {d?.product?.discount / 100 * d?.product?.price}</p>
                      {d?.isReviewed == '0'? 
                      <Link href={`/addReview/${d?.product?.id}`}>
                        <a>
                          <button className={styles.button}>Review Barang</button>
                        </a>
                      </Link> : <button className={styles.button}>Sudah di review</button>
                      
                    }
                      
                    </div>

                  )})):null}
        <h4>Info Pengiriman</h4>
        <p><b>Kurir:</b> {d4?.userTransactionById?.courier?.name}</p>
        <p><b>Shipping Address:</b> {d4?.userTransactionById?.address?.title}</p>
        <p>{d4?.userTransactionById?.address?.location},{d4?.userTransactionById?.address?.city}, {d4?.userTransactionById?.address?.postalCode} </p>
      </div>
      <Footer></Footer>
    </>
  )
}

export default TransactionDetail