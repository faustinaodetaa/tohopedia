import { gql, useQuery } from "@apollo/client";
import { NextPage } from "next";
import Image from "next/image";
import Footer from "../components/footer";
import LoggedHeader from "../components/loggedHeader";
import styles from "../styles/chat.module.scss"
const Chat: NextPage = () => {

  const GET_SHOPS = gql`
    query Shops{
      shops{
        name
        profile
      }
    }
  `
  const {loading:l, error:e, data: d} = useQuery(GET_SHOPS)

  return(
    <>
      <LoggedHeader></LoggedHeader>
        <div>
          <h1 className={styles.title}>Chat</h1>
          <div className={styles.chatContainer}>
            <div className={styles.shopContentContainer}>
              {d?.shops?.length > 0 ?(
                d?.shops?.map((data: any)=>{
                  return(
                    <div className={styles.shopContainer}>
                      <Image src={data?.profile ? data?.profile : '/image.png'} alt="profile" className={styles.img} width={50} height={50}/>
                      <p>{data?.name}</p>
                    </div>

                  )
                })
              ):null}


            </div>

              <div className={styles.chatContentContainer}>
                <p>tes</p>
                <button className={styles.button}>Hai, barang ini ready?</button>
                <button className={styles.button}>Bisa dikirim hari ini?</button>
                <button className={styles.button}>Terima kasih!</button>
              </div>

          </div>
        </div>
      <Footer></Footer>
    
    </>

    

  )
}

export default Chat