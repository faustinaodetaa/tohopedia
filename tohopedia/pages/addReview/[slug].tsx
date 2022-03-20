import { NextPage } from "next";
import { useRouter } from "next/router";
import Footer from "../../components/footer";
import Header from "../../components/loggedHeader";

const AddReview: NextPage = () =>{
  const router = useRouter()
  const {query : {id},} = router
  const productId = router.asPath.split('/')[2]
  return(
    <>
    <Header></Header>
      <div>
        <h3>Review</h3>
      </div>

    <Footer></Footer>
    </>
  )
}

export default AddReview