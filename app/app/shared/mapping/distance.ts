import { DEFAULT_DISTANCE } from "@/app/shared/constants";
import { ELanguage } from "@/app/shared/enums/language";

// KM_TO_MILES - Константа для перевода километров в мили
const KM_TO_MILES = 0.621371;

// convertToMiles - Функция для конвертации километров в мили
const convertToMiles = (options: { label: string; value: number }[]) => {
  return options.map((option) => ({
    label: `${(option.value * KM_TO_MILES).toFixed(2)}`,
    value: option.value,
  }));
};

const commonOptions = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
  { label: "7", value: 7 },
  { label: "10", value: 10 },
  { label: "15", value: 15 },
  { label: "20", value: 20 },
  { label: "30", value: 30 },
  { label: "50", value: 50 },
  { label: "75", value: 75 },
  { label: "100", value: 100 },
  { label: "150", value: 150 },
  { label: "200", value: 200 },
  { label: "300", value: 300 },
];

const optionsRu = (isMetric: boolean) => {
  const defaultOption = { label: "по умолчанию", value: DEFAULT_DISTANCE };
  return [
    ...(isMetric ? commonOptions : convertToMiles(commonOptions)),
    defaultOption,
  ];
};

const optionsEn = (isMetric: boolean) => {
  const defaultOption = { label: "by default", value: DEFAULT_DISTANCE };
  return [
    ...(isMetric ? commonOptions : convertToMiles(commonOptions)),
    defaultOption,
  ];
};

const optionsAr = (isMetric: boolean) => {
  const defaultOption = { label: "افتراضيا", value: DEFAULT_DISTANCE };
  return [
    ...(isMetric ? commonOptions : convertToMiles(commonOptions)),
    defaultOption,
  ];
};

const optionsBe = (isMetric: boolean) => {
  const defaultOption = { label: "па змаўчанні", value: DEFAULT_DISTANCE };
  return [
    ...(isMetric ? commonOptions : convertToMiles(commonOptions)),
    defaultOption,
  ];
};

const optionsCa = (isMetric: boolean) => {
  const defaultOption = { label: "per defecte", value: DEFAULT_DISTANCE };
  return [
    ...(isMetric ? commonOptions : convertToMiles(commonOptions)),
    defaultOption,
  ];
};

const optionsCs = (isMetric: boolean) => {
  const defaultOption = { label: "standardně", value: DEFAULT_DISTANCE };
  return [
    ...(isMetric ? commonOptions : convertToMiles(commonOptions)),
    defaultOption,
  ];
};

const optionsDe = (isMetric: boolean) => {
  const defaultOption = { label: "standardmäßig", value: DEFAULT_DISTANCE };
  return [
    ...(isMetric ? commonOptions : convertToMiles(commonOptions)),
    defaultOption,
  ];
};

const optionsEs = (isMetric: boolean) => {
  const defaultOption = { label: "por defecto", value: DEFAULT_DISTANCE };
  return [
    ...(isMetric ? commonOptions : convertToMiles(commonOptions)),
    defaultOption,
  ];
};

const optionsFi = (isMetric: boolean) => {
  const defaultOption = { label: "oletuksena", value: DEFAULT_DISTANCE };
  return [
    ...(isMetric ? commonOptions : convertToMiles(commonOptions)),
    defaultOption,
  ];
};

const optionsFr = (isMetric: boolean) => {
  const defaultOption = { label: "par défaut", value: DEFAULT_DISTANCE };
  return [
    ...(isMetric ? commonOptions : convertToMiles(commonOptions)),
    defaultOption,
  ];
};

const optionsHe = (isMetric: boolean) => {
  const defaultOption = { label: "כברירת מחדל", value: DEFAULT_DISTANCE };
  return [
    ...(isMetric ? commonOptions : convertToMiles(commonOptions)),
    defaultOption,
  ];
};

const optionsHi = (isMetric: boolean) => {
  const defaultOption = { label: "डिफ़ॉल्ट रूप से", value: DEFAULT_DISTANCE };
  return [
    ...(isMetric ? commonOptions : convertToMiles(commonOptions)),
    defaultOption,
  ];
};

const optionsHr = (isMetric: boolean) => {
  const defaultOption = {
    label: "prema zadanim postavkama",
    value: DEFAULT_DISTANCE,
  };
  return [
    ...(isMetric ? commonOptions : convertToMiles(commonOptions)),
    defaultOption,
  ];
};

const optionsHu = (isMetric: boolean) => {
  const defaultOption = {
    label: "alapértelmezés szerint",
    value: DEFAULT_DISTANCE,
  };
  return [
    ...(isMetric ? commonOptions : convertToMiles(commonOptions)),
    defaultOption,
  ];
};

const optionsId = (isMetric: boolean) => {
  const defaultOption = { label: "secara default", value: DEFAULT_DISTANCE };
  return [
    ...(isMetric ? commonOptions : convertToMiles(commonOptions)),
    defaultOption,
  ];
};

const optionsIt = (isMetric: boolean) => {
  const defaultOption = {
    label: "per impostazione predefinita",
    value: DEFAULT_DISTANCE,
  };
  return [
    ...(isMetric ? commonOptions : convertToMiles(commonOptions)),
    defaultOption,
  ];
};

const optionsJa = (isMetric: boolean) => {
  const defaultOption = { label: "デフォルトで", value: DEFAULT_DISTANCE };
  return [
    ...(isMetric ? commonOptions : convertToMiles(commonOptions)),
    defaultOption,
  ];
};

const optionsKk = (isMetric: boolean) => {
  const defaultOption = { label: "әдепкі бойынша", value: DEFAULT_DISTANCE };
  return [
    ...(isMetric ? commonOptions : convertToMiles(commonOptions)),
    defaultOption,
  ];
};

const optionsKo = (isMetric: boolean) => {
  const defaultOption = { label: "기본적으로", value: DEFAULT_DISTANCE };
  return [
    ...(isMetric ? commonOptions : convertToMiles(commonOptions)),
    defaultOption,
  ];
};

const optionsNl = (isMetric: boolean) => {
  const defaultOption = { label: "standaard", value: DEFAULT_DISTANCE };
  return [
    ...(isMetric ? commonOptions : convertToMiles(commonOptions)),
    defaultOption,
  ];
};

const optionsNo = (isMetric: boolean) => {
  const defaultOption = { label: "som standard", value: DEFAULT_DISTANCE };
  return [
    ...(isMetric ? commonOptions : convertToMiles(commonOptions)),
    defaultOption,
  ];
};

const optionsPt = (isMetric: boolean) => {
  const defaultOption = { label: "por defeito", value: DEFAULT_DISTANCE };
  return [
    ...(isMetric ? commonOptions : convertToMiles(commonOptions)),
    defaultOption,
  ];
};

const optionsSv = (isMetric: boolean) => {
  const defaultOption = { label: "som standard", value: DEFAULT_DISTANCE };
  return [
    ...(isMetric ? commonOptions : convertToMiles(commonOptions)),
    defaultOption,
  ];
};

const optionsUk = (isMetric: boolean) => {
  const defaultOption = { label: "за замовчуванням", value: DEFAULT_DISTANCE };
  return [
    ...(isMetric ? commonOptions : convertToMiles(commonOptions)),
    defaultOption,
  ];
};

const optionsZh = (isMetric: boolean) => {
  const defaultOption = { label: "默认情况下", value: DEFAULT_DISTANCE };
  return [
    ...(isMetric ? commonOptions : convertToMiles(commonOptions)),
    defaultOption,
  ];
};

export const getDistanceByLocale = (lng: ELanguage, isMetric: boolean) => {
  switch (lng) {
    case ELanguage.Ru:
      return optionsRu(isMetric);
    case ELanguage.En:
      return optionsEn(isMetric);
    case ELanguage.Ar:
      return optionsAr(isMetric);
    case ELanguage.Be:
      return optionsBe(isMetric);
    case ELanguage.Ca:
      return optionsCa(isMetric);
    case ELanguage.Cs:
      return optionsCs(isMetric);
    case ELanguage.De:
      return optionsDe(isMetric);
    case ELanguage.Es:
      return optionsEs(isMetric);
    case ELanguage.Fi:
      return optionsFi(isMetric);
    case ELanguage.Fr:
      return optionsFr(isMetric);
    case ELanguage.He:
      return optionsHe(isMetric);
    case ELanguage.Hi:
      return optionsHi(isMetric);
    case ELanguage.Hr:
      return optionsHr(isMetric);
    case ELanguage.Hu:
      return optionsHu(isMetric);
    case ELanguage.Id:
      return optionsId(isMetric);
    case ELanguage.It:
      return optionsIt(isMetric);
    case ELanguage.Ja:
      return optionsJa(isMetric);
    case ELanguage.Kk:
      return optionsKk(isMetric);
    case ELanguage.Ko:
      return optionsKo(isMetric);
    case ELanguage.Nl:
      return optionsNl(isMetric);
    case ELanguage.No:
      return optionsNo(isMetric);
    case ELanguage.Pt:
      return optionsPt(isMetric);
    case ELanguage.Sv:
      return optionsSv(isMetric);
    case ELanguage.Uk:
      return optionsUk(isMetric);
    case ELanguage.Zh:
      return optionsZh(isMetric);
    default:
      return optionsEn(isMetric);
  }
};
