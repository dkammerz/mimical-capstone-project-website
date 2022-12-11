import React, { ReactNode, useEffect, useState } from "react";
import Navbar from "./navbar/navbar";
import { useRouter } from "next/router";
import axios from "axios";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    {children}
  </div>
);

export default Layout;
