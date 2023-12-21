import "./Submit.css";

const Submit = ({ onSubmit, submitted }) => {
  return <button onClick={onSubmit} className="submit" style={{ visibility: submitted === false ? 'visible' : 'hidden' }}>Dit is 'm!</button>;
};
export default Submit;
