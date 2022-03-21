import { gql, useQuery } from "@apollo/client";
import { NextPage } from "next";
import Footer from "../components/footer";
import Header from "../components/loggedHeader";
import styles from '../styles/chat.module.scss';

const Reksadana: NextPage = () =>{



  return(
    <>
      <Header></Header>
        <div>
          <h3 className={styles.title}>Reksadana</h3>
        </div>
      <Footer></Footer>
    </>
  )
}

export default Reksadana