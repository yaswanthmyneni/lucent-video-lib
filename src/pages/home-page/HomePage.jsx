import "./home-page.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { CategoryCard } from "components";

const HomePage = () => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/categories");
      setCategoryList(response.data.categories);
    })();
  }, []);

  return (
    <>
      <main className="home">
        <section className="hero">
          <img
            className="image-resp"
            src="https://scontent.fhyd11-2.fna.fbcdn.net/v/t39.30808-6/225264609_10159440989214146_3456298355581072175_n.jpg?stp=cp0_dst-jpg_e15_fr_q65&_nc_cat=109&ccb=1-5&_nc_sid=dd9801&_nc_ohc=JyKx1UcAYR8AX-8UqNO&_nc_ht=scontent.fhyd11-2.fna&oh=00_AT9zAKU5KmMI71eEIkvJWqr2xPgkxQRs_kh7uiX3wWscvg&oe=623C667A"
            alt="hero"
          />
        </section>
        <section className="category">
          <h2>Categories:</h2>
          <div className="category-container flex gap-1rem">
            {categoryList.map((categoryData) => (
              <CategoryCard
                key={categoryData._id}
                categoryData={categoryData}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export { HomePage };
