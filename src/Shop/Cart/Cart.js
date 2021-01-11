import React from "react";
import { GiCancel } from "react-icons/gi";
import "./Cart.css";
import StripeCheckout from "react-stripe-checkout";

class Cart extends React.Component {
  handleToken = (token, addresses) => {};
  render(props) {
    let cartPrice = 0;
    for (let i = 0; i < this.props.cart.length; i++) {
      cartPrice += this.props.cart[i].price;
    }

    return (
      <div>
        {!this.props.cart[0] ? (
          <div className="cartUl">
            <p>Your cart is empty!</p>
          </div>
        ) : (
          <div>
            <ul className="cartUl">
              {this.props.cart.map((item) => {
                return (
                  <div className="liContainter">
                    <div>
                      <li className="rowContainer" key={item.id}>
                        <div className="cartLiImg">
                          <img src={item.image} alt={item.title} />
                        </div>

                        <div className="cartLiText">
                          <p>
                            {item.title}
                            {"  "}
                          </p>
                          <p>
                            {item.size} {item.price}$
                          </p>
                          <p>
                            Click here to remove item from cart:{" "}
                            <GiCancel
                              onClick={(e) =>
                                this.props.removeFromCart(item, e)
                              }
                            />
                          </p>
                        </div>
                      </li>
                      <hr />
                    </div>
                  </div>
                );
              })}
            </ul>
            <div className="priceIsRight">
              <p>
                <b>Total Price: {cartPrice} $</b>
              </p>
              <StripeCheckout
                stripeKey="pk_test_51I8BnTGKOLFYdEkLrx29klhbY7Vu2BflYLTa8xkW5LtY0Jlifu9a3mxYSJGcqPibAYMdM6muoTZqKCt1tDJDof7v00k8MR94Yg"
                token={this.handleToken}
                billingAddress
                shippingAddress
                amount={cartPrice * 100}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Cart;
