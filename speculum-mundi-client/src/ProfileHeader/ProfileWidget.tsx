import "./ProfileWidget.css";
import { CapitalizeFirstLetter } from "../Utils";
import { authSlice } from "../store/slices/auth";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

export default function ProfileWidget(props: any) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const username = CapitalizeFirstLetter(props.auth.auth.account.username);

  const handleLogout = () => {
    props.dispatch(
      authSlice.actions.setAuthTokens({
        token: null,
        refreshToken: null,
      })
    );
    props.dispatch(authSlice.actions.setAccount(null));
  };

  return (
    <div className="profile-container">
      <div className="profile-initial">{username[0]}</div>
      <div className="profile-info">
        <div className="username">{username}</div>
        <div className="status">Active</div>
      </div>
      <ExpandMoreIcon
        className="profile-expand"
        onClick={() => {
          setIsProfileMenuOpen(!isProfileMenuOpen);
        }}
      />
      {isProfileMenuOpen && (
        <div className="profile-menu">
          <div className="profile-menu-item" onClick={handleLogout}>
            Logout
          </div>
        </div>
      )}
    </div>
  );
}
