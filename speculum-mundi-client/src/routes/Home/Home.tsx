import NavSidebar from "../../NavSidebar/NavSidebar";
import ProfileHeader from "../../ProfileHeader/ProfileHeader";
import "./Home.css";

import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { useState } from "react";

export default function Home() {
  // const [displayedExplanations, setDisplayedExplanations] = useState([
  //   false,
  //   false,
  //   false,
  // ]);
  const explanations = [
    {
      summary: "Create your version of history",
      contents:
        "Pull different events, people, locations or ideas and the timeline events associated with them from the database, and add your own events and connections to complete your personalised story. Learn history as a collection of interconnected stories, not by individual events.",
    },
    {
      summary: "Visualise your narrative",
      contents:
        "Connect the dots between major historical events by visualising them in timeline and map views. Understand how to read between the lines in historical context by examining how the color-coded events converge and diverge on your diagram.",
    },
    {
      summary: "Share your opinions",
      contents:
        "Once you create your own version of history, upload it to the database with your opinions on discussions related to the events you picked for your diagram, and engage in educated debates with other users. Familiarize yourself with supporting your argument with historical sources.",
    },
  ];

  // const onExpand = (i: number) => {
  //   const temp = [...displayedExplanations];
  //   temp[i] = !temp[i];
  //   setDisplayedExplanations(temp);
  // };

  return (
    <div className="page-container">
      <NavSidebar />
      <div className="contents-container">
        <ProfileHeader pageTitle="Home" />
        <div className="dashboard-container home-contents">
          <div className="center-container">
            <div className="center-title">Speculum Mundi</div>
            <div className="center-subtitle">A Complete History Project</div>
          </div>
          <div className="explanation-container">
            {explanations.map((exp) => (
              <div className="explanation-panel" key={exp.summary}>
                <div className="explanation-summary">{exp.summary}</div>
                <div className="explanation-contents">{exp.contents}</div>
                {/* <ExpandCircleDownIcon
                  className="expand-icon"
                  onClick={() => {
                    onExpand(i);
                  }}
                /> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
