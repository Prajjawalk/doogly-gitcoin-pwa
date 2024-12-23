"use client";

import { usePrivy } from "@privy-io/react-auth";
import { SetStateAction, Dispatch } from "react";

interface ProfileProps {
  displayChanger: Dispatch<SetStateAction<string>>;
}

export default function Profile({ displayChanger }: ProfileProps) {
  const { user } = usePrivy();
  return (
    <div className="flex flex-col flex-grow h-full">
      <div className="flex justify-between mt-3">
        <button
          className="text-[#AF3BC9]"
          onClick={() => displayChanger("project")}
        >
          Back
        </button>
        <div className="text-2xl text-[#AF3BC9]">Your Profile</div>
        <div></div>
      </div>
      <div className="mt-3">
        <div className="text-[#AF3BC9]">Your Address</div>
        <div className="text-[#AF3BC9]">{user?.wallet?.address}</div>
      </div>
    </div>
  );
}
