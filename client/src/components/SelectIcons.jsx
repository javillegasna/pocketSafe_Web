/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Select from "react-select";
import Icon from "./Icon";

function SelectIcons({setValue,value,list,tag,tagValue, icon, name}) {

  const [selectedOption, setSelectedOption] = useState(list[0]);

  const handleChange = (option) => {
    setSelectedOption(option);
    setValue({...value,[tag]:option.id})
  };
  useEffect(() => {
    setSelectedOption(list[0])
  }, [list]);

  return (
    <div className="SelectIcons">
      <Select
        value={selectedOption}
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
