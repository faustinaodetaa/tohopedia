import { gql, useQuery } from "@apollo/client";
import { NextPage } from "next";
import Image from "next/image";
import { FaAward, FaCalendar, FaSearch, FaShoppingBag } from "react-icons/fa";
import Footer from "../components/footer";
import LoggedHeader from "../components/loggedHeader";
import styles from '../styles/transaction.module.scss';
import Link from 'next/link';



const Transaction: NextPage = () =>{

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
        product{
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
        }
        qty
      }
    }
  `

  const{loading: l3, error:e3, data:d3} = useQuery(GET_TRANSACTION_DETAIL,{
    variables:{
      transaction: d2?.userTransaction[1]?.id
      
      // d2?.userTransaction?.length > 0 ?(
      //   d2?.userTransaction?.map((d:any)=>{d.id})
      // ) : null
    
    }
    
  })

  if(l || l2 || l3){
    return(
      <div>Loading</div>
    )
  }


  return(
    <>
      <LoggedHeader></LoggedHeader>
      <div className={styles.container}>
        <h3>Daftar Transaksi</h3>
        <input type="text" name="" id="" placeholder="Cari transaksimu disini"/>
        <FaSearch></FaSearch>
        <FaCalendar></FaCalendar>
        <input type="date" name="" id="" placeholder="Pilih Tanggal Transaksi"/>
        <p>Status</p>
        <button>Semua</button>
        <button>Berlangsung</button>
        <button>Berhasil</button>
        <button>Tidak Berhasil</button>
        <div >
          {d2?.userTransaction?.length > 0 ? (
            d2?.userTransaction?.map((data: any)=>{return(
              
              <div >
          <Link href={`/transactionDetail/${data?.id}`}>
          <a>

          
                <div className={styles.top}>
                  <span className={styles.span}><FaShoppingBag></FaShoppingBag>Belanja</span>
                  <span className={styles.span}>Selesai</span>

                  <span className={styles.span}>{data?.date}</span>
                  <span className={styles.span}>{data?.id}</span>
                  </div>
                  {d3?.userTransactionDetail?.length > 0 ?(
                  d3?.userTransactionDetail?.map((d:any)=>{return(
                    <div className={styles.transactionContainer}>
                      <FaAward></FaAward> <span></span>
                      <span>{d?.product?.shop?.name}</span>
                      <br />
                      <Image src={d?.product?.images[0] ? d?.product?.images[0].image : '/image.png'} className={styles.img} alt="profile" width={50} height={50}/>
                      <p>{d?.product?.name}</p>
                      <p>{d?.qty} barang x Rp{d?.product?.price}</p>
                      <p>Total belanja: {d?.qty * d?.product?.price}</p>


                    </div>
                
                
                )})
                ) : null}

                </a>
    </Link>
              </div>

            )})
          ):
          <div></div>
          }
        </div>
      </div>

      <Footer></Footer>
    </>
  )
}

export default Transaction
