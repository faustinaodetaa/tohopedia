import { gql, useQuery } from "@apollo/client";
import { NextPage } from "next";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import Footer from "../components/footer";
import Header from "../components/loggedHeader";
import styles from '../styles/dashboard.module.scss';

const Dashboard: NextPage = () =>{
  
  const SOLD_PER_CATEGORY = gql`
    query SoldPerCat{
      soldPerCategory{
        name
        count
      }
    }
  `

const VOUCHER_PER_TRANSACTION = gql`
    query VoucherPerTrans{
      voucherPerTransaction{
        name
        count
      }
    }
  `
  const TRANS_PER_SHIPPING = gql`
    query transPerShipping {
      transactionPerShipping {
        name
        count
      }
    }
  `

  const {loading: l1, data: d1, error: e1} = useQuery(SOLD_PER_CATEGORY)
  const {loading: l2, data: d2, error: e2} = useQuery(VOUCHER_PER_TRANSACTION)
  const { loading: l3, data: d3, error: e3 } = useQuery(TRANS_PER_SHIPPING)

  let shippings = []
  let vouchers = []
  let categories = []

  if(d1 && d1.soldPerCategory){
    categories = d1.soldPerCategory.map((c: any)=>({ name: c.name, Transactions: c.count}))
  }

  if(d2 && d2.voucherPerTransaction){
    vouchers = d2.voucherPerTransaction.map((v: any) => ({ name: v.name, Transactions: v.count}))
  }

  if (d3 && d3.transactionPerShipping) {
    shippings = d3.transactionPerShipping.map((s: any) => ({ name: s.name, Transactions: s.count }))
  }

  if(l1 || l2 || l3){
    return(
      <div>Loading</div>
    )
  }


  return(
    <>
      <Header></Header>
        <div className={styles.container}>
          <h1 className={styles.title}>Dashboard</h1>
          <div className={styles.visualizationContainer}>
            <h2 className="section-title">Shipping Vendors&apos; Transaction Count</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie dataKey="Transactions" data={shippings} cx="50%" cy="50%" outerRadius={100} fill="#3eab00" label />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <br />
              <h2 className="section-title">Voucher Per Transaction Count</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie dataKey="Transactions" data={vouchers} cx="50%" cy="50%" outerRadius={100} fill="#FF0000" label />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <br />
              <h2 className="section-title">Sold Per Category Transaction Count</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie dataKey="Transactions" data={categories} cx="50%" cy="50%" outerRadius={100} fill="#0000FF" label />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
          </div>
        </div>
      <Footer></Footer>
    </>
  )
}

export default Dashboard