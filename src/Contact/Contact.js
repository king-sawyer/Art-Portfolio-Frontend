import React from "react";
import "./Contact.css";

import { AiOutlineInstagram } from "react-icons/ai";
import { IconContext } from "react-icons/lib";

export default class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      status: "",
    };
  }

  render() {
    const { status } = this.state;
    return (
      <>
        <div className="contactPage">
          <div className="formItem">
            <p>
              Looking to get in contact with me? Send me an email below or send
              me a message on instagram.
            </p>
          </div>
          <form
            onSubmit={this.submitForm}
            action="https://formspree.io/f/xgeprybw"
            method="POST"
          >
            <div className="formItem">
              <label>
                Your Email:
                <input type="email" name="email" />
              </label>
            </div>
            <br />
            <div className="formItem">
              <label>
                Message:
                <textarea type="text" name="message" />
              </label>
            </div>
            <div className="formItem">
              {status === "SUCCESS" ? <p>Thanks!</p> : <button>Submit</button>}
              {status === "ERROR" && <p>Ooops! There was an error.</p>}
            </div>
          </form>
        </div>
        <hr className="hrContact" />
        <a
          className="instaIcon"
          href="https://www.instagram.com/brandanowitzz/"
        >
          <IconContext.Provider value={{ size: "70px" }}>
            <AiOutlineInstagram />
          </IconContext.Provider>
        </a>
      </>
    );
  }

  submitForm(ev) {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        this.setState({ status: "SUCCESS" });
      } else {
        this.setState({ status: "ERROR" });
      }
    };
    xhr.send(data);
  }
}
