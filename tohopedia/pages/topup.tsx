import { gql, useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import Footer from "../components/footer";
import LoggedHeader from "../components/loggedHeader";
import styles from "../styles/topup.module.scss"
import * as yup from "yup"
import Router from "next/router";

let flag = false
const Topup: NextPage = () =>{
  // console.log(Math.floor(Math.random() * 10))
  var id = Math.random().toString(36).substring(5)
  console.log(id)

  const UPDATE_BALANCE = gql`
    mutation UpdateBalance($id:ID!, $balance:Int!){
      updateBalance(id:$id, input:{balance:$balance}){
        id
      }
    }
  `
  const GET_USER = gql`
    query GetCurrUser{
      getCurrentUser{
        id,
        name
      }
    }
  `

  const[topup, {loading:l, error: e, data:d}] = useMutation(UPDATE_BALANCE)
  const{loading:l2, error:e2, data:d2} = useQuery(GET_USER)

  const schema = yup.object({
    topup: yup.string().required(),
}).required()
  const{register, handleSubmit, formState:{errors}} = useForm({
    resolver: yupResolver(schema)
})

async function showCode(){
  Router.reload()
}

async function onSubmit(){
  let inputTopup = document.getElementById("code").value
  console.log(flag)

  console.log(inputTopup)
  if(inputTopup == id){
    flag =true
  }
  console.log(flag)
  }
  if(flag){
    topup({
          variables:{
            id: d2?.getCurrentUser?.id,
            balance: document.getElementById("topup").value
          }
        })
        flag = false;
      
  }

  // const target = document.getElementById("target")
  // const btn = document.getElementById("first-button")
  // btn?.onclick = function(){
  //   if(target?.style.display !== "none"){
  //     target?.style.display == "none"
  //   }else{
  //     target?.style.display == "block"

  //   }
  // }
  
  
  return(
    <div>
      <LoggedHeader></LoggedHeader>
        <div>
          <h1 className={styles.title}>Top Up</h1>
        </div>

          <input type="number" id="topup" placeholder="Input top up nominal" {...register("topup")}/>
          <button type="submit" id="first-button" className={styles.button} onClick={()=>showCode()}>Top Up</button>
          <div className={styles.code} id="target">
            <p>Unique Code</p>
            <p>{id}</p>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="">Input unique code above:</label>
              <input type="text" id="code" {...register("code")}/>
              <button type="submit" className={styles.button} >Submit</button>
            </form>
          </div>
        
      <Footer></Footer>
    </div>
  )
}

export default Topup