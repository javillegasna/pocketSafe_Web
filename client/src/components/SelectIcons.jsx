import React, { useState } from "react";
import Select from "react-select";
import Icon from "./Icon";

function SelectIcons({setValue,value,list,tag}) {

  const [selectedOption, setSelectedOption] = useState();

  const handleChange = (option) => {
    setSelectedOption(option);
    setValue({...value,[tag]:option.id})
  };
  return (
    <div className="SelectIcons">
      <Select
        value={selectedOption||list[0]}
        options={list}
        onChange={handleChange}
        getOptionLabel={(option) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Icon iconName={option.icon}/>
            <span style={{ marginLeft: 5 }}>{option.name}</span>
          </div>
        )}
      />
    </div>
  );
}

export default SelectIcons;
