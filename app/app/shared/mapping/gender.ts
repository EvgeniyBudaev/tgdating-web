import { EGender, ELanguage } from "@/app/shared/enums";

const genderOptionsRu = [
  { label: "мужской", value: EGender.Man },
  { label: "женский", value: EGender.Woman },
];

const genderOptionsEn = [
  { label: "man", value: EGender.Man },
  { label: "woman", value: EGender.Woman },
];

const genderOptionsAr = [
  { label: "ذكر", value: EGender.Man },
  { label: "أنثى", value: EGender.Woman },
];

const genderOptionsBe = [
  { label: "мужчынскі", value: EGender.Man },
  { label: "жаночы", value: EGender.Woman },
];

const genderOptionsCa = [
  { label: "mascle", value: EGender.Man },
  { label: "femella", value: EGender.Woman },
];

const genderOptionsCs = [
  { label: "samec", value: EGender.Man },
  { label: "žena", value: EGender.Woman },
];

const genderOptionsDe = [
  { label: "männlich", value: EGender.Man },
  { label: "weiblich", value: EGender.Woman },
];

const genderOptionsEs = [
  { label: "masculino", value: EGender.Man },
  { label: "femenino", value: EGender.Woman },
];

const genderOptionsFi = [
  { label: "uros", value: EGender.Man },
  { label: "naaras", value: EGender.Woman },
];

const genderOptionsFr = [
  { label: "mâle", value: EGender.Man },
  { label: "femelle", value: EGender.Woman },
];

const genderOptionsHe = [
  { label: "זָכָר", value: EGender.Man },
  { label: "נְקֵבָה", value: EGender.Woman },
];

const genderOptionsHr = [
  { label: "muški", value: EGender.Man },
  { label: "žena", value: EGender.Woman },
];

const genderOptionsHu = [
  { label: "férfi", value: EGender.Man },
  { label: "női", value: EGender.Woman },
];

const genderOptionsId = [
  { label: "pria", value: EGender.Man },
  { label: "perempuan", value: EGender.Woman },
];

const genderOptionsIt = [
  { label: "maschio", value: EGender.Man },
  { label: "femmina", value: EGender.Woman },
];

const genderOptionsJa = [
  { label: "男", value: EGender.Man },
  { label: "女性", value: EGender.Woman },
];

const genderOptionsKk = [
  { label: "мужской", value: EGender.Man },
  { label: "еркек", value: EGender.Woman },
];

const genderOptionsKo = [
  { label: "남성", value: EGender.Man },
  { label: "여성", value: EGender.Woman },
];

const genderOptionsNl = [
  { label: "mannelijk", value: EGender.Man },
  { label: "vrouwelijk", value: EGender.Woman },
];

const genderOptionsNo = [
  { label: "mann", value: EGender.Man },
  { label: "hunn", value: EGender.Woman },
];

const genderOptionsPt = [
  { label: "macho", value: EGender.Man },
  { label: "fêmea", value: EGender.Woman },
];

const genderOptionsSv = [
  { label: "manlig", value: EGender.Man },
  { label: "kvinnlig", value: EGender.Woman },
];

const genderOptionsUk = [
  { label: "чоловічий", value: EGender.Man },
  { label: "жіночий", value: EGender.Woman },
];

const genderOptionsZh = [
  { label: "男性", value: EGender.Man },
  { label: "女性", value: EGender.Woman },
];

export const GENDER_MAPPING = {
  [ELanguage.Ru]: genderOptionsRu,
  [ELanguage.En]: genderOptionsEn,
  [ELanguage.Ar]: genderOptionsAr,
  [ELanguage.Be]: genderOptionsBe,
  [ELanguage.Ca]: genderOptionsCa,
  [ELanguage.Cs]: genderOptionsCs,
  [ELanguage.De]: genderOptionsDe,
  [ELanguage.Es]: genderOptionsEs,
  [ELanguage.Fi]: genderOptionsFi,
  [ELanguage.Fr]: genderOptionsFr,
  [ELanguage.He]: genderOptionsHe,
  [ELanguage.Hr]: genderOptionsHr,
  [ELanguage.Hu]: genderOptionsHu,
  [ELanguage.Id]: genderOptionsId,
  [ELanguage.It]: genderOptionsIt,
  [ELanguage.Ja]: genderOptionsJa,
  [ELanguage.Kk]: genderOptionsKk,
  [ELanguage.Ko]: genderOptionsKo,
  [ELanguage.Nl]: genderOptionsNl,
  [ELanguage.No]: genderOptionsNo,
  [ELanguage.Pt]: genderOptionsPt,
  [ELanguage.Sv]: genderOptionsSv,
  [ELanguage.Uk]: genderOptionsUk,
  [ELanguage.Zh]: genderOptionsZh,
};
