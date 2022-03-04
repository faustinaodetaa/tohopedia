import type { NextPage } from 'next';
import styles from '../styles/footer.module.scss';
import Image from 'next/image';

const Footer: NextPage = () => {
    return(
        <div className={styles.container}>
            <footer className={styles.footerContainer}>
              <li className={styles.list}>
                <div className={styles.titles}>
                <ul>
                  <b>Tokopedia</b>
                </ul>
                <ul> 
                  <a href="">About Tokopedia</a>
                </ul>
                <ul>
                  <a href="">Intellectual Property Rights</a>
                </ul>
                <ul>
                  <a href="">Career</a>
                </ul>
                <ul>
                  <a href="">Blog</a>
                </ul>
                <ul>
                  <a href="">Bridestory</a>
                </ul>
                <ul>
                  <a href="">Tokopedia Parents</a>
                </ul>
                <ul>
                  <a href="">Mitra Blog</a>
                </ul>
                <ul>
                  <a href="">Tokopoints</a>
                </ul>
                <ul>
                  <a href="">Tokopedia Affiliate Program</a>
                </ul>
                <ul>
                  <a href="">Tokopedia B2B Digital</a>
                </ul>
               
                </div>
                <div>
                  <ul>
                    <b>Buy</b>
                  </ul>
                  <ul>
                  <a href="">Bill & Top Up</a>
                </ul>
                <ul>
                  <a href="">Trade In Handphone</a>
                </ul>
                <ul>
                  <a href="">Tokopedia COD</a>
                </ul>
                
                  <ul>
                    <b>Sell</b>
                  </ul>
                  <ul>
                  <a href="">Seller Education Centre</a>
                </ul>
                <ul>
                  <a href="">Mitra Toppers</a>
                </ul>
                <ul>
                  <a href="">Register Official Store</a>
                </ul>
                </div>
                <div>
                  <ul>
                    <b>Guide and Help</b>
                  </ul>
                  <ul>
                  <a href="">Tokopedia Care</a>
                </ul>
                <ul>
                  <a href="">Terms and Condition</a>
                </ul>
                <ul>
                  <a href="">Privacy</a>
                </ul>
                <ul>
                  <b>Follow Us</b>
                </ul>
                <div className={styles.social}>
                  <ul>
                    <a href="https://www.facebook.com/tokopedia/">
                      <Image src="/facebook.png" alt="" width={30} height={30}/>
                    </a>
                  </ul>
                  <ul>
                    <a href="https://www.instagram.com/tokopedia/">
                      <Image src="/instagram.png" alt="" width={30} height={30}/>
                    </a>
                  </ul>
                  <ul>
                    <a href="https://www.pinterest.com/tokopedia/">
                      <Image src="/pinterest.png" alt="" width={30} height={30}/>
                    </a>
                  </ul>
                  <ul>
                    <a href="https://www.twitter.com/tokopedia/">
                      <Image src="/twitter.png" alt="" width={30} height={30}/>
                    </a>
                  </ul>
                </div>
                
                </div>
                <ul className={styles. rightNav}>
                  <Image src="/footer.jpg" alt="" width={200} height={100}/>
                  <p>&copy; 2009-2021, PT Tohopedia</p>
                <button className={styles.buttonSecondary}>Indonesia</button>
                <button className={styles.buttonSelected}>English</button>
                </ul>

              </li>
              
            </footer>
             
        </div>
    )
}

export default Footer