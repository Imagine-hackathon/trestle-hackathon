import Landing from "@/components/Landing";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Landing/>
    </main>
  );
}

export default Home