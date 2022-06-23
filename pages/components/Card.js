import React, {useContext} from 'react'
import {AmazonContext} from '../../context/amazonContext'
import Image from 'next/image'
import { FaCoins } from 'react-icons/fa'


const styles={
    cardContainer: `flex flex-col`,
    card: `h-[250px] w-[190px] rounded-3xl flex cursor-pointer transition-all duration-300  hover:scale-105 hover:shadow-xl overflow-hidden border  shadow-xl border-4 border-[#fb9701]`,
    cardTitle: `text-xl font-bold flex text-center w-full flex-1 justify-center mt-[10px]`,
    price: `text-md font-bold flex justify-center`,
    coins: `ml-[10px]`,
}
const Card=({item})=> {
  const loaderProp =({ src }) => {
    return src;
}

  const{ buyAssets }= useContext(AmazonContext)
  return (
    <div
     className={styles.cardContainer}
     onClick={()=> buyAssets(item.price, item)

     } 
    > 
        <div className={styles.card}>
            <Image
                src = {item?.src} 
                className='object-cover object-center'
                width={190}
                height={250}
                alt='product'
                loader={loaderProp}/>
        </div>
        <div className={styles.cardTitle}>{item?.name}</div>
        <div className={styles.price}>
            {item?.price} AC <FaCoins className={styles.coins}/>
        </div>
    </div>
  )
}

export default Card