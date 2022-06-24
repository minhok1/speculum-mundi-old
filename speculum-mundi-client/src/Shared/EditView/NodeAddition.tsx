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
    const submitData = new FormData();
    submitData.append("title", e.target[0].value);
    submitData.append("content", e.target[1].value);
    submitData.append("event_year", e.target[2].value);
    submitData.append("user", currState.auth.account.id);
    submitData.append("shared", "False");
    submitData.append("context", e.target[3].value);
    submitData.append("location", e.target[4].value);
    axios
      .post(`http://localhost:8000/api/timeline_events/create/`, submitData)
      .then(() => {
        console.log("done");
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };

  // useEffect(() => {
  //   console.log(currState.auth.account.id);
  // }, []);
  return (
    <div className="edit-form-container">
      <div className="add-node-title">Adding a timeline event</div>
      <div>
        <form className="edit-form" onSubmit={onNodeSubmit}>
          <input name="title" placeholder="Title"></input>
          <input name="content" placeholder="Content"></input>
          <input name="eventYear" placeholder="Year"></input>
          {/* {props.abstracts.map((abstract: Abstract) => (
            <div key={abstract.id}>
              <input
                type="checkbox"
                id={abstract.id}
                name={abstract.id}
              ></input>
              <label className="abstract-labels" htmlFor={abstract.id}>
                {abstract.title}
              </label>
            </div>
          ))} */}
          <select name="context">
            {props.abstracts.map((abstract: Abstract) => (
              <option key={abstract.id} value={abstract.id}>
                {abstract.title}
              </option>
            ))}
          </select>
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
