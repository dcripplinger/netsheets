import {
  addMonths,
  addYears,
  differenceInCalendarDays,
  format,
  isLeapYear,
  startOfMonth,
  startOfYear,
} from "date-fns";
import _ from "lodash";

/** This is the rate per thousand that the title insurance company charges
 * for the title insurance. The number is a fraction, not a percent.
 * I'm currently making a guess of 0.6% based on some reading online of
 * typical rates. But every title insurance company is different and
 * might use different rates or even a bracket system where the rates
 * change for very expensive homes, which I have not yet accounted for
 * here.
 */
const RATE_PER_THOUSAND = 0.006;

const formatDate = (date) => format(date, "MMM d, yyyy");

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const formatMoney = currencyFormatter.format;

const getHeaderItems = ({
  offerId,
  offerAmount,
  offerDate,
  closingDate,
  sellerFullName,
  addressLine1,
  addressLine2,
  addressCity,
  addressState,
  addressZip,
}) => {
  const headerItems = [];

  if (sellerFullName) {
    headerItems.push({
      label: "Seller",
      value: sellerFullName,
    });
  }

  if (offerId) {
    headerItems.push({
      label: "Offer ID",
      value: offerId,
    });
  }

  if (offerDate) {
    headerItems.push({
      label: "Offer date",
      value: formatDate(offerDate),
    });
  }

  if (offerAmount) {
    headerItems.push({
      label: "Offer amount",
      value: formatMoney(offerAmount),
    });
  }

  if (closingDate) {
    headerItems.push({
      label: "Closing date",
      value: formatDate(closingDate),
    });
  }

  if (
    addressLine1 ||
    addressLine2 ||
    addressCity ||
    addressState ||
    addressZip
  ) {
    headerItems.push({
      label: "Address",
      value: _.compact([
        addressLine1,
        addressLine2,
        _.compact([addressCity, addressState, addressZip]).join(" "),
      ]),
    });
  }

  return headerItems;
};

const getSalePrice = ({
  offerAmount,
  useDifferentSaleAmount,
  differentSaleAmount,
}) => {
  const amount = useDifferentSaleAmount ? differentSaleAmount : offerAmount;
  return amount || 0;
};

const getTaxProrations = ({ annualTax, closingDate }) => {
  const start = startOfYear(closingDate);
  const days = differenceInCalendarDays(closingDate, start);
  const daysInYear = isLeapYear(closingDate) ? 366 : 365;
  const amount = (annualTax * days) / daysInYear;
  return Number(amount.toFixed(2));
};

const getCommission = ({ percent, salePrice }) => {
  const amount = (salePrice * percent) / 100;
  return Number(amount.toFixed(2));
};

const getSellerPortionNextHoaPayment = ({
  calcForMeSellerPortionHoa,
  sellerPortionNextHoaPayment,
  hoaPaymentFrequency,
  hoaDues,
  nextHoaPaymentDate,
  closingDate,
}) => {
  if (!calcForMeSellerPortionHoa) {
    return sellerPortionNextHoaPayment;
  }
  const _nextHoaPaymentDate =
    nextHoaPaymentDate ||
    (hoaPaymentFrequency === "monthly"
      ? startOfMonth(addMonths(closingDate, 1))
      : startOfYear(addYears(closingDate, 1)));
  const prevHoaPaymentDate =
    hoaPaymentFrequency === "monthly"
      ? addMonths(_nextHoaPaymentDate, -1)
      : addYears(_nextHoaPaymentDate, -1);
  const daysBetweenDueDates = differenceInCalendarDays(
    _nextHoaPaymentDate,
    prevHoaPaymentDate
  );
  const daysSinceLastDueDate = differenceInCalendarDays(
    closingDate,
    prevHoaPaymentDate
  );
  const amount = (hoaDues * daysSinceLastDueDate) / daysBetweenDueDates;
  if (amount < 0) {
    return 0;
  }
  return Number(amount.toFixed(2));
};

// This groups all unlabeled itemized lines under a single total
// and uses the defaultDescription as its label. All other items
// that are non-zero and have labels will appear as separate line
// items in the report.
const massageItemizedList = ({ items, defaultDescription }) => {
  const newItems = [];
  let generic = 0;
  _.forEach(items, (item) => {
    if (item.value) {
      if (item.label) {
        newItems.push(item);
      } else {
        generic += item.value;
      }
    }
  });
  if (generic) {
    newItems.push({
      label: defaultDescription,
      value: generic,
    });
  }
};

const getTitleInsurance = (salePrice) => {
  const amount = Math.floor(salePrice / 1000) * 1000 * RATE_PER_THOUSAND;
  return Number(amount.toFixed(2));
};

const getLineItems = ({
  offerAmount,
  useDifferentSaleAmount,
  differentSaleAmount,
  closingDate,
  mortgagePayoffAmount,
  sellerPaysTitleInsurance,
  annualTax,
  closingFee,
  useIndividualCommissions,
  combinedCommissionPercent,
  sellerCommissionPercent,
  buyerCommissionPercent,
  specialAssessment,
  agentFees,
  homeWarranty,
  itemizedConcessions,
  calcForMeSellerPortionHoa,
  sellerPortionNextHoaPayment,
  hoaPaymentFrequency,
  hoaDues,
  nextHoaPaymentDate,
  wireFee,
  itemizedCharges,
  itemizedCredits,
}) => {
  const salePrice = getSalePrice({
    offerAmount,
    useDifferentSaleAmount,
    differentSaleAmount,
  });

  const lineItems = [];

  lineItems.push({
    description: "Sale price",
    charge: null,
    credit: salePrice,
  });

  if (mortgagePayoffAmount) {
    lineItems.push({
      description: "Estimated mortgage payoff",
      charge: mortgagePayoffAmount,
      credit: null,
    });
  }

  if (annualTax) {
    lineItems.push({
      description: "Tax prorations",
      charge: getTaxProrations({ annualTax, closingDate }),
      credit: null,
    });
  }

  if (specialAssessment) {
    lineItems.push({
      description: "Special assessment",
      charge: specialAssessment,
      credit: null,
    });
  }

  const _sellerPortionNextHoaPayment = getSellerPortionNextHoaPayment({
    calcForMeSellerPortionHoa,
    sellerPortionNextHoaPayment,
    hoaPaymentFrequency,
    hoaDues,
    nextHoaPaymentDate,
    closingDate,
  });
  if (_sellerPortionNextHoaPayment) {
    lineItems.push({
      description: "HOA fees owed by seller",
      charge: _sellerPortionNextHoaPayment,
      credit: null,
    });
  }

  if (useIndividualCommissions && sellerCommissionPercent) {
    lineItems.push({
      description: "Seller's agent commission",
      charge: getCommission({ percent: sellerCommissionPercent, salePrice }),
      credit: null,
    });
  }

  if (useIndividualCommissions && buyerCommissionPercent) {
    lineItems.push({
      description: "Buyer's agent commission",
      charge: getCommission({ percent: buyerCommissionPercent, salePrice }),
      credit: null,
    });
  }

  if (!useIndividualCommissions && combinedCommissionPercent) {
    lineItems.push({
      description: "Agents commission",
      charge: getCommission({ percent: combinedCommissionPercent, salePrice }),
      credit: null,
    });
  }

  if (closingFee) {
    lineItems.push({
      description: "Closing fee",
      charge: closingFee,
      credit: null,
    });
  }

  if (wireFee) {
    lineItems.push({
      description: "Wire fee",
      charge: wireFee,
      credit: null,
    });
  }

  if (sellerPaysTitleInsurance) {
    lineItems.push({
      description: "Title insurance",
      charge: getTitleInsurance(salePrice),
      credit: null,
    });
  }

  if (agentFees) {
    lineItems.push({
      description: "Agent fees",
      charge: agentFees,
      credit: null,
    });
  }

  if (homeWarranty) {
    lineItems.push({
      description: "Home warranty",
      charge: homeWarranty,
      credit: null,
    });
  }

  const sellerConcessions = massageItemizedList({
    items: itemizedConcessions,
    defaultDescription: "Seller concessions",
  });
  _.forEach(sellerConcessions, (item) => {
    lineItems.push({
      description: item.label,
      charge: item.value,
      credit: null,
    });
  });

  const miscCharges = massageItemizedList({
    items: itemizedCharges,
    defaultDescription: "Miscellaneous charges",
  });
  _.forEach(miscCharges, (item) => {
    lineItems.push({
      description: item.label,
      charge: item.value,
      credit: null,
    });
  });

  const miscCredits = massageItemizedList({
    items: itemizedCredits,
    defaultDescription: "Miscellaneous credits",
  });
  _.forEach(miscCredits, (item) => {
    lineItems.push({
      description: item.label,
      charge: null,
      credit: item.value,
    });
  });

  return lineItems;
};

const getTotals = (lineItems) => {
  const credits = _.sumBy(lineItems, (item) => item.credit);
  const charges = _.sumBy(lineItems, (item) => item.charge);
  return {
    description: "TOTALS",
    credit: credits,
    charge: charges,
  };
};

const getNet = (totals) => {
  return {
    description: "Cash to seller",
    credit: totals.credit - totals.charge,
    charge: null,
  };
};

const calculateSellerNetSheet = ({
  offerId,
  offerAmount,
  offerDate,
  useDifferentSaleAmount,
  differentSaleAmount,
  closingDate,
  mortgagePayoffAmount,
  sellerPaysTitleInsurance,
  annualTax,
  closingFee,
  useIndividualCommissions,
  combinedCommissionPercent,
  sellerCommissionPercent,
  buyerCommissionPercent,
  sellerFullName,
  addressLine1,
  addressLine2,
  addressCity,
  addressState,
  addressZip,
  specialAssessment,
  agentFees,
  homeWarranty,
  itemizedConcessions,
  calcForMeSellerPortionHoa,
  sellerPortionNextHoaPayment,
  hoaPaymentFrequency,
  hoaDues,
  nextHoaPaymentDate,
  wireFee,
  itemizedCharges,
  itemizedCredits,
}) => {
  const headerItems = getHeaderItems({
    offerId,
    offerAmount,
    offerDate,
    closingDate,
    sellerFullName,
    addressLine1,
    addressLine2,
    addressCity,
    addressState,
    addressZip,
  });

  const lineItems = getLineItems({
    offerAmount,
    useDifferentSaleAmount,
    differentSaleAmount,
    closingDate,
    mortgagePayoffAmount,
    sellerPaysTitleInsurance,
    annualTax,
    closingFee,
    useIndividualCommissions,
    combinedCommissionPercent,
    sellerCommissionPercent,
    buyerCommissionPercent,
    specialAssessment,
    agentFees,
    homeWarranty,
    itemizedConcessions,
    calcForMeSellerPortionHoa,
    sellerPortionNextHoaPayment,
    hoaPaymentFrequency,
    hoaDues,
    nextHoaPaymentDate,
    wireFee,
    itemizedCharges,
    itemizedCredits,
  });

  const totals = getTotals(lineItems);

  const net = getNet(totals);

  return {
    headerItems,
    lineItems,
    totals,
    net,
  };
};

export default calculateSellerNetSheet;
