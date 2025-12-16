import CategoriesCard from "../CategoriesCard";
import HomeBanner from "../HomeBanner";
import NearbyStores from "../NearbyStores";
import Highlights from "../Highlights";
import FeaturedStores from "../FeaturedStores";
import Stores from "../Stores";
import Footer from "../Footer";
import CommonConcern from "../CommonConcern";



export default function Home() {
  return (
    <div className="home">
      <HomeBanner />
      <CategoriesCard />
      <CommonConcern />
      <NearbyStores />
      <Highlights />
      <FeaturedStores />
      <Stores />
      <Footer />
    </div>
  );
}
