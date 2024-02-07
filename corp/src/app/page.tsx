import Image from "next/image";
import homeImg from "@/../public/home.jpg";
import Hero from "@/components/hero";

const Home = () => {
  return (
    <Hero
      imageData={homeImg}
      imgAlt="car factory"
      title="Professional Cloud Hosting"
    />
  );
};

export default Home;
