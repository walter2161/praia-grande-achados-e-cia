
import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import PageAdvertisement from "../PageAdvertisement";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <PageAdvertisement />
      <Footer />
    </div>
  );
};

export default MainLayout;
