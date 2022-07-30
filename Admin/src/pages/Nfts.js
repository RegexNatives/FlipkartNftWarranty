import React, { useEffect, useState, useContext } from "react";
import { BasicContext } from "../context/BasicContext";
import { convertIPFSURL, getNFT } from "../utils/getNFT";


const NFTs = () => {
  const { fetchNFTsMintedBy } = useContext(BasicContext);
  const [fetchdata, setFetchdata] = useState([]);
  const [nftProducts, setNFTProducts] = useState([]);
  const [loader,setLoader] = useState(true);

  useEffect(() => {
    fetchNFTsMintedBy().then((res) => {
    //   console.log(res);
      setFetchdata(res);
    });
  }, []);
  const checkUniqueNft = (nft) => {
    let unique = true;
    nftProducts.forEach((item) => {
      if (item.attribute[1].uniqueId === nft.attribute[1].uniqueId) {
        unique = false;
      }
    });
    return unique;
  }

  const fetchNFTsMintedBys = async () => {
    fetchdata?.map((item,index) => {
        if (item.uri != null) {
          getNFT(item.uri)
            .then((res) => {
              let arr = [...nftProducts];
                arr.push(res);
                // if(checkUniqueNft(res)){
                    setNFTProducts(nftProducts=>[...nftProducts,res]);
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
    <button onClick={()=>{fetchNFTsMintedBys()}}>fetchNFTsMintedBys</button>
        {loader?(null):(
                 nftProducts?.map((item)=>{
                    // console.log(item)
                    return(
                        
                        <img src={convertIPFSURL(item.image)}/>
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
