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

// {
//   "description": "This is the new Apple iPhone 12 with extra and astonishing new feautures",
//   "image": "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png",
//   "name": "Flipkart Warranty Apple iPhone 12",
//   "attributes": [
//       {
//           "price": "$999"
//       },
//       {
//           "boughtAt": "Thu, 21 Jul 2022"
//       },
//       {
//           "retailerId": "62dd1695fe702a25e7766fa9"
//       },
//       {
//           "uniqueId": "bbd17bd5605008c72c8e044a1157846f77b8b82c"
//       }
//   ]
// }
