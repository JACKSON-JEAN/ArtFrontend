import HeroSection from "../components/HeroSection";
import SubServices from "../components/SubServices";
import FeaturedArtwork from "../components/FeaturedArtwork";

import Subscribe from "../components/Subscribe";
import HappyCollectors from "../components/HappyCollectors";
import { Helmet } from "@dr.pogodin/react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Pearl Art Galleries | Original African Art Collections</title>
        <meta
          name="description"
          content="Discover and buy original African art, paintings, and sculptures from talented artists across Africa. Explore unique collections and support African creativity."
        />
        <link rel="canonical" href="https://www.pearlartgalleries.com/" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Pearl Art Galleries | Original African Art Collections"
        />
        <meta
          property="og:description"
          content="Explore a curated selection of original African art, paintings, and sculptures by Africa’s most inspiring artists."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dsawd9eso/image/upload/v1760267152/kampala_1_jltha2.jpg"
        />
        <meta property="og:url" content="https://www.pearlartgalleries.com/" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Pearl Art Galleries | Original African Art Collections"
        />
        <meta
          name="twitter:description"
          content="Shop original African art and discover inspiring collections by talented artists across Africa."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dsawd9eso/image/upload/v1760267152/kampala_1_jltha2.jpg"
        />

        {/* Keywords */}
        <meta
          name="keywords"
          content="African art, Original African art for sale, Art for sale, Original art, buy African paintings, African sculptures, contemporary African art, Pearl Art Galleries, African artists, art collections, online art gallery"
        />
      </Helmet>

      <div
        className={`${"wrapper "} w-full px-10 sm:px-16 min-h-screen pt-3 bg-slate-100`}
      >
        <HeroSection />
        <SubServices />
        <FeaturedArtwork />
        <HappyCollectors />
        <Subscribe />
      </div>
    </>
  );
};

export default Home;
