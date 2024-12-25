"use client";
import ProjectPage from "@/components/projectPage";
import Image from "next/image";
import { useState, useEffect } from "react";
import AuthenticatedPage from "@/components/AuthenticatedPage";
import { useLogout, usePrivy } from "@privy-io/react-auth";
import Checkout from "@/components/CheckoutPage";
import Profile from "@/components/ProfilePage";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [counter, setCounter] = useState(2);
  const [isVisible, setIsVisible] = useState(false);
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [currentDisplay, setCurrentDisplay] = useState("project");
  const [shoppingBag, setshoppingBag] = useState<Set<number>>(new Set([]));
  const { ready, authenticated } = usePrivy();
  const { logout } = useLogout();
  const [projects, setProjects] = useState();

  const handleCounterChange = (newCounter: number) => {
    setIsVisible(false);
    setCounter(newCounter);
  };

  const getProjects = async () => {
    const dbdata = await fetch("/api/projects");
    const whitelistedProjects = await dbdata.json();
    const response = await fetch(
      process.env.NEXT_PUBLIC_ALLO_GRAPHQL_ENDPOINT as unknown as URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          query MyQuery {
            projects(
              condition: {chainId: 42161}
              filter: {and:{id: {in: ${JSON.stringify(
                whitelistedProjects.projectids
              )}}}}
            ) {
              metadata
              id
              nonce
              name
              roles(condition: {role: OWNER}) {
                address
              }
            }
          }
        `,
        }),
      }
    );

    const data = await response.json();
    return data.data.projects;
  };

  useEffect(() => {
    const getprojects = async () => {
      const projects = await getProjects();
      await Promise.all(
        projects.map(async (p: any) => {
          const projectShortDescription = await fetch(`/api/shortdescription`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              profileId: p.id,
              description: p.metadata.description,
            }),
          });
          p["metadata"]["shortDescription"] = (
            await projectShortDescription.json()
          )?.["shortDescription"];
        })
      );
      setProjects(projects);
    };

    if (!projects) {
      getprojects();
    }
  }, [projects]);

  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => setIsVisible(true), 300);
      return () => clearTimeout(timer);
    }

    setIsVisible(true);
  }, [counter, isVisible]);

  const renderSection = (section: string) => {
    switch (section) {
      case "project":
        return (
          <>
            {isVisible ? (
              <div
                className={` fade-in flex flex-col flex-grow h-full ${
                  isVisible ? "fade-in-enter-active" : "fade-in-enter"
                }`}
              >
                <ProjectPage project={projects?.[counter]} />
              </div>
            ) : (
              <div className="flex flex-col flex-grow h-full"></div>
            )}
          </>
        );
      case "checkout":
        return (
          <Checkout
            projects={projects}
            project={Array.from(shoppingBag)}
            displayChanger={setCurrentDisplay}
            shoppingbagChanger={setshoppingBag}
          />
        );
      case "profile":
        return <Profile displayChanger={setCurrentDisplay} />;
      default:
        return (
          <>
            {isVisible ? (
              <div
                className={` fade-in flex flex-col flex-grow h-full ${
                  isVisible ? "fade-in-enter-active" : "fade-in-enter"
                }`}
              >
                <ProjectPage project={projects?.[counter]} />
              </div>
            ) : (
              <div className="flex flex-col flex-grow h-full"></div>
            )}
          </>
        );
    }
  };

  return (
    <AuthenticatedPage>
      <div className="container h-screen max-h-screen">
        <div className="flex flex-col flex-grow h-full">
          <div className="flex justify-between x-auto mt-1">
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
                    onClick={() => setCurrentDisplay("profile")}
                  >
                    My Profile
                  </button>
                  {/* <button
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
                  </button> */}
                  {ready && authenticated && (
                    <button
                      className="block px-4 py-2 text-sm text-[#AF3BC9] hover:text-white hover:bg-[#AF3BC9] w-full text-left"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {renderSection(currentDisplay)}
          {currentDisplay == "project" && (
            <div className="flex justify-between p-1">
              <Image
                src="/point.png"
                alt="point"
                width={40}
                height={40}
                className="opacity-50"
              />
              <button
                onClick={() => {
                  handleCounterChange(counter - 1);
                  setIsHeartClicked(false);
                }}
                disabled={counter == 0}
              >
                <Image
                  src="/left-arrow.png"
                  alt="left-arrow"
                  width={40}
                  height={40}
                  className={counter === 0 ? "opacity-50" : ""}
                />
              </button>
              <button
                onClick={() => {
                  if (!isHeartClicked) {
                    shoppingBag.add(counter);
                  } else {
                    shoppingBag.delete(counter);
                  }
                  setIsHeartClicked(!isHeartClicked);
                }}
              >
                <Image
                  src={isHeartClicked ? "/heart.png" : "/heart-outline.png"}
                  alt="heart"
                  width={40}
                  height={40}
                />
              </button>
              <button
                disabled={
                  projects && counter === (projects?.length as number) - 1
                }
                onClick={() => {
                  handleCounterChange(counter + 1);
                  setIsHeartClicked(false);
                }}
              >
                <Image
                  src="/right-arrow.png"
                  alt="right-arrow"
                  width={40}
                  height={40}
                  className={
                    counter === (projects?.length as number) - 1
                      ? "opacity-50"
                      : ""
                  }
                />
              </button>
              <button
                onClick={() => setCurrentDisplay("checkout")}
                className="relative"
              >
                {shoppingBag.size > 0 && (
                  <div className="absolute top-0 left-0 bg-[#AF3BC9] text-white rounded-full w-5 h-5 flex items-center justify-center">
                    {shoppingBag.size}
                  </div>
                )}
                <Image
                  src="/shopping-bag.png"
                  alt="shopping-bag"
                  width={40}
                  height={40}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedPage>
  );
}
