import React from "react";
import * as FontAwesome from "react-icons/fa";

const Icon = props => {
  const { iconName, message} = props;
  const icon = React.createElement(FontAwesome[iconName]);
  return <div>{icon} {message}</div>;
};
export default Icon;