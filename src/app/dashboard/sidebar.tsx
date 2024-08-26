import { Button } from "@/components/ui/button";
import { Home, Briefcase, Users, Settings } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "/public/assets/logo.png";
import { usePathname, useRouter } from "next/navigation";

type Props = {};

const Sidebar = (props: Props) => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const pathName = usePathname();
  const menuItems = [
    { name: "dashboard", icon: Home, label: "Dashboard", link: "/dashboard" },
    {
      name: "postjob",
      icon: Briefcase,
      label: "Post Job",
      link: "/jobportal/create",
    },
    {
      name: "applications",
      icon: Users,
      label: "Applications",
      link: "/dashboard/applications",
    },
    {
      name: "settings",
      icon: Settings,
      label: "Settings",
      link: "/dashboard/settings",
    },
  ];

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center ">
            <Image
              src={Logo}
              alt="Logo"
              className="h-6 w-auto mt-4 cursor-pointer"
            />
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {menuItems.map((item) => {
              return (
                <Link
                  key={item.name}
                  href={item.link}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted ${
                    pathName === item.link
                      ? "bg-muted text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  onClick={() => setActiveItem(item.name)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
