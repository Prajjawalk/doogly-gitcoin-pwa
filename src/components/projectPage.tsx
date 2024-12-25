"use client";

import { ObjectId } from "mongoose";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
// import { ProjectData } from "../data/projectData";

interface ProjectPageProps {
  // projectIndex: number;
  project: Project | undefined;
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

  id: string;
}

export default function ProjectPage({ project }: ProjectPageProps) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  if (!project) {
    return (
      <div className="flex flex-col flex-grow h-full">
        <div className="mx-3 my-3 flex-grow rounded-md flex flex-col h-full bg-[#AF3BC9] items-center justify-center">
          <div className="text-white text-md">Loading...</div>
        </div>
      </div>
    );
  }

  const shareOverlay = (
    <div className="absolute right-0 mt-2 w-10 bg-white rounded-md shadow-lg py-1 z-10">
      <a href={project.metadata.projectTwitter}>
        <Image
          src="/twitter.png"
          alt="twitter"
          width={40}
          height={40}
          className="p-2"
        />
      </a>
      <a href={project.metadata.website}>
        <Image
          src="/website.png"
          alt="website"
          width={40}
          height={40}
          className="p-2"
        />
      </a>
      <a href={`https://explorer.gitcoin.co/#/projects/${project.id}`}>
        <Image
          src="/gitcoin-logo.png"
          alt="gitcoin-logo"
          width={40}
          height={40}
          className="p-2"
        />
      </a>
    </div>
  );

  return (
    <div className="flex flex-col flex-grow h-full">
      {showDetails ? (
        <>
          <div className="flex justify-between mt-3">
            <div>
              <Image
                src={`https://d16c97c2np8a2o.cloudfront.net/ipfs/${project.metadata.logoImg}`}
                alt="logo"
                width={40}
                height={40}
                className="rounded-full bg-white"
                onError={(e) => {
                  if (
                    e.currentTarget.src ===
                    `https://d16c97c2np8a2o.cloudfront.net/ipfs/${project.metadata.logoImg}`
                  ) {
                    e.currentTarget.src = `https://ipfs.io/ipfs/${project.metadata.logoImg}`; // Second fallback image URL
                  } else if (
                    e.currentTarget.src ===
                    `https://ipfs.io/ipfs/${project.metadata.logoImg}`
                  ) {
                    e.currentTarget.src = "/default-logo.png"; // Third fallback image URL
                  }
                }}
              />
            </div>
            <div className="text-xl text-[#AF3BC9]">
              {project.metadata.title}
            </div>
            <div className="relative">
              <button onClick={() => setIsShareOpen(!isShareOpen)}>
                <Image
                  src="/three-dots.png"
                  alt="three-dots"
                  width={40}
                  height={40}
                />
              </button>
              {isShareOpen && shareOverlay}
            </div>
          </div>
          <div className="flex items-center justify-center my-3">
            <button
              className="bg-[#AF3BC9] rounded-md"
              onClick={() => setShowDetails(!showDetails)}
            >
              <div className="mx-3 text-white">Details</div>
            </button>
          </div>
          <div className="my-3 flex flex-grow h-full">
            <div className="overflow-y-auto max-h-[400px]">
              <ReactMarkdown>{project.metadata.description}</ReactMarkdown>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mt-5">
            <Image
              src={`https://d16c97c2np8a2o.cloudfront.net/ipfs/${project.metadata.bannerImg}`}
              alt="banner"
              width={1000}
              height={100}
              onError={(e) => {
                if (e.currentTarget.src === project.metadata.bannerImg) {
                  e.currentTarget.src = `https://ipfs.io/ipfs/${project.metadata.bannerImg}`; // Second fallback image URL
                } else if (
                  e.currentTarget.src ===
                  `https://ipfs.io/ipfs/${project.metadata.bannerImg}`
                ) {
                  e.currentTarget.src = "/default-banner.jpg"; // Third fallback image URL
                }
              }}
            />
          </div>
          <div className="flex justify-between mt-3">
            <div>
              <Image
                src={`https://d16c97c2np8a2o.cloudfront.net/ipfs/${project.metadata.logoImg}`}
                alt="logo"
                width={40}
                height={40}
                className="rounded-full bg-white"
                onError={(e) => {
                  if (
                    e.currentTarget.src ===
                    `https://d16c97c2np8a2o.cloudfront.net/ipfs/${project.metadata.logoImg}`
                  ) {
                    e.currentTarget.src = `https://ipfs.io/ipfs/${project.metadata.logoImg}`; // Second fallback image URL
                  } else if (
                    e.currentTarget.src ===
                    `https://ipfs.io/ipfs/${project.metadata.logoImg}`
                  ) {
                    e.currentTarget.src = "/default-logo.png"; // Third fallback image URL
                  }
                }}
              />
            </div>
            <div className="text-xl text-[#AF3BC9]">
              {project.metadata.title}
            </div>
            <div className="relative">
              <button onClick={() => setIsShareOpen(!isShareOpen)}>
                <Image
                  src="/three-dots.png"
                  alt="three-dots"
                  width={40}
                  height={40}
                />
              </button>
              {isShareOpen && shareOverlay}
            </div>
          </div>
          <div className="mx-3 my-3 flex-grow rounded-md flex flex-col h-full bg-[#AF3BC9]">
            <div className="flex-grow h-3/4 text-lg text-white text-center flex items-center justify-center mx-3">
              {project.metadata.shortDescription}
            </div>
            <div className="h-1/4 flex items-center justify-center mb-10 mt-3">
              <button
                className="bg-white rounded-md"
                onClick={() => setShowDetails(!showDetails)}
              >
                <div className="mx-3 text-[#AF3BC9]">Read more</div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
