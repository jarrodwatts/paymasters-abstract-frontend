'use client';

import { ClaimButton, ConnectButton, ConnectEmbed, darkTheme, useActiveAccount } from "thirdweb/react";
import { abstractTestnet, } from "thirdweb/chains";
import { createWallet, walletConnect, inAppWallet } from "thirdweb/wallets";
import { client } from "./client";
import Image from "next/image";

const chain = abstractTestnet;
const nftContractAddress = "0x4516DD9191c3f8fd017fF2b017E224Fb07929C6F"
const tokenIdToMint = 0n;
const quantityToMint = 1n;

const walletsToSupport = [
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
]

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
        <div className="flex flex-col items-center justify-center gap-4 md:gap-8 mb-8 md:flex-row md:items-start md:w-[1020px]">

          <div className="gap-2 flex flex-col md:justify-start md:items-start md:h-full md:py-3">
            <h1 className="text-3xl md:text-4xl font-bold text-center md:text-start px-2 font-heading">
              Abstract Paymaster Demo
            </h1>

            <p className="text-center max-w-[480px] text-md md:text-lg md:text-start  px-2 mt-2">
              Mint an NFT for free <i>(no gas fees)</i> with Abstract&rsquo;s native account abstraction & paymaster support.

              {/* Video embed */}

            </p>
          </div>

          {
            !activeAccount ?
              <ConnectEmbed
                chain={chain}
                client={client}
                accountAbstraction={{
                  chain,
                  sponsorGas: true,
                }}
                wallets={walletsToSupport}
                showThirdwebBranding={false}
              />

              :
              <div className="flex flex-col items-center justify-center mb-8">
                <div className="rounded-xl p-1">
                  <Image src={`/chad.png`} width={300} height={300} alt="chad" className="rounded-xl" />
                </div>
                <ClaimButton
                  contractAddress={nftContractAddress}
                  chain={chain}
                  client={client}
                  claimParams={{
                    quantity: quantityToMint,
                    tokenId: tokenIdToMint,
                    type: "ERC1155",
                  }}
                  onTransactionConfirmed={(tx) => { console.log(tx) }}
                  onError={(error) => { console.error(error) }}
                  style={{
                    width: "100%",
                  }}
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
