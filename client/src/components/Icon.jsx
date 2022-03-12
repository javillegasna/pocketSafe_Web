import React from "react";
import * as FontAwesome from "react-icons/fa";

const Icon = props => {
  const { iconName, message,customStyle} = props;
  const icon = React.createElement(FontAwesome[iconName?iconName:"FaExclamationCircle"]);
  return <div className={customStyle}><i className="me-2">{icon}</i><span>{message}</span></div>;
};
export default Icon;