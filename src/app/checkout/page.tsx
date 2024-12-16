"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Checkout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChainDropdownOpen, setIsChainDropdownOpen] = useState(false);
  const [isTokenDropdownOpen, setIsTokenDropdownOpen] = useState(false);
  const [tokens, setTokens] = useState(["Native", "USDC"]);
  const chains = [
    "Optimism",
    "Arbitrum",
    "Polygon",
    "BNB",
    "Base",
    "Celo",
    "Avalanche",
  ];
  const [inputValue, setInputValue] = useState(2);
  const [isRoundDropdownOpen, setIsRoundDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchTokens = async () => {
      // const fetchedTokens = await fetch("/api/tokens").then((res) =>
      //   res.json()
      // );
      const fetchedTokens: never[] = [];
      setTokens((prevTokens) => [...prevTokens, ...fetchedTokens]);
    };
    fetchTokens();
  }, []);

  return (
    <div className="container h-screen max-h-screen">
      <div className="flex flex-col flex-grow h-full">
        <div className="flex justify-between x-auto mt-10">
          <div className="flex">
            <Image
              src="/android-chrome-512x512.png"
              alt="logo"
              width={50}
              height={40}
            />
            <div className="text-4xl text-[#AF3BC9] [text-shadow:_0_3px_0_rgb(0_0_0_)]">
              Doogly
            </div>
          </div>
          <div className="relative">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Image src="/menu-bar.png" alt="menu" width={40} height={40} />
            </button>

            {/* Menu Overlay */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <button
                  className="block px-4 py-2 text-sm text-[#AF3BC9] hover:text-white hover:bg-[#AF3BC9] w-full text-left"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Profile
                </button>
                <button
                  className="block px-4 py-2 text-sm text-[#AF3BC9] hover:text-white hover:bg-[#AF3BC9] w-full text-left"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Hypercerts
                </button>
                <button
                  className="block px-4 py-2 text-sm text-[#AF3BC9] hover:text-white hover:bg-[#AF3BC9] w-full text-left"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between mt-3">
          <Link className="text-[#AF3BC9]" href="/">
            Back
          </Link>
          <div className="text-2xl text-[#AF3BC9]">Your Cart</div>
          <div></div>
        </div>
        <div className="mt-3 flex justify-center gap-40">
          <div className="relative">
            <button
              className="bg-[#AF3BC9] rounded-md"
              onClick={() => setIsChainDropdownOpen(!isChainDropdownOpen)}
            >
              <div className="mx-3 text-white">Select Chain</div>
            </button>
            {isChainDropdownOpen && (
              <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                {chains.map((chain) => (
                  <button
                    key={chain}
                    className="block px-4 py-2 text-sm text-[#AF3BC9] hover:text-white hover:bg-[#AF3BC9] w-full text-left"
                    onClick={() => {
                      console.log(`Selected Chain: ${chain}`);
                      setIsChainDropdownOpen(false);
                    }}
                  >
                    {chain}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              className="bg-[#AF3BC9] rounded-md"
              onClick={() => setIsTokenDropdownOpen(!isTokenDropdownOpen)}
            >
              <div className="mx-3 text-white">Select Token</div>
            </button>
            {isTokenDropdownOpen && (
              <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                {tokens.map((token) => (
                  <button
                    key={token}
                    className="block px-4 py-2 text-sm text-[#AF3BC9] hover:text-white hover:bg-[#AF3BC9] w-full text-left"
                    onClick={() => {
                      console.log(`Selected Token: ${token}`);
                      setIsTokenDropdownOpen(false);
                    }}
                  >
                    {token}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full h-full mt-3">
          <div className="w-1/12 flex items-center justify-center">
            <Image
              src="/bin.png"
              alt="logo"
              width={20}
              height={20}
              className="bg-white"
            />
          </div>
          <div className="w-11/12 h-full border-solid border-2 border-r-0 border-[#AF3BC9] rounded-l-2xl p-1">
            <div className="flex justify-between">
              <div>
                <Image
                  src="/viaPrize-logo.jpeg"
                  alt="logo"
                  width={40}
                  height={40}
                  className="rounded-full bg-white"
                />
              </div>
              <div className="text-md text-[#AF3BC9]">
                viaPrize Gitcoin Fiat Integration
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => setInputValue((prev) => Math.max(prev - 1, 0))}
                  className="px-2"
                >
                  -
                </button>
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(Number(e.target.value))}
                  className="w-16 text-center border border-[#AF3BC9] rounded-md mx-2"
                />
                <button
                  onClick={() => setInputValue((prev) => prev + 1)}
                  className="px-2"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="bg-[#AF3BC9] w-80 rounded-md"
                onClick={() => setIsRoundDropdownOpen(!isRoundDropdownOpen)}
              >
                <div className="mx-3 text-white">Select Round</div>
              </button>
              {isRoundDropdownOpen && (
                <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <button
                    className="block px-4 py-2 text-sm text-[#AF3BC9] hover:text-white hover:bg-[#AF3BC9] w-full text-left"
                    onClick={() => {
                      console.log("Selected Option: Direct Donate");
                      setIsRoundDropdownOpen(false);
                    }}
                  >
                    Direct Donate
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
