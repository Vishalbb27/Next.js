import Hero from "@/components/hero";
import relyImg from "../../../public/reliability.jpg"

const ReliablityPage = () => {
  return (
    <Hero
      imageData={relyImg}
      imgAlt="welding"
      title="Super high reliablility application"
    />
  );
};

export default ReliablityPage;
