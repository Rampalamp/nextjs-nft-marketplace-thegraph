import styles from "../styles/Home.module.css";
import { useMoralis } from "react-moralis";
import NFTBox from "../components/NFTBox";
import networkMapping from "../constants/networkMapping.json";
import GET_ACTIVE_ITEMS from "../constants/subgraphQueries";
import { useQuery } from "@apollo/client";

export default function Home() {
    const { isWeb3Enabled, chainId } = useMoralis();
    const chainString = chainId ? parseInt(chainId).toString() : "31337";
    const marketplaceAddress = networkMapping[chainString].NftMarketplace[0];

    const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS);

    return (
        //Showing the recently listed NFTs
        //we will index the events off-chain and then read from our database.
        //setup a server to listen for those events to be fired, and we will add them to a database to query.

        //TheGraph does this in a decentralized way
        //Moralis does it in a centralized way and comes with lots of other features as well.
        //Moralis has vastly changed how it operates for local dev chains, and deemed not worth while for this course.
        <div className="container mx-auto">
            <h1 className="py-4 px-4 font-bold text-2xl">Recently Listed</h1>
            <div className="flex flex-wrap">
                {isWeb3Enabled ? (
                    loading || !listedNfts ? (
                        <div>Loading...</div>
                    ) : (
                        listedNfts.activeItems.map((nft) => {
                            console.log(nft);
                            const { price, nftAddress, tokenId, seller } = nft;
                            return (
                                <NFTBox
                                    price={price}
                                    nftAddress={nftAddress}
                                    tokenId={tokenId}
                                    marketplaceAddress={marketplaceAddress}
                                    seller={seller}
                                    key={`${nftAddress}${tokenId}`}
                                />
                            );
                        })
                    )
                ) : (
                    <div>Web3 Currently Not Enabled</div>
                )}
            </div>
        </div>
    );
}
