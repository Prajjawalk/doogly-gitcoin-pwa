"use client";
import { useLogin, usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";

const Index = () => {
  const router = useRouter();
  const { ready, authenticated } = usePrivy();
  const { login } = useLogin({
    // Set up an `onComplete` callback to run when `login` completes
    onComplete(user, isNewUser, wasPreviouslyAuthenticated) {
      console.log("🔑 ✅ Login success", {
        user,
        isNewUser,
        wasPreviouslyAuthenticated,
      });
      router.push("/");
    },
    // Set up an `onError` callback to run when there is a `login` error
    onError(error) {
      console.log("🔑 🚨 Login error", { error });
    },
  });

  return (
    <>
      <main>
        <div className="flex h-screen flex-col items-center justify-center">
          <h2 className="my-4 text-xl font-semibold text-gray-800">
            Please Sign-in to Doogly
          </h2>
          <div className="mt-2 w-1/2">
            <button
              className="my-4 w-full rounded-md bg-[#AF3BC9] px-3.5 py-2.5 text-sm text-white shadow-sm disabled:bg-[#CD70E1]"
              onClick={login}
              // Always check that Privy is `ready` and the user is not `authenticated` before calling `login`
              disabled={!ready || authenticated}
            >
              Login
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Index;
