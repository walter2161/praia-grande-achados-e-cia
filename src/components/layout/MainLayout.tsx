
import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import PageAdvertisement from "../PageAdvertisement";
import MobileSearchBar from "../header/MobileSearchBar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <MobileSearchBar />
      <main className="flex-1">{children}</main>
      <PageAdvertisement />
      <Footer />
    </div>
  );
};

export default MainLayout;
