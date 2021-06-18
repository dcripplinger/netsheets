import { useMemo, useState } from "react";
import styled from "styled-components";

import FormInput from "./FormInput";

const Container = styled.div`
  margin: 40px;
`;

const makeArrayUpdater = (setter) => {
  return (index, item) =>
    setter((prev) => {
      const newArr = [...prev];
      newArr[index] = item;
      return newArr;
    });
};

const SellerCalculator = () => {
  const [offerId, setOfferId] = useState(null);
  const offerIdLabel = "Offer ID";
  const offerIdType = "string";
  const offerIdHelp =
    "Enter anything you want to identify this offer compared to others. Just make sure to not include the buyer's personal information.";
  const [offerAmount, setOfferAmount] = useState(null);
  const offerAmountLabel = "Offer amount";
  const offerAmountType = "dollars";
  const offerAmountHelp = "The amount the buyer is offering.";
  const [offerDate, setOfferDate] = useState(new Date());
  const [useDifferentSaleAmount, setUseDifferentSaleAmount] = useState(false);
  const [differentSaleAmount, setDifferentSaleAmount] = useState(null);
  const [closingDate, setClosingDate] = useState(null);
  const [mortgageBalance, setMortgageBalance] = useState(null);
  const [sellerPaysTitleInsurance, setSellerPaysTitleInsurance] =
    useState(true);
  const [annualTax, setAnnualTax] = useState(null);
  const [closingFee, setClosingFee] = useState(300);
  const [combinedCommissionPercent, setCombinedCommissionPercent] = useState(6);
  const [sellerCommissionPercent, setSellerCommissionPercent] = useState(3);
  const [buyerCommissionPercent, setBuyerCommissionPercent] = useState(3);
  const [sellerFullName, setSellerFullName] = useState(null);
  const [addressLine1, setAddressLine1] = useState(null);
  const [addressLine2, setAddressLine2] = useState(null);
  const [addressCity, setAddressCity] = useState(null);
  const [addressState, setAddressState] = useState(null);
  const [addressZip, setAddressZip] = useState(null);
  const [specialAssessment, setSpecialAssessment] = useState(null);
  const [agentFees, setAgentFees] = useState(null);
  const [homeWarranty, setHomeWarranty] = useState(null);
  const [sellerConcessions, setSellerConcessions] = useState(null);
  const [useItemizedConcessions, setUseItemizedConcessions] = useState(false);
  const [itemizedConcessions, setItemizedConcessions] = useState([
    {
      label: null,
      value: null,
    },
  ]);
  // Takes args (index, { label, value })
  const updateItemizedConcession = useMemo(
    () => makeArrayUpdater(setItemizedConcessions),
    [setItemizedConcessions]
  );
  const [sellerPortionNextHoaPayment, setSellerPortionNextHoaPayment] =
    useState(null);
  const [calcForMeSellerPortionHoa, setCalcForMeSellerPortionHoa] =
    useState(false);
  const [hoaPaymentFrequency, setHoaPaymentFrequency] = useState("monthly");
  const [hoaDues, setHoaDues] = useState(null);
  const [nextHoaPaymentDate, setNextHoaPaymentDate] = useState(null);
  const [wireFee, setWireFee] = useState(40);
  const [miscCharges, setMiscCharges] = useState(null);
  const [useItemizedCharges, setUseItemizedCharges] = useState(false);
  const [itemizedCharges, setItemizedCharges] = useState([
    {
      label: null,
      value: null,
    },
  ]);
  // Takes args (index, { label, value })
  const updateItemizedCharge = useMemo(
    () => makeArrayUpdater(setItemizedCharges),
    [setItemizedCharges]
  );
  const [micCredits, setMiscCredits] = useState(null);
  const [useItemizedCredits, setUseItemizedCredits] = useState(false);
  const [itemizedCredits, setItemizedCredits] = useState([
    {
      label: null,
      value: null,
    },
  ]);
  // Takes args (index, { label, value })
  const updateItemizedCredit = useMemo(
    () => makeArrayUpdater(setItemizedCredits),
    [setItemizedCredits]
  );

  return (
    <Container>
      <FormInput
        type={offerIdType}
        value={offerId}
        label={offerIdLabel}
        onChange={setOfferId}
        help={offerIdHelp}
      />
    </Container>
  );
};

export default SellerCalculator;
