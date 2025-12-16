import "./Loader.css";

export default function Loader({ text = "Loading..." }) {
  return (
    <div className="global-loader">
      <span className="spinner"></span>
      <p>{text}</p>
    </div>
  );
}
