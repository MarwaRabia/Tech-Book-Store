import { useState } from "react";
import CategoriesSection from "../components/Categories/CategoriesSection";
import TopBanner from "./TopBanner";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import FeaturedSlider from "../components/featuredSlider/FeaturedSlider";

export const categories = [
  {
    id: 1,
    title: "Web Development",
    slug: "web-development",
    query: "web development programming",
    imgURL:
      "https://cdn.iconscout.com/icon/premium/png-512-thumb/web-development-icon-svg-download-png-2930842.png?f=webp&w=512",
  },
  {
    id: 2,
    title: "Frontend",
    slug: "frontend",
    query: "frontend design programming",
    imgURL:
      "https://cdn.iconscout.com/icon/free/png-512/free-react-1-282599.png",
  },
  {
    id: 3,
    title: "Backend",
    slug: "backend",
    query: "backend programming",
    imgURL: "https://cdn-icons-png.flaticon.com/512/906/906324.png",
  },
  {
    id: 4,
    title: "Artificial Intelligence",
    slug: "ai",
    query: "artificial intelligence machine learning",
    imgURL:
      "https://cdn.iconscout.com/icon/premium/png-512-thumb/artificial-intelligence-icon-svg-download-png-6985042.png?f=webp&w=512",
  },
  {
    id: 5,
    title: "Machine Learning",
    slug: "machine-learning",
    query: "machine learning python",
    imgURL:
      "https://cdn.iconscout.com/icon/premium/png-512-thumb/machine-learning-icon-svg-download-png-10554130.png?f=webp&w=512",
  },
  {
    id: 6,
    title: "Data Science",
    slug: "data-science",
    query: "data science analysis",
    imgURL:
      "https://cdn.iconscout.com/icon/premium/png-512-thumb/gib-data-icon-svg-download-png-1966726.png?f=webp&w=512",
  },
  {
    id: 7,
    title: "Big Data",
    slug: "big-data",
    query: "big data hadoop spark",
    imgURL:
      "https://cdn.iconscout.com/icon/premium/png-512-thumb/big-data-icon-svg-download-png-9598017.png?f=webp&w=512",
  },
  {
    id: 8,
    title: "Cloud Computing",
    slug: "cloud-computing",
    query: "cloud computing aws azure gcp",
    imgURL:
      "https://cdn.iconscout.com/icon/premium/png-512-thumb/cloud-computing-icon-svg-download-png-2253383.png?f=webp&w=512",
  },
  {
    id: 9,
    title: "Cybersecurity",
    slug: "cybersecurity",
    query: "cybersecurity hacking security",
    imgURL:
      "https://cdn.iconscout.com/icon/premium/png-512-thumb/cybersecurity-icon-svg-download-png-7444476.png?f=webp&w=512",
  },
  {
    id: 10,
    title: "DevOps",
    slug: "devops",
    query: "devops docker kubernetes",
    imgURL: "https://cdn-icons-png.flaticon.com/512/5969/5969059.png",
  },
  {
    id: 11,
    title: "Mobile Development",
    slug: "mobile-development",
    query: "android ios flutter react native",
    imgURL:
      "https://cdn.iconscout.com/icon/premium/png-512-thumb/mobile-development-icon-svg-download-png-866899.png?f=webp&w=512",
  },
  {
    id: 12,
    title: "Game Development",
    slug: "game-development",
    query: "game development unity unreal",
    imgURL:
      "https://cdn.iconscout.com/icon/premium/png-512-thumb/game-development-icon-svg-download-png-3054202.png?f=webp&w=512",
  },
];

const featuredData = [
  { query: "new releases in programming", title: "Newest Releases" },
  {
    query: '"programming bestsellers" OR "top programming books"',
    title: "Bestsellers",
  },
  { query: '"books for coding beginners"', title: "Books for Beginners" },
  { query: "books for coding interviews", title: "For Interview Prep" },
];

function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="home-content">
      {searchQuery ? (
        <>
          <TopBanner onSearch={(q) => setSearchQuery(q)} compact={true} />
          <CategoryPage searchQuery={searchQuery} />
        </>
      ) : (
        <>
          <TopBanner onSearch={(q) => setSearchQuery(q)} />
          <CategoriesSection categories={categories} />
          {featuredData.map((item, index) => (
            <FeaturedSlider key={index} query={item.query} title={item.title} />
          ))}
        </>
      )}
    </div>
  );
}

export default Home;
