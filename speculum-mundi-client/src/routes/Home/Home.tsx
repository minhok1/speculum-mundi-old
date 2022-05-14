import NavSidebar from "../../NavSidebar/NavSidebar";
import ProfileHeader from "../../ProfileHeader/ProfileHeader";
import "./Home.css";

export default function Home() {
  return (
    <div className="page-container">
      <NavSidebar />
      <div className="contents-container">
        <ProfileHeader pageTitle="Home" />
        <div className="introduction">
          <div className="center-title">Speculum Mundi</div>
          <div className="center-subtitle">A Complete History Project</div>
        </div>
      </div>
    </div>
  );
}
