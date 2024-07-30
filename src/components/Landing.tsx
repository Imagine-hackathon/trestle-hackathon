import Image from "next/image";

const Landing = () => {
  return (
    <div className="relative h-[80vh] w-full flex flex-col items-center justify-center">
      <div className="relative w-96 h-96 mb-8">
        <Image
          src="/assets/girlPic.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="text-center px-4">
        <h1 className="sm:text-6xl text-4xl font-semibold mb-4">
          Find freelance and fulltime <br /> developer jobs.
        </h1>
        <h3 className="sm:text-base text-sm font-light max-w-[540px] mx-auto">
          Glumos is your one-stop-centre for thousands of digital freelance and fulltime jobs.
        </h3>
      </div>
    </div>
  );
};

export default Landing;