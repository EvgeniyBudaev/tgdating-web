import { ELanguage } from "@/app/shared/enums";
import { EMeasurement } from "@/app/shared/enums/form";

const measurementOptionsRu = [
  { label: "метрическая", value: EMeasurement.Metric },
  { label: "американская", value: EMeasurement.American },
];

const measurementOptionsEn = [
  { label: "metric", value: EMeasurement.Metric },
  { label: "american", value: EMeasurement.American },
];

const measurementOptionsAr = [
  { label: "متري", value: EMeasurement.Metric },
  { label: "أمريكي", value: EMeasurement.American },
];

const measurementOptionsBe = [
  { label: "метрычная", value: EMeasurement.Metric },
  { label: "амерыканская", value: EMeasurement.American },
];

const measurementOptionsCa = [
  { label: "mètrica", value: EMeasurement.Metric },
  { label: "americà", value: EMeasurement.American },
];

const measurementOptionsCs = [
  { label: "metrický", value: EMeasurement.Metric },
  { label: "americký", value: EMeasurement.American },
];

const measurementOptionsDe = [
  { label: "metrisch", value: EMeasurement.Metric },
  { label: "amerikanisch", value: EMeasurement.American },
];

const measurementOptionsEs = [
  { label: "métrico", value: EMeasurement.Metric },
  { label: "americano", value: EMeasurement.American },
];

const measurementOptionsFi = [
  { label: "metristä", value: EMeasurement.Metric },
  { label: "amerikkalainen", value: EMeasurement.American },
];

const measurementOptionsFr = [
  { label: "métrique", value: EMeasurement.Metric },
  { label: "américain", value: EMeasurement.American },
];

const measurementOptionsHe = [
  { label: "מֶטרִי", value: EMeasurement.Metric },
  { label: "אֲמֶרִיקָאִי", value: EMeasurement.American },
];

const measurementOptionsHr = [
  { label: "metrički", value: EMeasurement.Metric },
  { label: "američki", value: EMeasurement.American },
];

const measurementOptionsHu = [
  { label: "metrikus", value: EMeasurement.Metric },
  { label: "amerikai", value: EMeasurement.American },
];

const measurementOptionsId = [
  { label: "metrik", value: EMeasurement.Metric },
  { label: "amerika", value: EMeasurement.American },
];

const measurementOptionsIt = [
  { label: "metrico", value: EMeasurement.Metric },
  { label: "americano", value: EMeasurement.American },
];

const measurementOptionsJa = [
  { label: "メトリック", value: EMeasurement.Metric },
  { label: "アメリカ人", value: EMeasurement.American },
];

const measurementOptionsKk = [
  { label: "метрикалық", value: EMeasurement.Metric },
  { label: "американдық", value: EMeasurement.American },
];

const measurementOptionsKo = [
  { label: "미터법", value: EMeasurement.Metric },
  { label: "미국 사람", value: EMeasurement.American },
];

const measurementOptionsNl = [
  { label: "metrisch", value: EMeasurement.Metric },
  { label: "amerikaans", value: EMeasurement.American },
];

const measurementOptionsNo = [
  { label: "metrisk", value: EMeasurement.Metric },
  { label: "amerikansk", value: EMeasurement.American },
];

const measurementOptionsPt = [
  { label: "métrica", value: EMeasurement.Metric },
  { label: "americano", value: EMeasurement.American },
];

const measurementOptionsSv = [
  { label: "metrisk", value: EMeasurement.Metric },
  { label: "amerikansk", value: EMeasurement.American },
];

const measurementOptionsUk = [
  { label: "метрична", value: EMeasurement.Metric },
  { label: "американська", value: EMeasurement.American },
];

const measurementOptionsZh = [
  { label: "公制", value: EMeasurement.Metric },
  { label: "美国人", value: EMeasurement.American },
];

export const getMeasurementByLocale = (lng: ELanguage) => {
  switch (lng) {
    case ELanguage.Ru:
      return measurementOptionsRu;
    case ELanguage.En:
      return measurementOptionsEn;
    case ELanguage.Ar:
      return measurementOptionsAr;
    case ELanguage.Be:
      return measurementOptionsBe;
    case ELanguage.Ca:
      return measurementOptionsCa;
    case ELanguage.Cs:
      return measurementOptionsCs;
    case ELanguage.De:
      return measurementOptionsDe;
    case ELanguage.Es:
      return measurementOptionsEs;
    case ELanguage.Fi:
      return measurementOptionsFi;
    case ELanguage.Fr:
      return measurementOptionsFr;
    case ELanguage.He:
      return measurementOptionsHe;
    case ELanguage.Hr:
      return measurementOptionsHr;
    case ELanguage.Hu:
      return measurementOptionsHu;
    case ELanguage.Id:
      return measurementOptionsId;
    case ELanguage.It:
      return measurementOptionsIt;
    case ELanguage.Ja:
      return measurementOptionsJa;
    case ELanguage.Kk:
      return measurementOptionsKk;
    case ELanguage.Ko:
      return measurementOptionsKo;
    case ELanguage.Nl:
      return measurementOptionsNl;
    case ELanguage.No:
      return measurementOptionsNo;
    case ELanguage.Pt:
      return measurementOptionsPt;
    case ELanguage.Sv:
      return measurementOptionsSv;
    case ELanguage.Uk:
      return measurementOptionsUk;
    case ELanguage.Zh:
      return measurementOptionsZh;
    default:
      return measurementOptionsEn;
  }
};
