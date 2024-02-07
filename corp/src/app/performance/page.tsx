import pefoImg from '../../../public/performance.jpg'
import Hero from '@/components/hero';

const PerformancePage = () => {
  return (
    <Hero
      imageData={pefoImg}
      imgAlt="welding"
      title="We serve high performance applications"
    />
  );
};

export default PerformancePage;
