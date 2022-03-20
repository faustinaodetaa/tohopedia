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
import ImageSlider from '../components/slider';
import { SliderData } from '../components/sliderData';
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

  const TOP_DISCOUNT_PRODUCT = gql`
    query TopDiscountProduct{
      topDiscountProduct{
        id
        name
        discount
        images{
          image
        }
        shop{
          name
        }
        price
        discount
        category{
          name
        }
      }
      
    }
  `

  const {loading: l2, error: e2, data: d2} = useQuery(TOP_DISCOUNT_PRODUCT)




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
      <ImageSlider slides={SliderData}></ImageSlider>

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
                    <Card name={data?.name} price = {data?.price} discount = {data?.price - (data?.discount / 100 * data?.price)}  category =  {data?.category?.name} image = {data.images[0] ? data?.images[0]?.image : '/image.png'} shop = {data?.shop?.name} id={data?.id}></Card>
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
      <ImageSlider slides={SliderData}></ImageSlider>
      
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
              <br />
              <div className={styles.productContainerContent}>
                <h1>Top Discount Products</h1>
                {d2?.topDiscountProduct?.map((d2:any)=>{
                  return(
                    <div className={styles.cardProductContainer}>
                      <Card name={d2?.name} price = {d2?.price} discount = {d2?.price - (d2?.discount / 100 * d2?.price)} disc = {d2?.discount} category =  {d2?.category?.name} image = {d2?.images[0] ? d2?.images[0]?.image : '/image.png'} shop = {d2?.shop?.name} id={d2?.id}></Card>
                    </div>
                    
                  )
                })}

              </div>
              <br />
              <div className={styles.productContainerContent}>
                <h1>All Products</h1>
                {data?.getAllProduct?.map((data:any)=>{
                  return(
                    <div className={styles.cardProductContainer}>
                      <Card name={data?.name} price = {data?.price} discount = {data?.price - (data?.discount / 100 * data?.price)} disc={data?.discount} category =  {data?.category?.name} image = {data.images[0] ? data?.images[0]?.image : '/image.png'} shop = {data?.shop?.name} id={data?.id}></Card>
                    </div>
                  )
                })}

              </div>

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