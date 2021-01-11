import "./MainPage.css";

import { AiOutlineInstagram } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { Link } from "react-router-dom";

function MainPage(props) {
  return (
    <div className="MainPage">
      <ul className="mainPageUl">
        <li className="mainPageLi">
          <img src="/Images/GatorLeft.png" alt="imgLeft" />
        </li>
        <li className="mainPageLi">
          <img src="/Images/CenterFace.jpg" alt="imgCenter" />
        </li>
        <li className="mainPageLi">
          <img
            src="/Images/GatorCircleDEMO3rdEditionRight.png"
            alt="imgRight"
          />
        </li>
      </ul>
      <hr />

      <div className="mainProductsDiv">
        <ul className="mainProducts">
          {props.featuredProducts.map((product) => {
            return (
              <li>
                <img src={product.product_image} alt={product.product_title} />
                <p>{product.product_title}</p>
              </li>
            );
          })}
        </ul>
        <hr />
        <a href="https://www.instagram.com/brandanowitzz/">
          <IconContext.Provider value={{ size: "70px" }}>
            <AiOutlineInstagram className="instaIconMain" />
          </IconContext.Provider>
        </a>
        <Link to="/admin">
          <u>
            {" "}
            <p className="adminButton">Admin</p>
          </u>
        </Link>
      </div>
    </div>
  );
}

export default MainPage;
