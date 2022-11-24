import React, { ReactNode } from "react";
import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";
import PatientList from "./patient-list/PatientList";

type Props = {
  children: ReactNode;
  title?: string;
};

const Layout = ({
  children,
  title = "TypeScript Next.js Stripe Example",
}: Props) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    {children}
  </div>
);

export default Layout;
