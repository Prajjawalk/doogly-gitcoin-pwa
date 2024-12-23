import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Doogly",
    short_name: "Doogly",
    description: "A mobile-friendly donation platform for gitcoin projects",
    start_url: "/",
    display: "standalone",
    background_color: "white",
    theme_color: "#AF3BC9",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
