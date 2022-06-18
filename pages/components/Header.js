import React, {useContext} from 'react';
import { AmazonContext } from '../../context/amazonContext';
import logo from '../../assets/amazon_logo_full.png';
import Image from 'next/image';
import {CgMenuGrido} from 'react-icons/cg'
import {IomdSearch} from 'react-icons/io'
import { FaCoins } from 'react-icons/fa';
import{
    ModalProvider,
    Modal,
    useModal,
    ModalTransition,

} from 'react-simple-hook-modal'

import 'react-simple-hook-modal/dist/styles.css'

const {openModal, isModalOpen, closeModal }= useModal


export const Header=()=> {
  return (
    <div className={styles.container}>
        <div className={styles.logo}>
            <Image
                src={logo}
                alt="Coin"
                className="objectCover"
                height={100}
                width={100}/>

        </div>

        <div className={styles.search}>
            <input
            type='text'
            placeholder='Search Your Assests'
            className={styles.serachInput}/>
            <IomdSearch fontSize={20}/>
        </div>
        <div className={styles.menu}>
            <div className={styles.menuItem}>New Release</div>
            <div className={styles.menuItem}>Featured</div>
            {
                balance ?(
                    <div className={(styles.balance, styles.menuItem)}
                    onClick={openModal}>
                        {balance}
                        <FaCoins className={styles.coins}/>
                        <Modal isOpen = {isModalOpen} transition ={ModalTransition.SCALE}>
                            {/* <ByModal close={closeModal} byTokens= {buyTokens}/> */}
                        </Modal>

                    </div>
                ):(
                    <div className={(styles.balance, styles.menuItem)}>
                        
                    </div>    
                
                )}
        </div>


    </div>
  )
}

// export default Header