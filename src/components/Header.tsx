
import React from 'react';
import MobileHeader from './header/MobileHeader';
import DesktopHeader from './header/DesktopHeader';

export default function Header() {
  return (
    <header className="w-full border-b bg-background">
      <MobileHeader />
      <DesktopHeader />
    </header>
  );
}
