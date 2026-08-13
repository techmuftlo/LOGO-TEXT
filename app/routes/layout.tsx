import { useState } from "react";
import { Outlet } from "react-router";

import Header from "../components/Header";
import Footer from "../components/Footer";
import MobileBottomNav from "../components/MobileBottomNav";

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  return (
    <>
      <Header
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
      />

      <main className="page-content">
        <Outlet />
      </main>

      <Footer />

      <MobileBottomNav
        openCategoryMenu={() => {
          setMobileMenuOpen(true);
        }}
      />
    </>
  );
}