import { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

export const defaultMetadata: Metadata = {
  title: "Central Trademark Revival®",
  description:
    "At Central Trademark Revival®, we specialize in helping you breathe new life into your dead or abandoned trademark applications. Our mission is to provide expert guidance and free consultations to help you navigate the trademark revival process seamlessly. With our trusted team by your side, your trademark aspirations are closer than ever.",

  creator: "Zevitech",

  applicationName: "Central Trademark Revival®",

  icons: {
    icon: [
      {
        rel: "icon",
        type: "image/png",
        url: "/favicons/logo-512x512.png",
        sizes: "512x512",
      },
      {
        rel: "icon",
        type: "image/png",
        url: "/favicons/logo-192x192.png",
        sizes: "192x192",
      },
      {
        rel: "icon",
        type: "image/png",
        url: "/favicons/logo-96x96.png",
        sizes: "96x96",
      },
      {
        rel: "icon",
        type: "image/png",
        url: "/favicons/logo.png",
        sizes: "834x408",
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        url: "/favicons/logo.svg",
      },
      {
        rel: "icon",
        type: "image/x-icon",
        url: "/favicons/favicon.ico",
      },
      {
        rel: "shortcut icon",
        type: "image/x-icon",
        url: "/favicons/favicon.ico",
      },
    ],
    apple: [
      {
        rel: "apple-touch-icon",
        url: "/favicons/apple-icon.png",
        sizes: "180x180",
      },
    ],
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title: "Central Trademark Revival®",
    description:
      "At Central Trademark Revival®, we specialize in helping you breathe new life into your dead or abandoned trademark applications. Our mission is to provide expert guidance and free consultations to help you navigate the trademark revival process seamlessly. With our trusted team by your side, your trademark aspirations are closer than ever.",
    siteName: "Central Trademark Revival®",
    images: [
      {
        url: "/favicons/logo.svg",
        width: 96,
        height: 58,
        alt: "Central Trademark Revival®",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Central Trademark Revival®",
    description:
      "At Central Trademark Revival®, we specialize in helping you breathe new life into your dead or abandoned trademark applications. Our mission is to provide expert guidance and free consultations to help you navigate the trademark revival process seamlessly. With our trusted team by your side, your trademark aspirations are closer than ever.",
    images: "/favicons/logo.svg",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export function GetPageMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return {
    ...defaultMetadata,
    ...overrides,
    title: overrides.title ?? defaultMetadata.title,
    description: overrides.description ?? defaultMetadata.description,
    openGraph: {
      ...defaultMetadata.openGraph,
      ...overrides.openGraph,
      title: overrides.title || defaultMetadata.openGraph?.title,
      description:
        overrides.description || defaultMetadata.openGraph?.description,
    },
    twitter: {
      ...defaultMetadata.twitter,
      ...overrides.twitter,
      title: overrides.title || defaultMetadata.twitter?.title,
      description:
        overrides.description || defaultMetadata.twitter?.description,
    },
  };
}
