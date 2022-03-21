import { yupResolver } from "@hookform/resolvers/yup";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Footer from "../../components/footer";
import Header from "../../components/loggedHeader";
import styles from '../../styles/review.module.scss';
import * as yup from "yup"
import { gql, useMutation } from "@apollo/client";

let flag = false;
const AddReview: NextPage = () =>{
  const router = useRouter()
  const {query : {id},} = router
  const productId = router.asPath.split('/')[2]

  const CREATE_REVIEW = gql`
    mutation CreateReview($score:Int!, $description:String!, $image: String!, $anonymous: Boolean!, $product:String!){
      createReview(input:{score:$score, description:$description,image:$image, anonymous:$anonymous, product:$product}){
        id
      }
    }
  `

  const[addReview, {loading: l, error: e, data: d}] = useMutation(CREATE_REVIEW)

  const UPDATE_STATUS = gql`
    mutation UpdateStatus($product:String!){
      updateStatus(product:$product){
        isReviewed
      }
    }
  
  `
  const[updateReviewStatus, {loading:l2, error:e2, data:d2}] = useMutation(UPDATE_STATUS)

  const schema = yup.object({
    score: yup.string().required(),
    description: yup.string().required(),
}).required()

    const{register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema) 
    })

    let profilepic:any
    const handleImage = async (e: any) => {
      const image = e.target.files[0]
      profilepic = (await convertToBase64(image)) as string
  
      console.log(profilepic) 
    }

    async function onSubmit(data:any){
      console.log(data.score)
      console.log(data.description)
      console.log(data.anonymous)
      console.log(productId)
      console.log(profilepic)

      try{
        await addReview({
          variables:{
            score: data.score,
            description: data.description,
            image: profilepic,
            anonymous: data.anonymous,
            product: productId
          }
        })
      }catch(e){
        console.log(e)
      }
    }

    if(!flag && d){
      console.log("review added")
      updateReviewStatus({
        variables:{
          product: productId
        }
      })
      flag = true;
    }

  return(
    <>
    <Header></Header>
      <div>
        <h3 className={styles.title}>Review</h3>
        <div className={styles.reviewContainer}>

          <form onSubmit={handleSubmit(onSubmit)}>  
            <div className={styles.input}>
              <label htmlFor="score">Skor</label>
              <br />
              <input type="number" id="score" {...register("score")}/>
              <br />
              <p className={styles.error}>{errors.score?.message}</p>
            </div>   
            <br />       
              <div className={styles.input}>
                  <label htmlFor="description">Deskripsi</label>
                  <br />
                  <input type="text" id="description" {...register("description")}/>
                  <br />
                  <p className={styles.error}>{errors.description?.message}</p>
              </div>
              <br />
              <div className={styles.input}>
                <label htmlFor="picture">Foto</label>
                <br />
                <input type="file" id="picture" name="picture" onChange={handleImage} />
                <br />
              </div>
              <br />
              <div className={styles.input}>

                <input type="checkbox" {...register("anonymous")}  id="anonymous" />
                <label htmlFor="anonymous">Anonymous?</label>

                <p className={styles.error}></p>
              </div>
              <br />
              <div className={styles.submitContainer}>
                  <button type='submit' className={styles.button}>
                      Submit Review
                  </button>
              </div>
          </form>
        </div>
      </div>

    <Footer></Footer>
    </>
  )
}

export default AddReview

export const convertToBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = () => {
      resolve(fileReader.result)
    }
    fileReader.readAsDataURL(file)

    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}