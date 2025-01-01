import React from "react";

//import components
import SidebarContent from "./SidebarContent";

const Sidebar = (props: any) => {
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div data-simplebar className="h-100">
          {props.type !== "condensed" ? <SidebarContent setClick={props.setClick} isClick={props.isClick} /> : <SidebarContent setClick={props.setClick} isClick={props.isClick} />}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
