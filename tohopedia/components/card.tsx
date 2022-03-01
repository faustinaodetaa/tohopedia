import type { NextPage } from 'next';
import styles from '../styles/card.module.scss';
import Image from 'next/image';

const Card: NextPage = (props) => {
  // const pic = props.pic 
  // const name = props.name
    return(
        <div className={styles.container}>
            <Image src="/twitter.png" alt="picture" width={30} height={30}/>
            <h3>Title</h3>
            <h4>Price</h4>
            <h5>Shop Name</h5>
        </div>
    )
}

export default Card