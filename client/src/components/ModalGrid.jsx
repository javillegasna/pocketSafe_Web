import Icon from "./Icon";

const ModalGrid = ({ listIcons, action, close, visible, limit = 420 }) => {
  return (
    <div className={`scroll scroll-bag ${visible ? "" : "scroll-invisible"}`}>
      <div className="scroll-div">
        <div className="scroll-object"></div>
        {listIcons.map((icon, index) =>
          index < limit ? (
            <button
              key={`AccountIcon${index}`}
              className="btn btn-outline-secondary text-center"
              onClick={(e) => action(icon)}
            >
              <Icon iconName={icon} />
            </button>
          ) : (
            ""
          )
        )}
      </div>
      <button
        className="btn container btn-outline-secondary mt-3 text-center"
        onClick={() => close()}
      >
        Close
      </button>
    </div>
  );
};

export default ModalGrid;
