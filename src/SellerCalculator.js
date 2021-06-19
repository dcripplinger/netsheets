import { useState } from "react";
import styled from "styled-components";

import FormInput from "./FormInput";

const Container = styled.div`
  margin: 40px;
`;

const Divider = styled.div`
  height: 24px;
`;

const singleIndentMargin = "0 0 0 40px";

const SellerCalculator = () => {
  const [offerId, setOfferId] = useState(null);
  const offerIdLabel = "Offer ID";
  const offerIdType = "string";
  const offerIdHelp =
    "Enter anything you want to identify this offer compared to others. Just make sure to not include the buyer's personal information.";

  const [offerAmount, setOfferAmount] = useState(null);
  const offerAmountLabel = "Offer amount";
  const offerAmountType = "amount";
  const offerAmountHelp = null;

  const [offerDate, setOfferDate] = useState(new Date());
  const offerDateLabel = "Offer date";
  const offerDateType = "date";
  const offerDateHelp = null;

  const [useDifferentSaleAmount, setUseDifferentSaleAmount] = useState(false);
  const useDifferentSaleAmountLabel =
    "Do you want to use a different sale amount from the offer amount?";
  const useDifferentSaleAmountType = "radio";
  const useDifferentSaleAmountHelp = null;
  const useDifferentSaleAmountOptions = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  const [differentSaleAmount, setDifferentSaleAmount] = useState(null);
  const differentSaleAmountLabel = "Sale amount";
  const differentSaleAmountType = "amount";
  const differentSaleAmountHelp = null;

  const [closingDate, setClosingDate] = useState(null);
  const closingDateLabel = "Closing date";
  const closingDateType = "date";
  const closingDateHelp = "Enter the estimated date to close on the sale.";

  const [mortgagePayoffAmount, setMortgagePayoffAmount] = useState(null);
  const mortgagePayoffAmountLabel = "Mortgage payoff amount";
  const mortgagePayoffAmountType = "amount";
  const mortgagePayoffAmountHelp =
    "Enter the payoff amount of the seller's current mortgage on the subject property, or just enter the mortgage balance as an estimate.";

  const [sellerPaysTitleInsurance, setSellerPaysTitleInsurance] =
    useState(true);
  const sellerPaysTitleInsuranceLabel =
    "Is the seller paying the title insurance?";
  const sellerPaysTitleInsuranceType = "radio";
  const sellerPaysTitleInsuranceHelp = null;
  const sellerPaysTitleInsuranceOptions = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  const [annualTax, setAnnualTax] = useState(null);
  const annualTaxLabel = "Last year's annual property tax";
  const annualTaxType = "amount";
  const annualTaxHelp =
    "Enter last year's recorded annual property tax for the subject property.";

  const [closingFee, setClosingFee] = useState(300);
  const closingFeeLabel = "Closing fee";
  const closingFeeType = "amount";
  const closingFeeHelp =
    "This is the closing fee charged by the title company. Its default amount is set by the title company, but you can adjust it if necessary.";

  const [useIndividualCommissions, setUseIndividualCommissions] =
    useState(false);
  const useIndividualCommissionsLabel = "Commission breakdown";
  const useIndividualCommissionsType = "radio";
  const useIndividualCommissionsHelp =
    "If you want to specify the seller's agent commission and the buyer's agent commission separately, choose \"Individual\".";
  const useIndividualCommissionsOptions = [
    { label: "Combined", value: false },
    { label: "Individual", value: true },
  ];

  const [combinedCommissionPercent, setCombinedCommissionPercent] = useState(6);
  const combinedCommissionPercentLabel = "Commission %";
  const combinedCommissionPercentType = "amount";
  const combinedCommissionPercentHelp = null;

  const [sellerCommissionPercent, setSellerCommissionPercent] = useState(3);
  const sellerCommissionPercentLabel = "Seller commission %";
  const sellerCommissionPercentType = "amount";
  const sellerCommissionPercentHelp = null;

  const [buyerCommissionPercent, setBuyerCommissionPercent] = useState(3);
  const buyerCommissionPercentLabel = "Buyer commission %";
  const buyerCommissionPercentType = "amount";
  const buyerCommissionPercentHelp = null;

  const [sellerFullName, setSellerFullName] = useState(null);
  const sellerFullNameLabel = "Seller's full name";
  const sellerFullNameType = "string";
  const sellerFullNameHelp = null;

  const [addressLine1, setAddressLine1] = useState(null);
  const addressLine1Label = "Address line 1";
  const addressLine1Type = "string";
  const addressLine1Help = null;

  const [addressLine2, setAddressLine2] = useState(null);
  const addressLine2Label = "Address line 2";
  const addressLine2Type = "string";
  const addressLine2Help = null;

  const [addressCity, setAddressCity] = useState(null);
  const addressCityLabel = "City";
  const addressCityType = "string";
  const addressCityHelp = null;

  const [addressState, setAddressState] = useState(null);
  const addressStateLabel = "State";
  const addressStateType = "string";
  const addressStateHelp = null;

  const [addressZip, setAddressZip] = useState(null);
  const addressZipLabel = "Zip code";
  const addressZipType = "string";
  const addressZipHelp = null;

  const [specialAssessment, setSpecialAssessment] = useState(null);
  const specialAssessmentLabel = "Special assessment";
  const specialAssessmentType = "amount";
  const specialAssessmentHelp =
    "Enter the total of any special assessments owed on the property.";

  const [agentFees, setAgentFees] = useState(null);
  const agentFeesLabel = "Agent fees";
  const agentFeesType = "amount";
  const agentFeesHelp =
    "Enter the total of any fees charged by the agent to the seller.";

  const [homeWarranty, setHomeWarranty] = useState(null);
  const homeWarrantyLabel = "Home warranty";
  const homeWarrantyType = "amount";
  const homeWarrantyHelp =
    "Enter the cost of the home warranty if the seller is paying for it.";

  const [itemizedConcessions, setItemizedConcessions] = useState([
    {
      label: null,
      value: null,
    },
  ]);
  const itemizedConcessionsLabel = "Seller concessions";
  const itemizedConcessionsType = "itemizedList";
  const itemizedConcessionsHelp = null;

  const [calcForMeSellerPortionHoa, setCalcForMeSellerPortionHoa] =
    useState(false);
  const calcForMeSellerPortionHoaLabel = "HOA dues owed by seller";
  const calcForMeSellerPortionHoaType = "radio";
  const calcForMeSellerPortionHoaHelp =
    "You can provide this value yourself or have it calculated for you based on information about the HOA dues.";
  const calcForMeSellerPortionHoaOptions = [
    { value: false, label: "I will provide the amount." },
    { value: true, label: "Calculate for me based on HOA information." },
  ];

  const [sellerPortionNextHoaPayment, setSellerPortionNextHoaPayment] =
    useState(null);
  const sellerPortionNextHoaPaymentLabel = "Total owed by seller";
  const sellerPortionNextHoaPaymentType = "amount";
  const sellerPortionNextHoaPaymentHelp = null;

  const [hoaPaymentFrequency, setHoaPaymentFrequency] = useState("monthly");
  const hoaPaymentFrequencyLabel = "HOA payment frequency";
  const hoaPaymentFrequencyType = "radio";
  const hoaPaymentFrequencyHelp = null;
  const hoaPaymentFrequencyOptions = [
    { value: "monthly", label: "Monthly" },
    { value: "annual", label: "Annual" },
  ];

  const [hoaDues, setHoaDues] = useState(null);
  const hoaDuesLabel = "HOA payment amount on due date";
  const hoaDuesType = "amount";
  const hoaDuesHelp = null;

  const [nextHoaPaymentDate, setNextHoaPaymentDate] = useState(null);
  const nextHoaPaymentDateLabel = "Next HOA payment due date";
  const nextHoaPaymentDateType = "date";
  const nextHoaPaymentDateHelp =
    "If a date is not provided, the calculator will estimate by assuming the next monthly payment is the first of next month or the next annual payment is the first of next year.";

  const [wireFee, setWireFee] = useState(40);
  const wireFeeLabel = "Wire fee";
  const wireFeeType = "amount";
  const wireFeeHelp =
    "This is the wire fee charged by the title company. Its default amount is set by the title company, but you can adjust it if necessary.";

  const [itemizedCharges, setItemizedCharges] = useState([
    {
      label: null,
      value: null,
    },
  ]);
  const itemizedChargesLabel = "Miscellaneous charges";
  const itemizedChargesType = "itemizedList";
  const itemizedChargesHelp = null;

  const [itemizedCredits, setItemizedCredits] = useState([
    {
      label: null,
      value: null,
    },
  ]);
  const itemizedCreditsLabel = "Miscellaneous credits";
  const itemizedCreditsType = "itemizedList";
  const itemizedCreditsHelp = null;

  return (
    <Container>
      <FormInput
        type={offerIdType}
        value={offerId}
        label={offerIdLabel}
        onChange={setOfferId}
        help={offerIdHelp}
      />

      <Divider />

      <FormInput
        type={offerAmountType}
        value={offerAmount}
        label={offerAmountLabel}
        onChange={setOfferAmount}
        help={offerAmountHelp}
      />

      <Divider />

      <FormInput
        type={offerDateType}
        value={offerDate}
        label={offerDateLabel}
        onChange={setOfferDate}
        help={offerDateHelp}
      />

      <Divider />

      <FormInput
        type={useDifferentSaleAmountType}
        value={useDifferentSaleAmount}
        label={useDifferentSaleAmountLabel}
        onChange={setUseDifferentSaleAmount}
        help={useDifferentSaleAmountHelp}
        options={useDifferentSaleAmountOptions}
      />

      {useDifferentSaleAmount && (
        <>
          <Divider />

          <FormInput
            type={differentSaleAmountType}
            value={differentSaleAmount}
            label={differentSaleAmountLabel}
            onChange={setDifferentSaleAmount}
            help={differentSaleAmountHelp}
            margin={singleIndentMargin}
          />
        </>
      )}

      <Divider />

      <FormInput
        type={closingDateType}
        value={closingDate}
        label={closingDateLabel}
        onChange={setClosingDate}
        help={closingDateHelp}
      />

      <Divider />

      <FormInput
        type={mortgagePayoffAmountType}
        value={mortgagePayoffAmount}
        label={mortgagePayoffAmountLabel}
        onChange={setMortgagePayoffAmount}
        help={mortgagePayoffAmountHelp}
      />

      <Divider />

      <FormInput
        type={sellerPaysTitleInsuranceType}
        value={sellerPaysTitleInsurance}
        label={sellerPaysTitleInsuranceLabel}
        onChange={setSellerPaysTitleInsurance}
        help={sellerPaysTitleInsuranceHelp}
        options={sellerPaysTitleInsuranceOptions}
      />

      <Divider />

      <FormInput
        type={annualTaxType}
        value={annualTax}
        label={annualTaxLabel}
        onChange={setAnnualTax}
        help={annualTaxHelp}
      />

      <Divider />

      <FormInput
        type={closingFeeType}
        value={closingFee}
        label={closingFeeLabel}
        onChange={setClosingFee}
        help={closingFeeHelp}
      />

      <Divider />

      <FormInput
        type={useIndividualCommissionsType}
        value={useIndividualCommissions}
        label={useIndividualCommissionsLabel}
        onChange={setUseIndividualCommissions}
        help={useIndividualCommissionsHelp}
        options={useIndividualCommissionsOptions}
      />

      {useIndividualCommissions ? (
        <>
          <Divider />

          <FormInput
            type={sellerCommissionPercentType}
            value={sellerCommissionPercent}
            label={sellerCommissionPercentLabel}
            onChange={setSellerCommissionPercent}
            help={sellerCommissionPercentHelp}
            margin={singleIndentMargin}
          />
          <Divider />

          <FormInput
            type={buyerCommissionPercentType}
            value={buyerCommissionPercent}
            label={buyerCommissionPercentLabel}
            onChange={setBuyerCommissionPercent}
            help={buyerCommissionPercentHelp}
            margin={singleIndentMargin}
          />
        </>
      ) : (
        <>
          <Divider />

          <FormInput
            type={combinedCommissionPercentType}
            value={combinedCommissionPercent}
            label={combinedCommissionPercentLabel}
            onChange={setCombinedCommissionPercent}
            help={combinedCommissionPercentHelp}
            margin={singleIndentMargin}
          />
        </>
      )}

      <Divider />

      <FormInput
        type={sellerFullNameType}
        value={sellerFullName}
        label={sellerFullNameLabel}
        onChange={setSellerFullName}
        help={sellerFullNameHelp}
      />

      <Divider />

      <FormInput
        type={addressLine1Type}
        value={addressLine1}
        label={addressLine1Label}
        onChange={setAddressLine1}
        help={addressLine1Help}
      />

      <Divider />

      <FormInput
        type={addressLine2Type}
        value={addressLine2}
        label={addressLine2Label}
        onChange={setAddressLine2}
        help={addressLine2Help}
      />

      <Divider />

      <FormInput
        type={addressCityType}
        value={addressCity}
        label={addressCityLabel}
        onChange={setAddressCity}
        help={addressCityHelp}
      />

      <Divider />

      <FormInput
        type={addressStateType}
        value={addressState}
        label={addressStateLabel}
        onChange={setAddressState}
        help={addressStateHelp}
      />

      <Divider />

      <FormInput
        type={addressZipType}
        value={addressZip}
        label={addressZipLabel}
        onChange={setAddressZip}
        help={addressZipHelp}
      />

      <Divider />

      <FormInput
        type={specialAssessmentType}
        value={specialAssessment}
        label={specialAssessmentLabel}
        onChange={setSpecialAssessment}
        help={specialAssessmentHelp}
      />

      <Divider />

      <FormInput
        type={agentFeesType}
        value={agentFees}
        label={agentFeesLabel}
        onChange={setAgentFees}
        help={agentFeesHelp}
      />

      <Divider />

      <FormInput
        type={homeWarrantyType}
        value={homeWarranty}
        label={homeWarrantyLabel}
        onChange={setHomeWarranty}
        help={homeWarrantyHelp}
      />

      <Divider />

      <FormInput
        type={itemizedConcessionsType}
        value={itemizedConcessions}
        label={itemizedConcessionsLabel}
        onChange={setItemizedConcessions}
        help={itemizedConcessionsHelp}
      />

      <Divider />

      <FormInput
        type={calcForMeSellerPortionHoaType}
        value={calcForMeSellerPortionHoa}
        label={calcForMeSellerPortionHoaLabel}
        onChange={setCalcForMeSellerPortionHoa}
        help={calcForMeSellerPortionHoaHelp}
        options={calcForMeSellerPortionHoaOptions}
      />

      {calcForMeSellerPortionHoa ? (
        <>
          <Divider />

          <FormInput
            type={hoaPaymentFrequencyType}
            value={hoaPaymentFrequency}
            label={hoaPaymentFrequencyLabel}
            onChange={setHoaPaymentFrequency}
            help={hoaPaymentFrequencyHelp}
            options={hoaPaymentFrequencyOptions}
            margin={singleIndentMargin}
          />

          <Divider />

          <FormInput
            type={nextHoaPaymentDateType}
            value={nextHoaPaymentDate}
            label={nextHoaPaymentDateLabel}
            onChange={setNextHoaPaymentDate}
            help={nextHoaPaymentDateHelp}
            margin={singleIndentMargin}
          />

          <Divider />

          <FormInput
            type={hoaDuesType}
            value={hoaDues}
            label={hoaDuesLabel}
            onChange={setHoaDues}
            help={hoaDuesHelp}
            margin={singleIndentMargin}
          />
        </>
      ) : (
        <>
          <Divider />

          <FormInput
            type={sellerPortionNextHoaPaymentType}
            value={sellerPortionNextHoaPayment}
            label={sellerPortionNextHoaPaymentLabel}
            onChange={setSellerPortionNextHoaPayment}
            help={sellerPortionNextHoaPaymentHelp}
            margin={singleIndentMargin}
          />
        </>
      )}

      <Divider />

      <FormInput
        type={wireFeeType}
        value={wireFee}
        label={wireFeeLabel}
        onChange={setWireFee}
        help={wireFeeHelp}
      />

      <Divider />

      <FormInput
        type={itemizedChargesType}
        value={itemizedCharges}
        label={itemizedChargesLabel}
        onChange={setItemizedCharges}
        help={itemizedChargesHelp}
      />

      <Divider />

      <FormInput
        type={itemizedCreditsType}
        value={itemizedCredits}
        label={itemizedCreditsLabel}
        onChange={setItemizedCredits}
        help={itemizedCreditsHelp}
      />
    </Container>
  );
};

export default SellerCalculator;
