import React, { useState } from "react";
import Select from "react-select";
import Icon from "./Icon";

function SelectIcons({setValue,value}) {
  const data = [
    {
      value: "FaBus",
      text:"Transport",
      icon: <Icon iconName={"FaBus"} />,
    },
    {
      value: "FaAmazon",
      text:"OnLine shopping",
      icon: <Icon iconName={"FaAmazon"} />,
    },
    {
      value: "FaAvianex",
      text:"Travels",
      icon: <Icon iconName={"FaAvianex"} />,
    },
    {
      value: "FaBlackTie",
      text:"Clothes",
      icon: <Icon iconName={"FaBlackTie"} />,
    },
    {
      value: "FaItunesNote",
      text:"Entertainment",
      icon: <Icon iconName={"FaItunesNote"} />,
    },
    {
      value: "FaUsb",
      text:"Technology",
      icon: <Icon iconName={"FaUsb"} />,
    },
    {
      value: "FaXbox",
      text:"Games",
      icon: <Icon iconName={"FaXbox"} />,
    },
    {
      value: "FaAmbulance",
      text:"Medical Expenses",
      icon: <Icon iconName={"FaAmbulance"} />,
    },
    {
      value: "FaCarrot",
      text:"Food",
      icon: <Icon iconName={"FaCarrot"} />,
    },
    {
      value: "FaChargingStation",
      text:"Gasoline",
      icon: <Icon iconName={"FaChargingStation"} />,
    },
    {
      value: "FaCogs",
      text:"Repairs",
      icon: <Icon iconName={"FaCogs"} />,
    },
    {
      value: "FaFireExtinguisher",
      text:"Accidents",
      icon: <Icon iconName={"FaFireExtinguisher"} />,
    },
    {
      value: "FaPaw",
      text:"Pets",
      icon: <Icon iconName={"FaPaw"} />,
    },
  ];

  const [selectedOption, setSelectedOption] = useState(data[0]);

  const handleChange = (e) => {
    setSelectedOption(e);
    setValue({...value,icon:e.value})
  };

  return (
    <div className="SelectIcons">
      <Select
        placeholder="Select Option"
        value={selectedOption}
        options={data}
        onChange={handleChange}
        getOptionLabel={(e) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            {e.icon}
            <span style={{ marginLeft: 5 }}>{e.text}</span>
          </div>
        )}
      />
    </div>
  );
}

export default SelectIcons;
