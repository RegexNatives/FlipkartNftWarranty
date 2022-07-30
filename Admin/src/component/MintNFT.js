import React from 'react';
import { NFTStorage , File} from "nft.storage";
import fs from 'fs';

const NFT_STORAGE_TOKEN = process.env.REACT_NFT_STORAGE_TOKEN;

function storeAsset(name, description, price, uniqueId, boughtAt, retailerId, imagePath) {
  const client = new NFTStorage({token: NFT_STORAGE_TOKEN});
  const metadata = await client.store({
    name:`Flipkart Warranty ${name}`,
    description: description,
    price:price,
    price:price,
    uniqueId:uniqueId,
    boughtAt: boughtAt, 
    retailerId: retailerId,
    image: new File(
      [await fs.promises.readFile(imagePath)],
      `${name}Photo.png`),
    
})

console.log(`${name}: ${metadata.url}`)
}
