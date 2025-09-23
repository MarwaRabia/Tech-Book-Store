import "./SCSS/banner.scss";
import { NavLink } from "react-router-dom";

export default function TopBanner({ onSearch, compact = false }) {
  return (
    <div className={`top-banner ${compact ? "compact" : ""}`}>
      {/* Background slides */}
      <div className="bg-slide bg1"></div>
      <div className="bg-slide bg2"></div>
      <div className="bg-slide bg3"></div>
      <div className="bg-slide bg4"></div>
      <div className="bg-slide bg5"></div>
      <div className="bg-slide bg6"></div>
      {/* Overlay */}
      <div className="overlay"></div>

      {/* Banner content */}
      <div className="banner-content">
        <h1>
          Welcome to <span>TechBooks Store</span>
        </h1>
        <p>Discover the latest books in programming, AI, and technology 🚀</p>

        <NavLink to="/search" className="nav-link">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for books or categories..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearch(e.target.value);
                  e.target.value = "";
                }
              }}
            />
            <button
              onClick={() => {
                const input = document.querySelector(".search-bar input");
                onSearch(input.value);
                input.value = "";
              }}
            >
              Search
            </button>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
