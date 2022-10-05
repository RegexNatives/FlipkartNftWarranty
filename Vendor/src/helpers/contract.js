import { ethers } from "ethers";
import { errorToast } from "../utils/toast";
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
            errorToast("Please Install Metamask")
        }
    }
    catch(err){
        console.log(err);
    }
};

const warrantyContract = createEthereumContract();
export default warrantyContract;