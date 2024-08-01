import Landing from "@/components/Landing";
import Navbar from "../components/Navbar";
import { Toaster } from "@/components/ui/toaster";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Landing />
      <Toaster />
    </main>
  );
};

export default Home;
