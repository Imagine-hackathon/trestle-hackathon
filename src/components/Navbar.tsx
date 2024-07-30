import Image from "next/image";
import Link from "next/link";
import Logo from '/public/assets/logo.png'
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="top-0 py-3 z-[1000]">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          <Link className="hover:cursor-pointer" href={"/"}>
            <Image
              
              src={Logo}
              alt="Logo"
              // unoptimized
              className="h-8 w-auto ml-28 mt-4 cursor-pointer"
            />
          </Link>
          <ul className="hidden lg:flex ml-14 mr-28 space-x-10 mt-4 text-14px">
            <li className="nav-item cursor-pointer"><Button variant="link">Login</Button></li>
            <li className="nav-item cursor-pointer"><Button variant="link" >Sign up</Button></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
