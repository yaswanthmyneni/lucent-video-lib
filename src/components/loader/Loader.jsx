import loader from "assets/images/loader.svg";
import './loader.css';

const Loader = () => {
  return (
    <section className="loader text-center">
      <img src={loader} className="loader-img" alt="Animated loader" />
    </section>
  );
};

export { Loader };
