import React from "react";
import "./Admin.css";
import tokenService from "../../services/token-service";
class Admin extends React.Component {
  state = {
    chosenProduct: 0,
    displayModify: false,
    displayAdd: false,
    error: null,
    addMessage: null,
    modifyProductMessage: null,
  };
  handleChange = (id) => {
    this.setState({
      error: null,
      modifyProductMessage: null,
      addMessage: null,
    });
    if (id !== "blank") {
      this.setState({
        chosenProduct: this.props.products.find((product) => {
          return product.id === id;
        }),
      });
      if (id === "blank") {
        this.setState({
          chosenProduct: null,
        });
      }
    }
  };
  displayModify = () => {
    this.setState({
      displayModify: !this.state.displayModify,
    });
  };
  displayAdd = () => {
    this.setState({
      displayAdd: !this.state.displayAdd,
    });
  };

  addProduct = (e) => {
    this.setState({
      addMessage: null,
    });
    e.preventDefault();
    const {
      product_title,
      price,
      quantity,
      product_image,
      featuredSelect,
      categorySelect,
      size,
    } = e.target;
    const newProduct = {
      product_title: product_title.value,
      price: price.value,
      quantity: quantity.value,
      product_image: product_image.value,
      category: categorySelect.value,
      featured: featuredSelect.value,
      size: size.value,
    };

    fetch(`https://vast-fjord-46474.herokuapp.com/products`, {
      method: "post",
      headers: {
        Authorization: "bearer " + tokenService.hasAuthToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((e) => Promise.reject(e));
        } else {
          this.setState({
            addMessage:
              "Product successfully added! To see the product, click on the relevant page and refresh!",
          });
        }
        res.json();
      })

      .catch((error) => {
        console.error(error);
      });
  };

  modifyProduct = (e) => {
    e.preventDefault();
    const {
      product_title,
      price,
      quantity,
      product_image,
      featuredSelect,
      categorySelect,
      size,
    } = e.target;
    const modifiedProduct = {
      id: this.state.chosenProduct.id,
      product_title: product_title.value,
      price: price.value,
      quantity: quantity.value,
      product_image: product_image.value,
      category: categorySelect.value,
      featured: featuredSelect.value,
      size: size.value,
    };

    fetch(`https://vast-fjord-46474.herokuapp.com/products`, {
      method: "PATCH",
      headers: {
        Authorization: "bearer " + tokenService.hasAuthToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(modifiedProduct),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((e) => Promise.reject(e));
        } else {
          this.setState({
            modifyProductMessage: "Product successfully modified!",
          });
        }
      })

      .catch((error) => {
        console.error(error);
      });
  };

  deleteProduct = (e) => {
    this.setState({ error: null });
    e.preventDefault();
    let { id } = this.state.chosenProduct;
    let productToDelete = { id };

    fetch(`https://vast-fjord-46474.herokuapp.com/products`, {
      method: "DELETE",
      headers: {
        Authorization: "bearer " + tokenService.hasAuthToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productToDelete),
    })
      .then((response) => {
        if (!response.ok) {
          return response
            .json()
            .then(
              (e) => Promise.reject(e),
              this.setState({ error: "Please select an item to delete" })
            );
        } else {
          this.setState({
            error:
              "Product successfully deleted! To see the change, go to the relevant page and refresh.",
          });
        }
      })

      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <div className="admin">
        <h3 className="dropDown" onClick={this.displayModify}>
          <u>Modify Product/Delete Product:</u>
        </h3>

        {this.state.displayModify && (
          <>
            <form onChange={(e) => this.handleChange(e.target.value)}>
              <label>
                Products to modify:{" "}
                <select>
                  <option value="blank">-----</option>
                  {this.props.products.map((product) => {
                    return (
                      <option key={product.id} value={product.id}>
                        {product.product_title}
                      </option>
                    );
                  })}
                </select>
              </label>
            </form>
            <form
              className="productToModify"
              onSubmit={(e) => this.modifyProduct(e, e.target)}
            >
              <label className="formItem">
                Product Title:
                <input
                  name="product_title"
                  required
                  type="text"
                  defaultValue={this.state.chosenProduct.product_title}
                />
              </label>
              <label className="formItem">
                Price(without a $):
                <input
                  name="price"
                  required
                  type="text"
                  defaultValue={this.state.chosenProduct.price}
                />
              </label>
              <label className="formItem">
                Available:
                <input
                  name="quantity"
                  required
                  type="text"
                  defaultValue={this.state.chosenProduct.quantity}
                />
              </label>
              <label className="formItem">
                Image URL:
                <input
                  name="product_image"
                  required
                  type="text"
                  defaultValue={this.state.chosenProduct.product_image}
                />
              </label>
              <label className="formItem">
                Category:
                <input
                  name="categorySelect"
                  required
                  type="text"
                  defaultValue={this.state.chosenProduct.category}
                />
              </label>
              <label className="formItem">
                Size:
                <input
                  name="size"
                  required
                  type="text"
                  defaultValue={this.state.chosenProduct.size}
                />
              </label>
              <label className="formItem">
                Do you want this item to be featured on the main page?:
                <select required name="featuredSelect">
                  <option value={true}>Yes</option>
                  <option selected="selected" value={false}>
                    No
                  </option>
                </select>
              </label>

              <div className="formItem">
                <input type="submit" value="MODIFY PRODUCT" />
              </div>
              <div className="formItem">
                <button onClick={(e) => this.deleteProduct(e)}>
                  DELETE PRODUCT{" "}
                </button>
                {this.state.error && <p>{this.state.error}</p>}
                {this.state.modifyProductMessage && (
                  <p>{this.state.modifyProductMessage}</p>
                )}
              </div>
            </form>
          </>
        )}

        <div className="addProduct">
          <h3 className="dropDown" onClick={this.displayAdd}>
            <u>Add Product:</u>
          </h3>

          {this.state.displayAdd && (
            <>
              <form
                className="productToModify"
                onSubmit={(e) => {
                  this.addProduct(e, e.target);
                }}
              >
                <label className="formItem">
                  Product Title:
                  <input required name="product_title" type="text" />
                </label>
                <label className="formItem">
                  Price(without a $):
                  <input required name="price" type="text" />
                </label>
                <label className="formItem">
                  Available:
                  <input required name="quantity" type="text" />
                </label>
                <label className="formItem">
                  Image URL:
                  <input required name="product_image" type="text" />
                </label>
                <label className="formItem">
                  Category:
                  <input
                    name="categorySelect"
                    required
                    type="text"
                    defaultValue={this.state.chosenProduct.category}
                  />
                </label>
                <label className="formItem">
                  Size:
                  <input
                    name="size"
                    required
                    type="text"
                    defaultValue={this.state.chosenProduct.size}
                  />
                </label>

                <label className="formItem">
                  Do you want this item to be featured on the main page?:
                  <select required name="featuredSelect">
                    <option value={true}>Yes</option>
                    <option selected="selected" value={false}>
                      No
                    </option>
                  </select>
                </label>
                <div className="formItem">
                  <input required type="submit" value="ADD PRODUCT" />
                  {this.state.addMessage && <p>{this.state.addMessage}</p>}
                </div>
              </form>{" "}
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Admin;
