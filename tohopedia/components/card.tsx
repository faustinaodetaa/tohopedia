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
}

const Card: FC<ProductProps> = ({id, name, price, category, image, shop}) => {
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
                        <h4>Rp. {price}</h4>
                        <h5>Category: {category}</h5>
                        <p> <FaStore></FaStore> {shop}</p>
                    </div>
                </div>

            </a>
        </Link>          
    )
}

export default Card