import "./Shop.css";

import { AiOutlineInstagram } from "react-icons/ai";
import { IconContext } from "react-icons/lib";

function Shop(props) {
  return (
    <div className="ShopDiv">
      <h2 className="shoph2">Shop</h2>
      <ul className="shopUl">
        {props.products.map((item) => {
          return (
            <li key={item.id} className="shopLi">
              <img src={item.product_image} alt={item.product_title} />
              <p>{item.product_title}</p>

              <p>{item.price}$</p>
              <form onSubmit={(e) => props.handleCart(e, e.target, { item })}>
                <label>
                  Size:{" "}
                  <select name="size">
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                  </select>
                </label>{" "}
                <button type="submit" name="buttonValue" value={item.id}>
                  Add to cart
                </button>
              </form>
            </li>
          );
        })}
      </ul>
      <hr />

      <a href="https://www.instagram.com/brandanowitzz/">
        <IconContext.Provider value={{ size: "70px" }}>
          <AiOutlineInstagram className="instaIconShop" />
        </IconContext.Provider>
      </a>
    </div>
  );
}

export default Shop;
