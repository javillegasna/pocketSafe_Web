import React from "react";
import * as FontAwesome from "react-icons/fa";

const Icon = props => {
  const { iconName, message,customStyle} = props;
  const icon = React.createElement(FontAwesome[iconName?iconName:"FaExclamationCircle"]);
  return <div className={customStyle}>{icon} {message}</div>;
};
export default Icon;