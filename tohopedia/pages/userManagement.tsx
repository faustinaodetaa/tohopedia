import { gql, useMutation, useQuery } from "@apollo/client";
import { NextPage } from "next";
import Image from "next/image";
import Router from "next/router";
import Footer from "../components/footer";
import Header from "../components/loggedHeader";
import styles from "../styles/admin.module.scss";

const UserManagement: NextPage = () =>{
  const GET_USERS = gql`
  query Users{
    users{
      id
      username
      picture
      name
      isBlocked
    }
  }
`
  const{loading:l, error:e, data: d} = useQuery(GET_USERS)

  const UPDATE_BLOCK_STATUS = gql`
    mutation UpdateBlockStatus($id:ID!, $isBlocked:Boolean!){
      updateBlockStatus(id:$id, input:{isBlocked:$isBlocked}){
        name
        isBlocked
      }
    }
  `

  const[updateStatus, {loading: l2, error:e2, data:d2}] = useMutation(UPDATE_BLOCK_STATUS)

  async function updateBlockStatus(data:any){
    try{
      await updateStatus({
        variables:{
          id: data,
          isBlocked: true
        }
      })
    }catch(e2){
      console.log(e2)
    }
  }

  async function unblockUser(data:any){
    try{
      await updateStatus({
        variables:{
          id: data,
          isBlocked: false
        }
      })
    }catch(e2){
      console.log(e2)
    }
  }

  if(d2){
    Router.reload()
  }

  if(l || l2){
    return(
      <div>Loading</div>
    )
  }

  return(
    <>
      <Header></Header>
        <div>
          <h3 className={styles.title}>User Management</h3>
          {d?.users?.length > 0 ?(
            d?.users?.map((data:any)=>{
              return(
                <div className={styles.userContainer}>
                  <h4>Username: {data?.username}</h4>
                  <p>Name: {data?.name}</p>
                  <Image src={data?.picture ? data?.picture : '/image.png'} alt="profile" className={styles.img} width={50} height={50}/>
                  <p>Status: {data?.isBlocked == '0' ? <span>Active</span> : <span>Blocked</span>}</p>
                  {data?.isBlocked == '0' ? <button className={styles.button} onClick={()=>updateBlockStatus(data?.id)}>Block User</button> : <button className={styles.button} onClick={()=>unblockUser(data?.id)}>Unblock User</button>}
                  
                </div>
              )
            })
          ): null}
        </div>
      <Footer></Footer>
    </>
  )
}

export default UserManagement