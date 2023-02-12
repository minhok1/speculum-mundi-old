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
      <Row className="page-container-row">
        <Col md={2} className="navbar-container">
          <NavSidebar />
        </Col>
        <Col md={10} className="contents-container">
          <ProfileHeader pageTitle="Home" />
          <Container className="dashboard-container">
            <Row className="title-container">
              <Row className="center-title">Speculum Mundi</Row>
              <Row className="center-subtitle">A Complete History Project</Row>
            </Row>
            <Row className="explanation-container">
              {homeExplanations.map((exp) => (
                <Col className="explanation-panel" key={exp.summary}>
                  <Row className="explanation-summary">{exp.summary}</Row>
                  <Row className="explanation-contents">{exp.contents}</Row>
                </Col>
              ))}
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
