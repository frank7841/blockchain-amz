import { createContext, useState, useEffect  } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";

export const AmazonContext = createContext()

export const AmazonProvider =({children}) =>{
    const [nickname, setNickname] = useState('')
    const [username, setUsername] = useState('')
    const [assets, setAssets]=useState([])
    
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

    useEffect(()=>{
       (async function(){
           await enableWeb3()
           await getAssets()
       })()     
    }, [assets,assetsData, assetsDataIsLoading]) 

   


    useEffect(()=>{
        ;(async()=>{
            if(isAuthenticated){
                
                
                const currentUsername = await user?.get('nickname')
                setUsername(currentUsername)
            }
        })();

    }, [isAuthenticated, username, user])

    

   

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
    const getAssets = async()=>{
        try {
           
            await enableWeb3()
            console.log('running t')
            setAssets(assetsData)
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

            }}
        >
            {children}
        </AmazonContext.Provider>
    )
}
