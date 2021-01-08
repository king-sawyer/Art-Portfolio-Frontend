import "./MainPage.css";

function MainPage() {
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
          <li className="mainProductLi">
            <img
              className="productImage"
              src="/Images/GoblinShirtFront.png"
              alt="firstProduct"
            />
            <p>
              <b>Goblins and Ghouls:</b>
            </p>
            <p>
              <b>25$</b>
            </p>
          </li>
          <li className="mainProductLi">
            {" "}
            <img
              className="productImage"
              src="/Images/HoodieMockUp1.png"
              alt="mockHoodie"
            />
            <p>
              <b>Shough Rootin:</b>
            </p>
            <p>
              <b>35$</b>
            </p>
          </li>
          <li className="mainProductLi">
            {" "}
            <img
              className="productImage"
              src="/Images/GatorshirtBack.png"
              alt="imgRight"
            />
            <p>
              <b>Gator:</b>
            </p>
            <p>
              <b>25$</b>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MainPage;
