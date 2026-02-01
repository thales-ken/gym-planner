'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const BottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: 'dashboard' },
    { href: '/plans', label: 'Plans', icon: 'description' },
    { href: '/routines', label: 'Routines', icon: 'fitness_center' },
    { href: '/profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 px-6 py-2 flex justify-between items-center z-10 max-w-md mx-auto">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive
                ? 'text-primary'
                : 'text-gray-500'
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
