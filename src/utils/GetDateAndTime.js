
import moment from "moment";
import "moment/locale/hr";

export const get24HourTime = () => {
  return moment().format("HH:mm:ss");
};

export const getDDMMYYYYDate = () => {
  return moment().format("DD.MM.YYYY");
};

export const getDateTimeWithAt = () => {
  return moment().format("DD.MM.YYYY [at] HH:mm:ss");
};
