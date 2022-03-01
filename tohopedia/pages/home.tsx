import type { NextPage } from 'next';
import styles from '../styles/home.module.scss';
import LoggedHeader from '../components/loggedHeader';
import Header from '../components/header';
import Footer from '../components/footer';
import React from 'react'
import { FaCommentAlt } from "react-icons/fa";
import { getCookie } from 'cookies-next';

const Home: NextPage = () => {
    return getCookie('currUser') === undefined?(
      <>
      <Header></Header>
      <Footer></Footer>
      </>
        // <>
        // <LoggedHeader/>
        // <div className={styles.container}>
        //   <h1>Filter</h1>
        //   <FaCommentAlt></FaCommentAlt>
        //   <div className={styles.card}>
        //     <h5>Product Name</h5>
        //     <p>Price</p>
        //     <p>Location</p>
        //     <p></p>
        //   </div>
        // </div>
        // <Footer/>
        //   </>
    ) : (
      <>
      <LoggedHeader></LoggedHeader>
      <Footer></Footer>
      </>
    )
}

export default Home