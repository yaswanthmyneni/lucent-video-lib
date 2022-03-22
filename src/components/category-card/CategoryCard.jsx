import "./category-card.css";
import { Link } from "react-router-dom";

const CategoryCard = ({ categoryData: { categoryName } }) => {
  return (
    <Link className="cursor card-pos-rel" to={`/category/${categoryName}`}>
      <div className="category-image-container">
        <img
          className="image-resp border-radius"
          src="https://scontent.fhyd11-2.fna.fbcdn.net/v/t39.30808-6/225264609_10159440989214146_3456298355581072175_n.jpg?stp=cp0_dst-jpg_e15_fr_q65&_nc_cat=109&ccb=1-5&_nc_sid=dd9801&_nc_ohc=JyKx1UcAYR8AX-8UqNO&_nc_ht=scontent.fhyd11-2.fna&oh=00_AT9zAKU5KmMI71eEIkvJWqr2xPgkxQRs_kh7uiX3wWscvg&oe=623C667A"
          alt={categoryName}
        />
      </div>
      <div className="card-overlay"></div>
      <div className="card-text-overlay">
        <h3>{`${categoryName.toUpperCase()}`}</h3>
      </div>
    </Link>
  );
};

export { CategoryCard };
