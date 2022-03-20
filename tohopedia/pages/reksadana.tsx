import { gql, useQuery } from "@apollo/client";
import { NextPage } from "next";
import Footer from "../components/footer";
import Header from "../components/loggedHeader";

const Reksadana: NextPage = () =>{



  return(
    <>
      <Header></Header>
        <div>
          <h3>Reksadana</h3>
        </div>
      <Footer></Footer>
    </>
  )
}

export default Reksadana