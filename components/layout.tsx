import React, { ReactNode } from "react";
import Navbar from "./navbar/navbar";
import Head from "next/head";
import Favicon from "../public/mimical_logo.ico";
import Link from "next/link";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => (
  <div className="min-h-screen flex flex-col">
    <Head>
      <title>Mimical Therapist Dashboard</title>
    </Head>
    <Navbar />
    {children}
  </div>
);

export default Layout;
