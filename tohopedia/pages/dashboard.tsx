import { NextPage } from "next";
import Footer from "../components/footer";
import Header from "../components/loggedHeader";

const Dashboard: NextPage = () =>{
  return(
    <>
      <Header></Header>
        <div>
          <h3>Dashboard</h3>
        </div>
      <Footer></Footer>
    </>
  )
}

export default Dashboard