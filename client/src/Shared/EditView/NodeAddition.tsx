import "./NodeAddition.css";
import "./EditView.css";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Abstract } from "../../types";
import axios from "axios";

export default function NodeAddition(props: any) {
  const currState = useSelector((state: any) => state);

  const onNodeSubmit = (e: any) => {
    e.preventDefault();

    const contextArray = Array.from(e.target[3].options)
      .filter((option: any) => option.selected)
      .map((option: any) => option.value);

    const submitData = {
      title: e.target[0].value,
      content: e.target[1].value,
      event_year: e.target[2].value,
      user: currState.auth.account.id,
      shared: "False",
      context: contextArray,
      location: e.target[4].value,
    };

    axios
      .post(`http://localhost:8000/api/timeline_events/create/`, submitData)
      .then(() => {
        props.setAbstracts([...props.abstracts]);
      })
      .catch((error) => {
        return error;
      });
  };

  return (
    <div className="edit-form-container">
      <div className="add-node-title">Adding a timeline event</div>
      <div>
        <form className="edit-form" onSubmit={onNodeSubmit}>
          <input name="title" placeholder="Title"></input>
          <input name="content" placeholder="Content"></input>
          <input name="eventYear" placeholder="Year"></input>
          <div className="add-node-subheading">Abstracts</div>
          <select name="context" multiple>
            {props.abstracts.map((abstract: Abstract) => (
              <option key={abstract.id} value={abstract.id}>
                {abstract.title}
              </option>
            ))}
          </select>
          <div className="add-node-subheading">Location</div>
          <select name="location">
            {props.abstracts.map((abstract: Abstract) => (
              <option key={abstract.id} value={abstract.id}>
                {abstract.title}
              </option>
            ))}
          </select>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    </div>
  );
}
