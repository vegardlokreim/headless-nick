import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import { useRouter } from "next/router";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter(); // Get router instance
  const showNavbar = router.pathname !== "/login"; // Check if the current path is NOT "/login"
  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
};

export default Layout;
