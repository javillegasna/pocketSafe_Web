import Icon from "./Icon";

const ModalGrid = ({ listIcons, setProperty, setState, property, state }) => {
  return (
    <div className="scroll scroll-bag">
      <div className="scroll-div">
        <div className="scroll-object"></div>
        {listIcons.map((icon, index) => (
          <button
            key={`AccountIcon${index}`}
            className="btn btn-outline-secondary text-center"
            onClick={() => {
              setProperty({...property, accountIcon:icon});
              setState(state);
            }}
          >
            <Icon iconName={icon} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModalGrid;
