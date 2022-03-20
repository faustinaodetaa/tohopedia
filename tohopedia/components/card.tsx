import type { NextPage } from 'next';
import styles from '../styles/card.module.scss';
import Image from 'next/image';
import { FC } from 'react';
import Link from 'next/link';
import { FaCommentAlt, FaStore } from "react-icons/fa";

interface ProductProps{
    name: string
    price: string
    category: string
    image: string
    id: string
    shop: string
    discount:number
    disc: string

}

const Card: FC<ProductProps> = ({id, name, price, category, image, shop, disc, discount}) => {
//   const pic = props.pic 
//   const name = props.name
//   const price = props.name

    return(
        <Link href={`/productDetail/${id}`} key={id}>
            <a>
                <div className={styles.container}>
                    <div className={styles.productContainer}>
                        <Image src={image} alt="picture" width={30} height={30}/>
                        <h3>{name}</h3>
                        
                        <h4 className={styles.strike}>Rp. {price} </h4> 
                        {discount > 0 ?
                        <div>
                            <p className={styles.discount}>{disc}%  off!</p> 
                            <h4>Rp.{discount}</h4>

                        </div>
                            
                            :
                            <p>no disc</p>

                        }
                        <h5>Category: {category}</h5>
                        <p> <FaStore></FaStore> {shop}</p>
                    </div>
                </div>

            </a>
        </Link>          
    )
}

export default Card