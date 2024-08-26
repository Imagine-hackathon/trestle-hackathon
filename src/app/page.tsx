import Landing from "@/components/Landing";
import Navbar from "../components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Landing />
      <Toaster />
      <Footer />
    </main>
  );
};

export default Home;
