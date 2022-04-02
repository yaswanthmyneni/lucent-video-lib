import "./home-page.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { CategoryCard } from "components";
import { Link } from "react-router-dom";
import HomeImage from "assets/images/home.jpeg";

const HomePage = () => {
  const [categoryList, setCategoryList] = useState([]);

  // getting category data
  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/categories");
      setCategoryList(response.data.categories);
    })();
  }, []);

  return (
    <main className="home">
      <section className="hero">
        <img className="image-resp" src={HomeImage} alt="hero" />
      </section>
      <section className="category">
        <h2>Categories:</h2>
        <div className="category-container flex gap-1rem">
          {categoryList.map((categoryData) => (
            <Link
              to={`/category/${categoryData.categoryName}`}
              onClick={() =>
                localStorage.setItem("categoryName", categoryData.categoryName)
              }
              key={categoryData._id}
            >
              <CategoryCard categoryData={categoryData} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export { HomePage };
