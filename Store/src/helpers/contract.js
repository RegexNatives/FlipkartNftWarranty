import { ethers } from "ethers";
import { errorToast, stickToast } from "../utils/toast";
import { contractABI, contractAddress } from "../abstract/warranty";

const { ethereum } = window;

const createEthereumContract = () => {
    try{
        if(ethereum){
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const warrantyContract = new ethers.Contract(contractAddress, contractABI, signer);
            return warrantyContract;
        }
        else{
            stickToast("Please Install Metamask")
            
        }
    }
    catch(err){
        console.log(err);   
        stickToast("Please Install Metamask")
    }
};

const warrantyContract = createEthereumContract();
export default warrantyContract;