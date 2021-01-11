import "./Art.css";

function Art(props) {
  return (
    <div className="ArtDiv">
      <h2>Art</h2>
      <ul className="artPageUl">
        {props.art.map((item) => {
          return (
            <a href={item.link} target="_blank" rel="noreferrer">
              <li key={item.id} className="artPageLi">
                <img src={item.imageurl} alt={item.alttext} />
              </li>
            </a>
          );
        })}
      </ul>
    </div>
  );
}

export default Art;
