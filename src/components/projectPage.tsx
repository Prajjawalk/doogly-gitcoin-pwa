"use client";

import Image from "next/image";
import { useState } from "react";
import { ProjectData } from "../data/projectData";

interface ProjectPageProps {
  projectIndex: number;
}

export default function ProjectPage({ projectIndex }: ProjectPageProps) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const project = ProjectData(projectIndex);

  if (!project) {
    return <div>Project not found</div>;
  }

  const shareOverlay = (
    <div className="absolute right-0 mt-2 w-10 bg-white rounded-md shadow-lg py-1 z-10">
      <Image
        src="/twitter.png"
        alt="twitter"
        width={40}
        height={40}
        className="p-2"
      />
      <Image
        src="/website.png"
        alt="website"
        width={40}
        height={40}
        className="p-2"
      />
      <Image
        src="/gitcoin-logo.png"
        alt="gitcoin-logo"
        width={40}
        height={40}
        className="p-2"
      />
      <Image
        src="/share.png"
        alt="share"
        width={40}
        height={40}
        className="p-2"
      />
    </div>
  );

  return (
    <div className="flex flex-col flex-grow h-full">
      {showDetails ? (
        <>
          <div className="flex justify-between mt-3">
            <div>
              <Image
                src={project.logoImageUrl}
                alt="logo"
                width={40}
                height={40}
                className="rounded-full bg-white"
              />
            </div>
            <div className="text-2xl text-[#AF3BC9]">{project.title}</div>
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
              {project.description}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mt-5">
            <Image
              src={project.bannerImageUrl}
              alt="banner"
              width={1000}
              height={100}
            />
          </div>
          <div className="flex justify-between mt-3">
            <div>
              <Image
                src={project.logoImageUrl}
                alt="logo"
                width={40}
                height={40}
                className="rounded-full bg-white"
              />
            </div>
            <div className="text-2xl text-[#AF3BC9]">{project.title}</div>
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
              {project.shortDescription}
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