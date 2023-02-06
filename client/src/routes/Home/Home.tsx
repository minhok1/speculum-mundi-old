import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import NavSidebar from "../../NavSidebar/NavSidebar";
import ProfileHeader from "../../ProfileHeader/ProfileHeader";
import "./Home.css";
import { homeExplanations } from "../../Assets/en-CA";

export default function Home() {
  return (
    <Container className="page-container">
      <Row>
        <Col md={2}>
          <NavSidebar />
        </Col>
        <Col md={10}>
          <div className="contents-container">
            <ProfileHeader pageTitle="Home" />
            <div className="dashboard-container home-contents">
              <div className="center-container">
                <div className="center-title">Speculum Mundi</div>
                <div className="center-subtitle">
                  A Complete History Project
                </div>
              </div>
              <div className="explanation-container">
                {homeExplanations.map((exp) => (
                  <div className="explanation-panel" key={exp.summary}>
                    <div className="explanation-summary">{exp.summary}</div>
                    <div className="explanation-contents">{exp.contents}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
