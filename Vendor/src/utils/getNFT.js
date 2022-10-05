import axios from 'axios'; 
export const convertIPFSURL = (url) => {
    // console.log(url);
    let imgUrl = url?.slice(url.indexOf(":"),url?.lastIndexOf("/"));
    let slice = url?.slice(url.lastIndexOf("/"),url?.length)
    let renderURL = `https${imgUrl}.ipfs.dweb.link${slice}`;
    return renderURL;
}



export const getNFT = async (metaDataURL) => {
    // console.log(metaDataURL);
    const fetchURL = convertIPFSURL(metaDataURL);
    const nft = await axios.get(fetchURL);
    return nft.data;
}