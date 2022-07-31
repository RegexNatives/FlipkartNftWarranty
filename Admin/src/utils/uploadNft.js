import { NFTStorage, File } from "nft.storage";
// import fs from 'fs'

const NFT_STORAGE_TOKEN = process.env.REACT_NFT_STORAGE_TOKEN;


export const storeAsset = async (
  name,
  description,
  price,
  uniqueId,
  boughtAt,
  retailerId,
  imagePath
) => {
  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
  const metadata = await client.store({
    description: description,
    image: imagePath,
    name: `Flipkart Warranty ${name}`,
    attributes: [
      {
        price: price,
      },
      {
        uniqueId: uniqueId,
      },
      {
        boughtAt: boughtAt,
      },
      {
        retailerId: retailerId,
      },
    ],
    // image: new File(
    //   [await fs.promises.readFile(imagePath)],
    //   `${name}Photo.png`),
  });
  return metadata;

  // console.log(`${name}: ${metadata.url}`)
};
