import { CImg } from "@coreui/react";
import React from "react";
import { BUCKET_URL } from "../config";

export default function UserProfile({ user }) {
  return (
    <div className="d-flex align-items-center">
      {/* <span className="mr-3">{`${profile.noms} ${profile.prenoms}`}</span> */}
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
      </div>
      <strong className="mr-3">{`${user.noms} ${user.prenoms}`}</strong>
      Connecté
    </div>
  );
}
