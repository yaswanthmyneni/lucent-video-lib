import "./category-card.css";

const CategoryCard = ({ categoryData: { categoryName, image } }) => {
  return (
    <section className="cursor card-pos-rel">
      <div className="category-image-container">
        <img
          className="image-resp border-radius"
          src={image}
          alt={categoryName}
        />
      </div>
      <div className="card-overlay"></div>
      <div className="card-text-overlay">
        <h3>{`${categoryName.toUpperCase()}`}</h3>
      </div>
    </section>
  );
};

export { CategoryCard };
