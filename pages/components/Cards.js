import React, {useContext} from 'react'
import Card from './Card'
import { AmazonContext } from '../../context/amazonContext'

const styles={
    container: `h-full w-full flex flex-col ml-[20px] -mt-[20px]`,
    title: `text-xl font-bolder mb-[20px] mt-[30px]  ml-[30px]`,
    cards: `flex items-center  flex-wrap gap-[80px]`,    
}



const Cards=()=> {

    const {assets}= useContext(AmazonContext)
    
    console.log(assets)    
  return (
    <div className={styles.container}>
        <div className={styles.title}> New Release</div>
        <div className={styles.cards}>
            {assets.map((item)=>{
              //  let asset = item.attributes
               return <Card key={item.objectId} item={item.attributes}/>
            })}        
        </div>
        
    </div>
  )
}

export default Cards