import { NFTStorage } from "nft.storage";
// import fs from 'fs'

const NFT_STORAGE_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDg3MWMzQkYwZjhFNTNGYkM0RTc1YTRENjdDQzcxNzVDM0FlOWFBNjgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1OTAzODA4NDc1NCwibmFtZSI6Ik5GVC13YXJyYW50eSJ9.QdGPxh3Ycz2Q10hZV6s_FHKJUUww61m4-oeSXrgYvjo";


export const storeAsset = async (data) =>  {
  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
  const metadata = await client.store({
    description: data?.description,
    image: data?.imagePath,
    name: `Flipkart Warranty ${data?.name}`,
    attributes: [
      {
        price: data?.price,
      },
      {
        uniqueId: data.uniqueId,
      },
      {
        deliveredAt : data?.deliveredAt,
      },
      {
        retailerId: data?.retailerId,
      },
    ],
  });
  return metadata;

};
