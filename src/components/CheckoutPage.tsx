"use client";

import Image from "next/image";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { useSquidRouter } from "./SquidRouterProvider";
import { Squid } from "@0xsquid/sdk";
import {
  ChainData,
  ChainName,
  ChainType,
  NetworkIdentifier,
  OnChainExecutionData,
  SquidCallType,
  Token,
  Volatility,
} from "@0xsquid/squid-types";
import {
  useAccount,
  useWriteContract,
  useSendTransaction,
  useConfig,
} from "wagmi";
import { useWallets } from "@privy-io/react-auth";
import { ethers } from "ethers";
import Modal from "./Modal"; // Import the Modal component
import { URL } from "url";
import { readContract } from "wagmi/actions";

interface CheckoutProps {
  projects: Project[] | undefined;
  project: number[];
  displayChanger: Dispatch<SetStateAction<string>>;
  shoppingbagChanger: Dispatch<SetStateAction<Set<number>>>;
}

interface Project {
  metadata: {
    title: string;
    shortDescription: string;
    description: string;
    bannerImg: string;
    logoImg: string;
    website: string;
    projectTwitter: string;
  };
  nonce: string;
  roles: Array<{ address: string }>;
  id: string;
}

interface ItemDetail {
  id: number;
  title: string;
  logoImageUrl: string;
  projectId: string;
  currentRound: string;
  inputValue: number;
  nonce: string;
  projectOwner: string;
}

const usdcArbitrumAddress = "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8"; // USDC on Arbitrum
const alloContractAddress = "0x1133eA7Af70876e64665ecD07C0A0476d09465a1"; // Allo proxy contract

const erc20ContractABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_spender",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
      {
        name: "_spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

const alloABI = [
  {
    inputs: [
      { internalType: "uint256", name: "_poolId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "allocate",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "_poolIds", type: "uint256[]" },
      { internalType: "bytes[]", name: "_datas", type: "bytes[]" },
    ],
    name: "batchAllocate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export default function Checkout({
  project,
  projects,
  displayChanger,
  shoppingbagChanger,
}: CheckoutProps) {
  const [isChainDropdownOpen, setIsChainDropdownOpen] = useState(false);
  const [isTokenDropdownOpen, setIsTokenDropdownOpen] = useState(false);
  const [buttonText, setButtonText] = useState("Checkout");

  const [chains, setChains] = useState<ChainData[]>([
    {
      chainId: "42161",
      networkIdentifier: NetworkIdentifier.ARBITRUM,

      axelarChainName: ChainName.ARBITRUM,

      networkName: "Arbitrum",
      nativeCurrency: {
        name: "Arbitrum",
        symbol: "ETH",
        decimals: 18,
        icon: "https://raw.githubusercontent.com/axelarnetwork/axelar-docs/main/public/images/chains/arbitrum.svg",
      },
      chainIconURI:
        "https://raw.githubusercontent.com/0xsquid/assets/main/images/webp128/chains/arbitrum.webp",
      blockExplorerUrls: ["https://arbiscan.io/"],
      swapAmountForGas: "2000000",
      sameChainSwapsSupported: true,
      squidContracts: {
        squidRouter: "0xce16F69375520ab01377ce7B88f5BA8C48F8D666",
        defaultCrosschainToken: "0xEB466342C4d449BC9f53A865D5Cb90586f405215",
        squidMulticall: "0xaD6Cea45f98444a922a2b4fE96b8C90F0862D2F4",
        squidFeeCollector: "0xd3F8F338FdAD6DEb491F0F225d09422A7a70cc45",
      },
      compliance: {
        trmIdentifier: "arbitrum",
      },
      boostSupported: true,
      enableBoostByDefault: true,
      bridges: {
        axelar: {
          gateway: "0xe432150cce91c13a887f7D836923d5597adD8E31",
          itsService: "0xB5FB4BE02232B1bBA4dC8f81dc24C26980dE9e3C",
        },
        cctp: {
          cctpDomain: "3",
          tokenMessenger: "0x19330d10D9Cc8751218eaf51E8885D058642E08A",
          messageTransmitter: "0xC30362313FBBA5cf9163F0bb16a0e01f01A896ca",
        },
        chainflip: {
          vault: "0x79001a5e762f3befc8e5871b42f6734e00498920",
        },
      },
      rpcList: ["https://arb1.arbitrum.io/rpc"],
      chainNativeContracts: {
        wrappedNativeToken: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
        ensRegistry: "",
        multicall: "0xcA11bde05977b3631167028862bE2a173976CA11",
        usdcToken: "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
      },
      feeCurrencies: [],
      currencies: [],
      features: [],
      internalRpc: "https://arb1.arbitrum.io/rpc",
      rpc: "https://arb1.arbitrum.io/rpc",
      chainType: ChainType.EVM,
    },
  ]);
  const [isRoundDropdownOpen, setIsRoundDropdownOpen] = useState<number | null>(
    null
  );

  const [currentToken, setCurrentToken] = useState<Token>();
  const [itemDetails, setItemDetails] = useState<Array<ItemDetail>>([]);
  const erc20Write = useWriteContract();
  const account = useAccount();
  const sdk = useSquidRouter() as Squid;
  const [tokens, setTokens] = useState<Token[]>(
    sdk.tokens.filter((t) => t.chainId === account.chainId?.toString()) ?? [
      {
        symbol: "ETH",
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        chainId: "1",
        name: "ETH",
        decimals: 18,
        usdPrice: 3851.2694242434804,
        coingeckoId: "ethereum",
        type: ChainType.EVM,
        logoURI:
          "https://raw.githubusercontent.com/0xsquid/assets/main/images/tokens/eth.svg",
        subGraphOnly: false,
        subGraphIds: ["weth-wei", "chainflip-bridge", "immutable-eth"],
        volatility: Volatility.SUPER_STABLE,
      },
    ]
  );
  const [currentChain, setCurrentChain] = useState<number>(
    account.chainId as number
  );

  const { wallets } = useWallets();

  const { sendTransactionAsync } = useSendTransaction();

  const [modalContent, setModalContent] = useState<{
    success: boolean;
    imageUrl?: string;
    blockExplorerLink?: string;
    errorMessage?: string;
  }>({ success: true });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const wagmiConfig = useConfig();

  useEffect(() => {
    const fetchTokensAndSwitchChain = async (chain: number) => {
      const fromToken = sdk.tokens.filter(
        (t) => t.chainId === chain.toString()
      );
      await wallets[0].switchChain(chain);

      setTokens(fromToken);
    };

    if (currentChain) {
      fetchTokensAndSwitchChain(currentChain as number);
    }
  }, [sdk.tokens, sdk.chains, currentChain, account, wallets]);

  useEffect(() => {
    const fetchChains = async () => {
      // access using squid.chains
      const fromChain = sdk.chains;

      setChains(fromChain.slice(0, 18));
    };

    fetchChains();
  }, [sdk.chains]);

  useEffect(() => {
    const projectDetails = async () => {
      if (projects?.length && projects.length > 0) {
        const items: Array<ItemDetail> = project.map((i: number) => {
          const data = projects?.[i];
          return {
            id: i,
            title: data?.metadata.title,
            logoImageUrl: data?.metadata.logoImg,
            projectId: data?.id,
            currentRound: "Direct Donate",
            inputValue: 2,
            projectOwner: data.roles[0].address,
            nonce: data.nonce,
          };
        });
        setItemDetails(items);
      }
    };
    projectDetails();
  }, [project, projects?.length]);

  // Function to approve the transactionRequest.target to spend fromAmount of fromToken
  const approveSpending = async (
    transactionRequestTarget: string,
    fromToken: string,
    fromAmount: string
  ) => {
    try {
      const erc20Read = await readContract(wagmiConfig, {
        abi: erc20ContractABI,
        address: currentToken?.address as `0x${string}`,
        functionName: "allowance",
        args: [account.address, transactionRequestTarget],
      });

      const currentAllowance = erc20Read as unknown as bigint;

      if (currentAllowance < BigInt(fromAmount)) {
        await erc20Write.writeContractAsync({
          address: fromToken as `0x${string}`,
          abi: erc20ContractABI,
          functionName: "approve",
          args: [transactionRequestTarget, fromAmount],
        });
      }
    } catch (e) {
      console.error("Approval failed:", e);
      throw e;
    }
  };

  const handleCheckout = async () => {
    try {
      // Change button text to "processing..."
      setButtonText("processing...");

      let inputAmt = 0;
      itemDetails.map((i) => (inputAmt += i.inputValue));

      const amount = ethers.utils.parseUnits(
        inputAmt.toString(),
        currentToken?.decimals
      );

      let poolIds: BigInt[] = [];
      let poolData: string[] = [];

      const erc20Interface = new ethers.utils.Interface(erc20ContractABI);
      const approvalerc20 = erc20Interface.encodeFunctionData("approve", [
        "0x91AD709FE04E214eF53218572D8d8690a8b4FdD0", // DirectAllocationStrategy Contract
        ethers.constants.MaxUint256,
      ]);

      itemDetails.map((p: ItemDetail) => {
        poolIds.push(BigInt(390));
        const projectOwner = p.projectOwner;
        const nonce = p.nonce;
        const tokenAddress = usdcArbitrumAddress;
        const tokenAmount = ethers.utils.parseUnits(
          ((p?.inputValue as number) * 0.95).toString(),
          currentToken?.decimals
        );

        poolData.push(
          new ethers.utils.AbiCoder().encode(
            ["address", "uint256", "address", "uint256"],
            [projectOwner, tokenAmount, tokenAddress, nonce]
          )
        );
      });

      const alloInterface = new ethers.utils.Interface(alloABI);
      const allocateData = alloInterface.encodeFunctionData("batchAllocate", [
        poolIds,
        poolData,
      ]);

      const params = {
        fromAddress: account.address as string,
        fromChain: currentChain?.toString() as string,
        fromToken: currentToken?.address as string,
        fromAmount: amount.toString(),
        toChain: "42161", // Arbitrum
        toToken: usdcArbitrumAddress,
        toAddress: account.address as string,
        enableBoost: false,
        approveSpending: false,
        postHook: {
          chainType: ChainType.EVM,
          calls: [
            {
              chainType: ChainType.EVM,
              callType: SquidCallType.DEFAULT,
              target: usdcArbitrumAddress,
              value: "0",
              callData: approvalerc20,
              payload: {
                tokenAddress: usdcArbitrumAddress,
                inputPos: 1,
              },
              estimatedGas: "50000",
            },
            {
              chainType: ChainType.EVM,
              callType: SquidCallType.DEFAULT,
              target: alloContractAddress,
              value: "0",
              callData: allocateData,
              estimatedGas: "50000",
              payload: {
                tokenAddress: usdcArbitrumAddress,
                inputPos: 0,
              },
            },
          ],
          provider: "Doogly", //This should be the name of your product or application that is triggering the hook
          description: "Cross-chain donation",
          logoURI: "",
        },
      };

      // @ts-ignore
      const { route } = await sdk.getRoute(params);
      const transactionRequest =
        route.transactionRequest as OnChainExecutionData;

      if (!transactionRequest) {
        throw new Error();
      }

      if (
        currentToken?.address != "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
      ) {
        await approveSpending(
          (transactionRequest as OnChainExecutionData).target,
          currentToken?.address as string,
          amount.toString()
        );

        // Wait for 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      // Execute the swap transaction
      const tx = await sendTransactionAsync({
        to: transactionRequest.target as `0x${string}`,
        data: transactionRequest.data as `0x${string}`,
        value: BigInt(transactionRequest.value),
      });

      // Open modal for transaction status
      setIsModalOpen(true);

      // Wait for 2 seconds
      setTimeout(() => {
        // Check transaction status
        if (tx) {
          // Transaction succeeded
          setButtonText("Success");
          setModalContent({
            success: true,
            imageUrl: "/doogly-mascot.png",
            blockExplorerLink: `${account.chain?.blockExplorers?.default.url}/tx/${tx}`,
          });
          setItemDetails([]);
        } else {
          // Transaction failed
          setButtonText("Failed");
          setModalContent({
            success: false,
            errorMessage: "Transaction failed. Please try again.",
          });
        }
      }, 2000); // 2000 milliseconds = 2 seconds
    } catch (e) {
      console.error(e);
      setButtonText("Failed");
      setModalContent({
        success: false,
        errorMessage: "Transaction failed. Please try again.",
      });
    }
  };

  const projectList = itemDetails?.map((i: ItemDetail, idx) => (
    <div className="flex w-full mt-3" key={idx}>
      <div className="w-1/12 flex items-center justify-center">
        <button
          onClick={() => handleRemoveProject(i.id)}
          className="flex items-center justify-center"
        >
          <Image
            src="/bin.png"
            alt="logo"
            width={20}
            height={20}
            className="bg-white"
          />
        </button>
      </div>
      <div className="w-11/12 border-solid border-2 border-r-0 border-[#AF3BC9] rounded-l-2xl p-1">
        <div className="flex justify-between">
          <div>
            <Image
              src={`https://d16c97c2np8a2o.cloudfront.net/ipfs/${i.logoImageUrl}`}
              alt="logo"
              width={40}
              height={40}
              className="rounded-full bg-white"
              onError={(e) => {
                if (
                  e.currentTarget.src ===
                  `https://d16c97c2np8a2o.cloudfront.net/ipfs/${i.logoImageUrl}`
                ) {
                  e.currentTarget.src = `https://ipfs.io/ipfs/${i.logoImageUrl}`; // Second fallback image URL
                } else if (
                  e.currentTarget.src ===
                  `https://ipfs.io/ipfs/${i.logoImageUrl}`
                ) {
                  e.currentTarget.src = "/default-logo.png"; // Third fallback image URL
                }
              }}
            />
          </div>
          <div className="text-md text-[#AF3BC9]">{i.title}</div>
          <div className="flex items-center" key={idx}>
            <button
              onClick={() => {
                const newValue = Math.max(itemDetails[idx].inputValue - 1, 0);
                setItemDetails((prev) => {
                  const updatedItems = [...prev];
                  updatedItems[idx].inputValue = newValue;
                  return updatedItems;
                });
              }}
              className="px-2"
            >
              -
            </button>
            <input
              type="number"
              value={itemDetails[idx].inputValue}
              onChange={(e) => {
                const newValue = Number(e.target.value);
                setItemDetails((prev) => {
                  const updatedItems = [...prev];
                  i.inputValue = newValue;
                  return updatedItems;
                });
              }}
              className="w-16 text-center border border-[#AF3BC9] rounded-md mx-2"
            />
            <button
              onClick={() => {
                const newValue = itemDetails[idx].inputValue + 1;
                setItemDetails((prev) => {
                  const updatedItems = [...prev];
                  updatedItems[idx].inputValue = newValue;
                  return updatedItems;
                });
              }}
              className="px-2"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-[#AF3BC9] w-80 rounded-md"
            onClick={() => {
              // Toggle the dropdown for the specific project
              setIsRoundDropdownOpen((prev) => (prev === idx ? null : idx));
            }}
          >
            <div className="mx-3 text-white">
              {i.currentRound ?? "Select Round"}
            </div>
          </button>
          {isRoundDropdownOpen === idx && ( // Check if the dropdown should be open for this project
            <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <button
                className="block px-4 py-2 text-sm text-[#AF3BC9] hover:text-white hover:bg-[#AF3BC9] w-full text-left"
                onClick={() => {
                  // Update the currentRound for this specific project
                  setItemDetails((prev) => {
                    const updatedItems = [...prev];
                    updatedItems[idx].currentRound = "Direct Donate"; // Update the currentRound
                    return updatedItems;
                  });
                  setIsRoundDropdownOpen(null); // Close the dropdown
                }}
              >
                Direct Donate
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  ));

  // access using squid.chains
  const handleRemoveProject = (index: number) => {
    shoppingbagChanger((prev) => {
      prev.delete(index);
      return prev;
    });
    setItemDetails((prev) => prev.filter((p) => p.id !== index));
  };

  return (
    <div className="flex flex-col flex-grow h-full">
      <div className="flex justify-between mt-3">
        <button
          className="text-[#AF3BC9]"
          onClick={() => displayChanger("project")}
        >
          Back
        </button>
        <div className="text-2xl text-[#AF3BC9]">Your Cart</div>
        <div></div>
      </div>
      <div className="mt-3 flex justify-center gap-40">
        <div className="relative">
          <button
            className="bg-[#AF3BC9] rounded-md"
            onClick={() => setIsChainDropdownOpen(!isChainDropdownOpen)}
          >
            <div className="mx-3 text-white">
              {account.chain?.name ?? "Select Chain"}
            </div>
          </button>
          {isChainDropdownOpen && (
            <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 max-h-48 overflow-y-auto">
              {chains.map((chain) => (
                <button
                  key={chain.chainId}
                  className="block px-4 py-2 text-sm text-[#AF3BC9] hover:text-white hover:bg-[#AF3BC9] w-full text-left"
                  onClick={() => {
                    setCurrentChain(parseInt(chain.chainId));
                    setIsChainDropdownOpen(false);
                  }}
                >
                  {chain.networkIdentifier}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="relative">
          <button
            className="bg-[#AF3BC9] rounded-md"
            onClick={() => {
              setIsTokenDropdownOpen(!isTokenDropdownOpen);
            }}
          >
            <div className="mx-3 text-white">
              {currentToken?.symbol ?? "Select Token"}
            </div>
          </button>
          {isTokenDropdownOpen && (
            <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 max-h-48 overflow-y-auto">
              {tokens.map((token, idx) => (
                <button
                  key={idx}
                  className="block px-4 py-2 text-sm text-[#AF3BC9] hover:text-white hover:bg-[#AF3BC9] w-full text-left"
                  onClick={() => {
                    setCurrentToken(token);
                    setIsTokenDropdownOpen(false);
                  }}
                >
                  {token.symbol}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {projectList}
      <div className="flex items-center justify-center mt-10">
        <button
          className="block px-4 py-2 text-sm text-white bg-[#AF3BC9] rounded-md"
          onClick={() => handleCheckout()}
        >
          {buttonText}
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={modalContent}
      />
    </div>
  );
}
