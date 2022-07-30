import React, { useEffect, useState, useContext } from "react";
import { BasicContext } from "../context/BasicContext";
import { convertIPFSURL, getNFT } from "../utils/getNFT";


const NFTs = () => {
  const { fetchMyNFTs } = useContext(BasicContext);
  const [fetchdata, setFetchdata] = useState([]);
  const [nftProducts, setNFTProducts] = useState([]);
  const [loader,setLoader] = useState(true);
  const [token,setToken] = useState([]);

  useEffect(() => {
    fetchMyNFTs().then((res) => {
    //   console.log(res);
      setFetchdata(res);
    });
  }, []);

  const fetchNft = async () => {
    fetchdata?.map((item,index) => {
        // console.log(parseInt(item.tokenId._hex, 16));
        setToken([...token,parseInt(item.tokenId._hex, 16)]);
        if (item.uri != null) {
          getNFT(item.uri)
            .then((res) => {
                res.token = parseInt(item.tokenId._hex, 16);
                const nft = {
                    image: res.image,
                    name: res.name,
                    token : parseInt(item.tokenId._hex, 16),
                }
                // if(checkUniqueNft(res)){
                    setNFTProducts(nftProducts=>[...nftProducts,nft]);
                // }
            })
            .catch((err) => {
              console.log(err);
            });
        }
        if(index == fetchdata.length-1){
          setLoader(false);
        }
  })
}

//   useEffect(() => {
//     if (fetchdata.length > 0 && nftProducts.length === 0)  {
//         console.log(fetchdata.length)
//       fetchdata?.map((item,index) => {
//         if (item.uri != null) {
//           getNFT(item.uri)
//             .then((res) => {
//               let arr = [...nftProducts];
//                 arr.push(res);
//                 if(checkUniqueNft(res)){
//                     setNFTProducts(nftProducts=>[...nftProducts,res]);
//                 }
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//         }
//         if(index == fetchdata.length-1){
//           setLoader(false);
//         }
//       });
//     }
//   }, [fetchdata]);


  return (
    <>
    <button onClick={()=>{fetchNft()}}>fetchNft</button>
        {loader?(null):(
                 nftProducts?.map((item,index)=>{
                    // console.log(token[index],index)
                    console.log(item);
                    return(
                        
                        <img src={convertIPFSURL(item.image)} alt={token[index]}/>
                        )
                    })
        )}
    </>
  )
  {/* {loader ?( <div className="loader">):(

    nftProducts?.map((item)=>{
        console.log(item)
        return(
            
            <img src={convertIPFSURL(item.image)}/>
            )
        })
        )}
  </>); */}
};

export default NFTs;
