import useAuth from "../hooks/useAuth";
import useGList from "../hooks/useGList";

const Footer = () => {
  const { items } = useGList();
  const currentYear = new Date().getFullYear();
  const { auth, location } = useAuth();
  let footer = "";
  if (location === "main-page") {
    footer = (
      <p>
        {items.length} List {items.length === 1 ? "item" : "items"}
      </p>
    );
  } else {
    footer = (
      <p>
        DGCORP &copy;
        {currentYear}
      </p>
    );
  }

  return <footer>{footer}</footer>;
};

export default Footer;
