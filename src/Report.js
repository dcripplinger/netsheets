import PrimaryButton from "./PrimaryButton";

const Report = ({ _report, onClose, title }) => {
  // const { headerItems, lineItems, totals, net } = report;

  return (
    <>
      <PrimaryButton onClick={onClose}>Back to calculator</PrimaryButton>
      <div>{title}</div>
    </>
  );
};

export default Report;
