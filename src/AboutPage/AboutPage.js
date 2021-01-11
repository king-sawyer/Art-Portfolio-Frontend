import "./AboutPage.css";
import { AiOutlineInstagram } from "react-icons/ai";
import { IconContext } from "react-icons/lib";

function AboutPage() {
  return (
    <div className="AboutPageDiv">
      <h2 className="about">About</h2>
      <div className="aboutPageContainer">
        <div className="imageDiv">
          <img src="https://i.imgur.com/8w23tRG.jpg" alt="monk" />
        </div>
        <div className="textDiv">
          <h2 className="abouth2">Brandanowitzz</h2>{" "}
          <p>
            Brandanowitzz is an artist based in the Pacific North West who's
            primary focus is line art.
            <br />
            <br />
            With an interest in gaming, graphic novels, and tattoos, feel free
            to reach out for any potential art inquiries.{" "}
          </p>
          <br />
          <hr />
          <a href="https://www.instagram.com/brandanowitzz/">
            <IconContext.Provider value={{ size: "80px" }}>
              <AiOutlineInstagram className="instaIconOnAbout" />
            </IconContext.Provider>
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
