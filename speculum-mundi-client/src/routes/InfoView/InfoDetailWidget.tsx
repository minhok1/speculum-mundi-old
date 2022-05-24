import { useEffect, useState } from "react";
import "./InfoDetailWidget.css";

export default function InfoDetailWidget(props: any) {
  const abstractInfo = props.selectedAbstract;
  const [abstractImage, setAbstractImage] = useState("");

  useEffect(() => {
    fetch(abstractInfo.image)
      .then((image) => {
        return image.blob();
      })
      .then((imageBlob: any) => {
        return URL.createObjectURL(imageBlob);
      })
      .then((imageURL) => {
        setAbstractImage(imageURL);
      });
  }, []);

  return (
    <div className="container-panel selected-result">
      <div className="abstract-text">
        <div className="abstract-title">{abstractInfo.title}</div>
        <div className="abstract-type">{abstractInfo.type}</div>
        <div className="abstract-content">{abstractInfo.content}</div>
        <a href={abstractInfo.source} className="abstract-source">
          Source
        </a>
      </div>
      <div className="abstract-photo">
        <img src={abstractImage} className="abstract-image"></img>
      </div>
    </div>
  );
}
