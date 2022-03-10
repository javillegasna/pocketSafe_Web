const GenericButton = ({action,message,typeStyle}) => {
  return ( <button type="button" onClick={action} className={`btn btn-outline-${typeStyle}`}>{message}</button> );
}
export default GenericButton;