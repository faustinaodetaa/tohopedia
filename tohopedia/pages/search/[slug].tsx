import { gql, useQuery } from "@apollo/client";
import { getCookie } from "cookies-next";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaAward } from "react-icons/fa";
import Card from "../../components/card";
import Footer from "../../components/footer";
import Header from "../../components/header";
import LoggedHeader from "../../components/loggedHeader";
import styles from '../../styles/search.module.scss';

const Search: NextPage = () =>{
  const router = useRouter()
  const {query : {id},} = router
  const keyword = router.asPath.split('/')[2]
  console.log(keyword)

  const SEARCH_PRODUCT = gql`
    query SearchByName($name:String!){
      search(name:$name){
        id
        name
        images{
          image
        }
        description
        price
        discount
        stock
        category{
          name
        }
        shop{
          id
          name
        }
      }
    }
  `
  const{loading:l, error: e, data:d} = useQuery(SEARCH_PRODUCT,{
    variables:{
      name: keyword
    }
  })

  const SHOP_BY_ID = gql`
    query ShopById($id: ID!){
      shopById(id:$id){
        name,
        address,
        phone,
        slogan,
        description,
        profile,
        openHour,
        closeHour,
        isOpen,
        points
      }
    }
  `
  const{loading: l2, error:e2, data:d2} = useQuery(SHOP_BY_ID,{
    variables:{
      id: d?.search[0]?.shop?.id
    }
  })

  const GET_PRODUCT_FROM_SHOP = gql`
    query GetThreeProductByShop($shop:String!){
      getThreeProductByShop(shopID:$shop){
        id
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
          name
          profile
        }
      }
    }
  `
  const{loading: l3, error: e3, data: d3} = useQuery(GET_PRODUCT_FROM_SHOP,{
    variables:{
      shop: d?.search[0]?.shop?.id

    }
  })

  if(l || l2){
    return(
      <div>Loading</div>
    )
  }

  return getCookie('currUser') === undefined?(
    <>
      <Header></Header>
      <h3>Hasil pencarian '{keyword}'</h3>
      {d?.search?.map((data:any)=>{
        return(
          <div>
            <Card category={data?.category?.name} disc={data?.discount} discount={data?.price - (data?.discount / 100 * data?.price)} id={data?.id} image = {data?.images[0] ? data?.images[0]?.image : '/image.png'} name={data?.name} price={data?.price} shop={data?.shop?.name}></Card>
          </div>
        )
      })}
      <Footer></Footer>
    </>

   
  ) :(
    <>
      <LoggedHeader></LoggedHeader>
      <h3 className={styles.title}>Hasil pencarian '{keyword}'</h3>
            <div className={styles.container}>
              <div className={styles.shopContainer}>
              <Link href={`/shopDetail/${d?.search[0]?.shop?.id}`}>
                <a>
                  <h4><FaAward></FaAward>{d2?.shopById?.name}</h4>
                  <Image src={d2?.shopById?.profile ? d2?.shopById?.profile : '/image.png'} alt="profile" className={styles.img} width={50} height={50}/>
                  <br />
                  <i>"{d2?.shopById?.slogan}"</i>
                  <p>Shop Description: {d2?.shopById?.description}</p>


                </a>
              </Link>

              </div>

              <div className={styles.productContainerContent}> 
                <h5>Product From Shop</h5>
              {d3?.getThreeProductByShop?.map((data:any)=>{
            return(
              <div className={styles.cardProductContainer}>
                <Card category={data?.category?.name} disc={data?.discount} discount={data?.price - (data?.discount / 100 * data?.price)} id={data?.id} image = {data?.images[0] ? data?.images[0]?.image : '/image.png'} name={data?.name} price={data?.price} shop={data?.shop?.name}></Card>
              </div>
            )
          })}
              </div>

            </div>
        <div className={styles.productContainerContent}>
          {d?.search?.map((data:any)=>{
            return(
              <div className={styles.cardProductContainer}>
                <Card category={data?.category?.name} disc={data?.discount} discount={data?.price - (data?.discount / 100 * data?.price)} id={data?.id} image = {data?.images[0] ? data?.images[0]?.image : '/image.png'} name={data?.name} price={data?.price} shop={data?.shop?.name}></Card>
              </div>
            )
          })}

        </div>
      <Footer></Footer>

    </>
  )
}

export default Search