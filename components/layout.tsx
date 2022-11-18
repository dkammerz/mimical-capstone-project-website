import React, { ReactNode } from "react";
import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";

type Props = {
  children: ReactNode;
  title?: string;
};

const Layout = ({
  children,
  title = "TypeScript Next.js Stripe Example",
}: Props) => (
  <div className="flexbox">
    {" "}
    {/* for sticky navbar and footer */}
    <Navbar />
    {children}
    <Footer />
  </div>
);

export default Layout;
