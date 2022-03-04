import type { NextPage } from 'next';
import styles from '../styles/home.module.scss';
import LoggedHeader from '../components/loggedHeader';
import Header from '../components/header';
import Footer from '../components/footer';
import { FaCommentAlt } from "react-icons/fa";
import { getCookie } from 'cookies-next';
import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import Card from '../components/card';
import React, { useState, useEffect, useMemo } from 'react';
import {Pagination} from '../components/pagination'
import axios from 'axios';
const Home: NextPage = () => {
  
  const GET_ALL_PRODUCT = gql `
    query GetAllProduct{
      getAllProduct{
        id
        name
        description
        price
        discount
        stock
        category{
          name
        }
        shop{
          name
        }
        images{
          id
          image
        }
      }
    }
  `

  const GET_ALL_CATEGORY = gql`
    query GetAllCategory{
    getAllCategory{
      name
    }
  }
  `

  const {loading: l, error: e, data: d} = useQuery(GET_ALL_CATEGORY)

  const {loading, error, data} = useQuery(GET_ALL_PRODUCT)

  console.log(data)

    const [page, setPage] = useState(1);
    const totalContent = 10;
    const count =data?.getAllProduct?.length
    const totalPages = Math.ceil(count / totalContent)
    const handlePages = (updatePage: number) => setPage(updatePage);

    if(loading || l){
      return(
        <div>Loading</div>
      )
    }

    return getCookie('currUser') === undefined?(
      <>
      <Header></Header>
      <div className={styles.sideContainer}>
          <h2>Filter</h2>
        <div className={styles.productContainer}>
          <div className={styles.side}>
              <ul className={styles.sideList}>
                {d?.getAllCategory?.length > 0 ? (
                  d?.getAllCategory?.map((cat:any) => {return(
                    <li>
                      <div className={styles.category}>{cat?.name}</div>
                    </li>

                  )})
                ):  null}
              </ul>
            </div>
            <div className={styles.productCard}>
              {data?.getAllProduct?.map((data:any)=>{
                return(
                  <div className={styles.cardProductContainer}>
                    <Card name={data?.name} price = {data?.price} category =  {data?.category?.name} image = {data.images[0] ? data?.images[0]?.image : '/image.png'} shop = {data?.shop?.name} id={data?.id}></Card>
                  </div>
                )
              })}

            </div>


        </div>
      
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        totalContent={totalContent}
        handlePagination={handlePages}
        count={count}
      />
        
      <Footer></Footer>
      </>
        
    ) : (
      <>
      <LoggedHeader></LoggedHeader>
      
      <div className={styles.sideContainer}>
          <h2>Filter</h2>
        <div className={styles.productContainer}>
          <div className={styles.side}>
              <ul className={styles.sideList}>
                {d?.getAllCategory?.length > 0 ? (
                  d?.getAllCategory?.map((cat:any) => {return(
                    <li>
                      <div className={styles.category}>{cat?.name}</div>
                    </li>

                  )})
                ):  null}
              </ul>
            </div>
            <div className={styles.productCard}>
              {data?.getAllProduct?.map((data:any)=>{
                return(
                  <div className={styles.cardProductContainer}>
                    <Card name={data?.name} price = {data?.price} category =  {data?.category?.name} image = {data.images[0] ? data?.images[0]?.image : '/image.png'} shop = {data?.shop?.name} id={data?.id}></Card>
                  </div>
                )
              })}

            </div>


        </div>
      
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        totalContent={totalContent}
        handlePagination={handlePages}
        count={count}
      />
      <Footer></Footer>
      </>
    )
    
}

export default Home