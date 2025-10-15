import HeroSection from "../components/HeroSection";
import SubServices from "../components/SubServices";
import FeaturedArtwork from "../components/FeaturedArtwork";

import Subscribe from "../components/Subscribe";
import HappyCollectors from "../components/HappyCollectors";

const Home = () => {

  return (
    <>
    <div className={`${"wrapper "} w-full px-10 sm:px-16 min-h-screen pt-3 bg-slate-50`}>
      <HeroSection />
      <SubServices />
      <FeaturedArtwork />
      <HappyCollectors/>
      <Subscribe/>
    </div>
    </>
  );
};

export default Home;
