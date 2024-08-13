'use client';

import { ClaimButton, ConnectEmbed, useActiveAccount } from "thirdweb/react";
import { abstractTestnet, } from "thirdweb/chains";
import { createWallet, walletConnect, inAppWallet } from "thirdweb/wallets";
import { client } from "./client";
import Image from "next/image";

const paymasterContractAddress = "0x57ba66d5d6A1f347d69bbDb435684d18A6BE33f0";

const nftContractAddress = "0x4516DD9191c3f8fd017fF2b017E224Fb07929C6F"
const tokenIdToMint = 0n;
const quantityToMint = 1n;

export default function Home() {
  const activeAccount = useActiveAccount();

  return (
    <main className="w-screen h-screen flex items-center justify-center overflow-auto"
      style={{
        backgroundImage: `
          radial-gradient(circle farthest-side at -15% 85%, rgba(90, 255, 122, 0.25), rgba(0, 0, 0, 0) 42%),
          radial-gradient(circle farthest-side at 110% 20%, rgba(80, 245, 145, 0.20), rgba(0, 0, 0, 0) 30%)
        `,
      }}>
      <div className="py-20">
        <div className="flex flex-col items-center justify-center gap-4 mb-20">

          <h1 className="text-3xl md:text-5xl font-bold text-center px-2">
            Abstract Paymaster Demo
          </h1>

          <p className="text-md md:text-lg text-center mb-1 px-8">
            Sign in or connect a wallet to mint an NFT. <br />No gas fees required!
          </p>

          {
            !activeAccount ?
              <ConnectEmbed
                chain={abstractTestnet}
                client={client}
                accountAbstraction={{
                  chain: abstractTestnet,
                  sponsorGas: true,
                }}
                wallets={[
                  // Social login and passkeys
                  inAppWallet({
                    auth: {
                      options: [
                        "google",
                        "passkey",
                      ],
                    },
                  }),
                  // Web3 wallets
                  createWallet("io.metamask"),
                  createWallet("com.coinbase.wallet"),
                  walletConnect(),
                ]}
                showThirdwebBranding={false}
              />

              :

              <div className="flex flex-col items-center justify-center gap-4 mb-20 w-full">
                <div className="rounded-xl p-1">
                  <Image src={`/chad.png`} width={300} height={300} alt="chad" />
                </div>

                <ClaimButton
                  contractAddress={nftContractAddress}
                  chain={abstractTestnet}
                  client={client}
                  claimParams={{
                    quantity: quantityToMint,
                    tokenId: tokenIdToMint,
                    type: "ERC1155",
                  }}
                  style={{ width: '90%' }}
                  onTransactionConfirmed={(tx) => { console.log(tx) }}
                  onError={(error) => { console.error(error) }}
                >
                  Mint NFT
                </ClaimButton>
              </div>
          }
        </div>
      </div>
    </main >
  );
}
