import Hero from "@/components/hero";
import scaleImg from "../../../public/scale.jpg"

const ScalePage = () => {
  return (
    <Hero
      imageData={scaleImg}
      imgAlt="steel factory"
      title="Scale your app to infinity."
    />
  );
};

export default ScalePage;
