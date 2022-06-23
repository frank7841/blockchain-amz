import { createContext, useState, useEffect  } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { frankyAbi, frankyCoinAddress } from "../lib/constants";
import {ethers} from 'ethers'
export const AmazonContext = createContext()

export const AmazonProvider =({children}) =>{
    const [nickname, setNickname] = useState('')
    const [username, setUsername] = useState('')
    const [assets, setAssets]=useState([])
    const [currentAccount, setCurrentAcount]= useState('')
    const [tokenAmount,setTokenAmount ]=useState('')//ctr hw many tokens wanna req
    const[amountDue, setAmountDue]= useState('')
    const [etherScanLink, setEtherScanLink]=useState('');
    const[isLoading, setIsLoading]= useState(false);
    const[balance, setBalance]=useState('');
    const [recentTransactions, setRecentTransactions]=useState([]);
    const [ownedAssets, setOwnedAssets]=useState([])
    
    const {
        authenticate,
        isAuthenticated,
        enableWeb3,
        Moralis,
        user,
        isWeb3Enabled,
  } = useMoralis()


  const{
      data:assetsData,
      error:assetsdataError,
      isLoading: assetsDataIsLoading,
     }=useMoralisQuery('assets')

     const{
        data:userData,
        error:userDataError,
        isLoading: userDataIsLoading,
       }=useMoralisQuery('_User')


       const listenToUpdates = async() => {
        let query = new Moralis.Query('EthTransactions')
        let subscription = await query.subscribe()
        console.log("Listenning")
        subscription.on('update', async object => {
          console.log('New Transactions')
          console.log(object)
          setRecentTransactions([object])
        })
      }


    useEffect(()=>{
       (async function(){
           await enableWeb3()
           await getAssets()
           await getOwnedAssets()
       })()     
    }, [assets,assetsData, assetsDataIsLoading]) 
    

    const getBalance = async()=>{
        try {
            if(!isAuthenticated || !currentAccount) return
            const options= {
                contractAddress:frankyCoinAddress,
                functionName: 'balanceOf',
                abi:frankyAbi,
                params:{
                    account:currentAccount
                },
            }
            if(isWeb3Enabled){
                const response = await Moralis.executeFunction(options);
                setBalance(response.toString())
            }
            
        } catch (error) {
            console.log(error)
        }

    }
    


    useEffect(()=>{
        ;(async()=>{
            if (!isWeb3Enabled) {
                await enableWeb3()
              }
            await listenToUpdates();
            if(isAuthenticated){
                getBalance();
               // await listentoUptades();
                const currentUsername = await user?.get('nickname')
                setUsername(currentUsername)
                const account = await user?.get('ethAddress')
                setCurrentAcount(account)
            }
        })();

    }, [isAuthenticated, isWeb3Enabled,authenticate,  username, user, currentAccount, getBalance])

    

   

    const handleSetUsername=()=>{
        if (user) {
            if(nickname){
                user.set('nickname', nickname)
                user.save()
                setNickname('')
            }
            else{
                console.log('cannot set empty username')
            }
            
        } else {
            console.log('No user')            
        }
    }
    const buyAssets = async(price, asset)=>{
        try {
            if(!authenticate) return
            const options={
                type:'erc20',
                amount: price,
                receiver: frankyCoinAddress,
                contractAddress:frankyCoinAddress,

            }
          //      Moralis.enableWeb3
            let transactions = await Moralis.transfer(options)
            const receipt =await transactions.wait()

            if(receipt){
                const res = userData[0].add('ownedAsset', {
                    ...asset,
                    purchaseDate: Date.now(),
                    etherScanLink:`https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`

                })
                console.log(receipt)
            
            await res.save().then(()=>{
                alert('Asset Successfully Purchased.')
            })}
            
        } catch (error) {
            console.log(error)
            
        }
    }
 
    const buyTokens = async()=>{
        if(!isAuthenticated){
            await authenticate()
        }
        const amount = ethers.BigNumber.from(tokenAmount);
        const price = ethers.BigNumber.from('100000000000000');
        const calPrice = amount.mul(price);

        let options={
            contractAddress:frankyCoinAddress,
            functionName:'mint',
            abi:frankyAbi,
            msgValue:calPrice,
            params:{
                amount,
            },
        }

        const transactions = await Moralis.executeFunction(options)
        const receipt = await transactions.wait(4);
        setIsLoading(false);
        console.log(receipt);

        setEtherScanLink(`https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`,
        )
    }

        const getAssets = async()=>{
        try {
           
            await enableWeb3()
            console.log('running t')
            setAssets(assetsData)
        } catch (error) {
            console.log(error)
        }

    }

    const getOwnedAssets = async()=>{
        try {
            if(userData[0]){
                setOwnedAssets(previousItems=>[
                    ...previousItems, userData[0].attributes.ownedAsset
                ])
            }
            
        } catch (error) {
            console.log(error)
        }
    }


    return(
        <AmazonContext.Provider
            value={{
                isAuthenticated,
                nickname,
                setNickname,
                username,
                handleSetUsername,
                assets,
                balance,
                tokenAmount,
                setTokenAmount,
                amountDue,
                setAmountDue,
                isLoading,
                setIsLoading,
                etherScanLink,
                setEtherScanLink,
                currentAccount,
                buyTokens,
                buyAssets,
                recentTransactions,
                ownedAssets

            }}
        >
            {children}
        </AmazonContext.Provider>
    )
}
