import styles from './FourAngle.module.css';

const FourAngle = () => (
  <div className={styles.wrap}>
    <div
      className="angle angle-left-top"
      style={{
        left: "-5mm",
        top: "-5mm",
        width: `4mm`,
        height: `4mm`,
        transform: "scale(-1) translate(100%, 100%)",
        borderLeftWidth: `0.25px`,
        borderTopWidth: `0.25px`,
      }}
    ></div>
    <div
      className="angle angle-right-top"
      style={{
        right: "-5mm",
        top: "-5mm",
        width: `4mm`,
        height: `4mm`,
        transform: "scale(-1) translate(100%, 100%)",
        borderRightWidth: `0.25px`,
        borderTopWidth: `0.25px`,
      }}
    ></div>
    <div
      className="angle angle-left-bottom"
      style={{
        left: "-5mm",
        bottom: "-5mm",
        width: `4mm`,
        height: `4mm`,
        transform: "scale(-1) translate(100%, 100%)",
        borderLeftWidth: `0.25px`,
        borderBottomWidth: `0.25px`,
      }}
    ></div>
    <div
      className="angle angle-right-bottom"
      style={{
        right: "-5mm",
        bottom: "-5mm",
        width: `4mm`,
        height: `4mm`,
        transform: "scale(-1) translate(100%, 100%)",
        borderRightWidth: `0.25px`,
        borderBottomWidth: `0.25px`,
      }}
    ></div>
  </div>
);

export default FourAngle;
