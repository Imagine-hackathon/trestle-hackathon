import Image from "next/image";
import Link from "next/link";
import Logo from '/public/assets/logo.png'
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/ModeToggle";

const Navbar = () => {
  return (
    <nav className="sticky top-0 py-3 z-[1000]">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          <Link href="/" className="hover:cursor-pointer">
            <Image
              src={Logo}
              alt="Logo"
              className="h-8 w-auto ml-4 md:ml-28 mt-4 cursor-pointer"
            />
          </Link>
          <div className="flex items-center space-x-4 mt-4">
            <Button variant="link" className=""><Link href="/login">Login</Link></Button>
            <Button variant="link" className="text-imagine-blue"><Link href="/signup">Sign up</Link></Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;