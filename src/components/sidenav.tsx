"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { logout } from "@/utils/action";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { isAdmin } from "@/lib/db/read";

// Icon Components
function Icon({ children, className }: { children: React.ReactNode; className: string }) {
  return <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{children}</svg>;
}

function MenuIcon(props: any) {
  return (
    <Icon {...props} className="h-6 w-6">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </Icon>
  );
}

// Navigation Link Component
function NavLink({ href, iconSrc, children, isActive }: { href: string; isActive?: boolean; iconSrc: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn("flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50",
        isActive ? "text-primary-900 bg-gray-200" : "text-black"
      )}
      prefetch={false}
    >
      <Image src={iconSrc} alt="Icon" width={20} height={20} className="h-5 w-5 " />
      {children}
    </Link>
  );
}

// Main Component
export default function SideNav() {
  const pathname = usePathname();
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    // Check if the user is an admin
    const checkAdmin = async () => {
      const adminStatus = await isAdmin();
      setAdmin(adminStatus);
    };
    checkAdmin();
  }, []);

  const isAdminRoute = pathname.startsWith("/admin");
  const navItems = [
    {
      name: "Dashboard",
      href: isAdminRoute ? "/admin" : "/",
      icon: '/icon/Home.svg',
    },
    isAdminRoute && admin && {
      name: "Inventory",
      href: "/admin/inventory",
      icon: '/icon/Inventory.png',
    },
    isAdminRoute && admin && {
      name: "Reports",
      href: "/admin/reports",
      icon: '/icon/Report.svg',
    },
    isAdminRoute && admin && {
      name: "Suppliers",
      href: "/admin/suppliers",
      icon: '/icon/Suppliers.svg',
    },
    isAdminRoute && admin && {
      name: "Sales",
      href: "/admin/sales",
      icon: '/icon/Order.svg',
    },
    isAdminRoute && admin && {
      name: "Recent Sales",
      href: "/",
      icon: '/icon/Manage.svg',
    },
    !isAdminRoute && admin && {
      name: "Admin",
      href: "/admin",
      icon: '/icon/Inventory.png',
    },
  ].filter(Boolean) as Array<{ name: string; href: string; icon: string }>; 
  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <div className="hidden lg:block lg:w-64 lg:shrink-0 lg:border-r lg:bg-white dark:lg:bg-gray-800">
        <div className="flex h-full flex-col justify-between py-6 px-4">
          <div className="space-y-6">
            <Link href="/" className=" " prefetch={false}>
              <Image src="/logo.svg" alt="Acme Inc" width={32} height={32} className=" w-28 h-auto mx-auto" />
            </Link>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return <NavLink key={item.name} href={item.href} iconSrc={item.icon} isActive={isActive}>{item.name}</NavLink>
              })}
            </nav>
          </div>
          <div className="space-y-4">
            <Button onClick={handleLogout} className="flex items-center bg-white text-black hover:text-white space-x-2">
              <Image src="/icon/Log Out.svg" alt="Log Out" width={24} height={24} />
              <span>Log Out</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="">
        <header className="sticky top-0 z-10 border-b bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900 lg:hidden">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold" prefetch={false}>
              <Image src="/logo.svg" alt="Acme Inc" width={32} height={32} className=" w-28 h-auto mx-auto" />
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="flex h-full flex-col justify-between py-6 px-4">
                  <div className="space-y-6">
                    <nav className="space-y-1">
                      {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return <NavLink key={item.name} href={item.href} iconSrc={item.icon} isActive={isActive}>{item.name}</NavLink>
                      })}
                    </nav>
                  </div>
                  <div className="space-y-4">
                    <Button onClick={handleLogout} className="flex items-center bg-white text-black hover:text-white space-x-2">
                      <Image src="/icon/Log Out.svg" alt="Log Out" width={24} height={24} />
                      <span>Log Out</span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>
      </div>
    </>
  );
}
