import styles from "../styles/featured.module.scss";
import Image from "next/image";
import { useState } from "react";


const Featured = () => {
  const [index, setIndex] = useState(0);
  const images = [
    "/promo1.jpg",
    "/promo2.jpg",
    "/promo3.jpg",
    "/promo4.jpg",
    "/promo5.jpg",
    "/promo6.jpg",
    "/promo7.jpg",
    "/promo8.jpg",
    "/promo9.jpg",
    "/promo10.jpg",
    "/promo11.jpg",
    "/promo12.jpg",
    "/promo13.jpg",
    "/promo14.jpg",
    "/promo15.jpg",

  ];



  const handleArrow = (direction:any) =>{
      if(direction==="l"){
          setIndex(index !== 0 ? index-1 : 2)
      }
      if(direction==="r"){
          setIndex(index !== 2 ? index+1 : 0)
      }
  }

  return (
    <div className={styles.container}>
      <div className={styles.arrowContainer} style={{ left: 0 }} onClick={()=>handleArrow("l")}>
        <Image src="/img/arrowl.png" alt="" layout="fill" objectFit="contain"/>
      </div>
      <div className={styles.wrapper} style={{transform:`translateX(${-100*index}vw)`}}>
        {images.map((img, i) => (
          <div className={styles.imgContainer} key={i}>
            <Image src={img} alt="" layout="fill" objectFit="contain" />
          </div>
        ))}
      </div>
      <div className={styles.arrowContainer} style={{ right: 0 }} onClick={()=>handleArrow("r")}>
        <Image src="/img/arrowr.png" layout="fill" alt="" objectFit="contain"/>
      </div>
    </div>
  );
};

export default Featured;