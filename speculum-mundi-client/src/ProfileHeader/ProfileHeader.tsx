import "./ProfileHeader.css";

import DragHandleIcon from "@mui/icons-material/DragHandle";

export default function ProfileHeader(props: any) {
  return (
    <div className="header-container">
      <div className="header-title">
        <DragHandleIcon />
        <span className="header-text">{props.pageTitle}</span>
      </div>
      <div>profile</div>
    </div>
  );
}
