import React from "react";
import Head from "next/head";
import PageClient from "./page-client";

export default function Home() {
  return (
    <div className="">
      <Head>
        <meta name="description" content="Movie Search" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageClient apiKey={process.env.API_KEY || ""} />
    </div>
  );
}
