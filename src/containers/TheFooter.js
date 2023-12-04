import { CFooter } from "@coreui/react";
import React from "react";

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <div>
          <div className="brand-wrapper">
            <img src="icons/cameroun.png" alt="logo" className="logo" />
            <span className="ml-1">
              HELIOS &copy; 2023 DASHBOARD MONITORING.
            </span>
          </div>
        </div>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Code by</span>
        <a
          href="https://www.regisatemengue.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          REGIS ATEMENGUE
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(TheFooter);
