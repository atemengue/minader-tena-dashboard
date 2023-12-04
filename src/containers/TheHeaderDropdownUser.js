/** @format */

import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import UserProfile from "../common/UserProfile";
import { AUDIO_USER_CONNECT, BUCKET_URL } from "../config";

const TheHeaderDropdownUser = ({ onLineUsers, chatUsers }) => {
  // const [onLineUsers, setOnLineUsers] = useState([]);
  // const [audio] = useState(new Audio(AUDIO_USER_CONNECT));
  // const [playing, setPlaying] = useState(true);

  //x const hanleNewUser = useCallback((user) => {
  //   setPlaying(true);
  //   toast.success(<UserProfile user={user} />, {
  //     position: "top-left",
  //     type: "info",
  //   });
  // }, []);

  // const handleOnlineUsers = useCallback((users) => {
  //   setOnLineUsers(users);
  // }, []);

  return (
    <CDropdown inNav className="c-header-nav-item mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <FontAwesomeIcon size="lg" className="mr-2" icon={faUser} />

        <CBadge shape="pill" color="info">
          {chatUsers?.length}
        </CBadge>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light">
          <strong>Utilisateurs Connectés {chatUsers?.length} </strong>
        </CDropdownItem>

        {chatUsers.map((user) => {
          return (
            <CDropdownItem key={user?.idUser} href="#">
              <div className="d-flex justify-content-center align-items-center">
                <div className="pt-3 mr-3 float-left">
                  <div className="c-avatar">
                    <CImg
                      src={
                        user.photo
                          ? `${BUCKET_URL}/users/${user.userIdArchive}/${user.photo}`
                          : `${BUCKET_URL}/default/user.png`
                      }
                      className="c-avatar-img"
                      alt="admin@bootstrapmaster.com"
                    />
                    <span className="c-avatar-status bg-success"></span>
                  </div>
                </div>
                <div className=" font-weight-bold">{user?.noms}</div>
              </div>
            </CDropdownItem>
          );
        })}
      </CDropdownMenu>
    </CDropdown>
  );
};

const mapStateToProps = ({ chatState }) => ({
  onLineUsers: chatState.onLineUsers,
  chatUsers: chatState.chatUsers,
});

export default connect(mapStateToProps, {})(TheHeaderDropdownUser);
