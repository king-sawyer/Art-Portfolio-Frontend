import "./App.css";
import React from "react";
import { Route, Link } from "react-router-dom";
import Header from "./Header/Header";
import MainPage from "./MainPage/MainPage";
import AboutPage from "./AboutPage/AboutPage";
import Art from "./Art/Art";
import Contact from "./Contact/Contact";
import Shop from "./Shop/Shop";
import Login from "./Login/Login";
import Cart from "./Shop/Cart/Cart";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IconContext } from "react-icons/lib";

class App extends React.Component {
  state = {
    products: [],
    art: [],
    cart: [],
  };

  componentDidMount() {
    fetch("https://vast-fjord-46474.herokuapp.com/products")
      .then((response) => {
        if (!response.ok) {
          return response.json().then((e) => Promise.reject(e));
        }
        return response.json();
      })
      .then((products) => {
        this.setState({ products });
      })
      .catch((error) => {
        console.error(error);
      });
    fetch("https://vast-fjord-46474.herokuapp.com/art")
      .then((response) => {
        if (!response.ok) {
          return response.json().then((e) => Promise.reject(e));
        }
        return response.json();
      })
      .then((art) => {
        this.setState({ art });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleCart = (e, info, { item }) => {
    e.preventDefault();
    const { buttonValue, size } = info;
    const cartItem = {
      id: buttonValue.value,
      size: size.value,
      price: item.price,
      image: item.product_image,
      title: item.product_title,
    };
    this.setState({
      cart: [...this.state.cart, cartItem],
    });
  };
  removeFromCart = (item, e) => {
    e.preventDefault();
    this.setState({
      cart: this.state.cart.filter((product) => product.id !== item.id),
    });
  };

  render() {
    const featuredProducts = this.state.products.filter((product) => {
      return product.featured === true;
    });
    return (
      <div className="App">
        <Header />
        <Link to="/cart">
          <IconContext.Provider value={{ size: "50px" }}>
            <AiOutlineShoppingCart className="iconApp" />
          </IconContext.Provider>
        </Link>

        <Route
          path="/shop"
          render={(rprops) => (
            <Shop handleCart={this.handleCart} products={this.state.products} />
          )}
        />
        <Route
          exact
          path="/"
          render={(rprops) => <MainPage featuredProducts={featuredProducts} />}
        />
        <Route path="/about" component={AboutPage} />
        <Route path="/art" render={(rprops) => <Art art={this.state.art} />} />
        <Route path="/contact" component={Contact} />
        <Route
          path="/admin"
          render={(rprops) => (
            <Login products={this.state.products} {...rprops} />
          )}
        />
        <Route
          path="/cart"
          render={(rprops) => (
            <Cart
              cart={this.state.cart}
              products={this.state.products}
              removeFromCart={this.removeFromCart}
            />
          )}
        />
      </div>
    );
  }
}
export default App;
