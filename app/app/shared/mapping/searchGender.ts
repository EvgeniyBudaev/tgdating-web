import { ELanguage, ESearchGender } from "@/app/shared/enums";

const searchGenderOptionsRu = [
  { label: "все", value: ESearchGender.All },
  { label: "парни", value: ESearchGender.Man },
  { label: "девушки", value: ESearchGender.Woman },
];

const searchGenderOptionsEn = [
  { label: "all", value: ESearchGender.All },
  { label: "boys", value: ESearchGender.Man },
  { label: "girls", value: ESearchGender.Woman },
];

const searchGenderOptionsAr = [
  { label: "الجميع", value: ESearchGender.All },
  { label: "شباب", value: ESearchGender.Man },
  { label: "فتيات", value: ESearchGender.Woman },
];

const searchGenderOptionsBe = [
  { label: "усё", value: ESearchGender.All },
  { label: "хлопцы", value: ESearchGender.Man },
  { label: "дзяўчаты", value: ESearchGender.Woman },
];

const searchGenderOptionsCa = [
  { label: "tots", value: ESearchGender.All },
  { label: "nois", value: ESearchGender.Man },
  { label: "noies", value: ESearchGender.Woman },
];

const searchGenderOptionsCs = [
  { label: "vše", value: ESearchGender.All },
  { label: "chlapi", value: ESearchGender.Man },
  { label: "dívky", value: ESearchGender.Woman },
];

const searchGenderOptionsDe = [
  { label: "alle", value: ESearchGender.All },
  { label: "jungs", value: ESearchGender.Man },
  { label: "mädchen", value: ESearchGender.Woman },
];

const searchGenderOptionsEs = [
  { label: "todo", value: ESearchGender.All },
  { label: "tipo", value: ESearchGender.Man },
  { label: "chicas", value: ESearchGender.Woman },
];

const searchGenderOptionsFi = [
  { label: "kaikki", value: ESearchGender.All },
  { label: "kaverit", value: ESearchGender.Man },
  { label: "tytöt", value: ESearchGender.Woman },
];

const searchGenderOptionsFr = [
  { label: "tous", value: ESearchGender.All },
  { label: "les gars", value: ESearchGender.Man },
  { label: "filles", value: ESearchGender.Woman },
];

const searchGenderOptionsHe = [
  { label: "כֹּל", value: ESearchGender.All },
  { label: "חבר'ה", value: ESearchGender.Man },
  { label: "בנות", value: ESearchGender.Woman },
];

const searchGenderOptionsHr = [
  { label: "sve", value: ESearchGender.All },
  { label: "momci", value: ESearchGender.Man },
  { label: "djevojke", value: ESearchGender.Woman },
];

const searchGenderOptionsHu = [
  { label: "minden", value: ESearchGender.All },
  { label: "srácok", value: ESearchGender.Man },
  { label: "lányok", value: ESearchGender.Woman },
];

const searchGenderOptionsId = [
  { label: "semua", value: ESearchGender.All },
  { label: "teman-teman", value: ESearchGender.Man },
  { label: "cewek-cewek", value: ESearchGender.Woman },
];

const searchGenderOptionsIt = [
  { label: "tutto", value: ESearchGender.All },
  { label: "ragazzi", value: ESearchGender.Man },
  { label: "ragazze", value: ESearchGender.Woman },
];

const searchGenderOptionsJa = [
  { label: "全て", value: ESearchGender.All },
  { label: "みんな", value: ESearchGender.Man },
  { label: "女の子", value: ESearchGender.Woman },
];

const searchGenderOptionsKk = [
  { label: "барлығы", value: ESearchGender.All },
  { label: "жігіттер", value: ESearchGender.Man },
  { label: "қыздар", value: ESearchGender.Woman },
];

const searchGenderOptionsKo = [
  { label: "모두", value: ESearchGender.All },
  { label: "얘들아", value: ESearchGender.Man },
  { label: "여자애들", value: ESearchGender.Woman },
];

const searchGenderOptionsNl = [
  { label: "alle", value: ESearchGender.All },
  { label: "jongens", value: ESearchGender.Man },
  { label: "meisjes", value: ESearchGender.Woman },
];

const searchGenderOptionsNo = [
  { label: "alle", value: ESearchGender.All },
  { label: "gutta", value: ESearchGender.Man },
  { label: "jenter", value: ESearchGender.Woman },
];

const searchGenderOptionsPt = [
  { label: "todos", value: ESearchGender.All },
  { label: "pessoal", value: ESearchGender.Man },
  { label: "garotas", value: ESearchGender.Woman },
];

const searchGenderOptionsSv = [
  { label: "alla", value: ESearchGender.All },
  { label: "killar", value: ESearchGender.Man },
  { label: "flickor", value: ESearchGender.Woman },
];

const searchGenderOptionsUk = [
  { label: "все", value: ESearchGender.All },
  { label: "хлопці", value: ESearchGender.Man },
  { label: "дівчата", value: ESearchGender.Woman },
];

const searchGenderOptionsZh = [
  { label: "全部", value: ESearchGender.All },
  { label: "伙计们", value: ESearchGender.Man },
  { label: "女孩们", value: ESearchGender.Woman },
];

export const SEARCH_GENDER_MAPPING = {
  [ELanguage.Ru]: searchGenderOptionsRu,
  [ELanguage.En]: searchGenderOptionsEn,
  [ELanguage.Ar]: searchGenderOptionsAr,
  [ELanguage.Be]: searchGenderOptionsBe,
  [ELanguage.Ca]: searchGenderOptionsCa,
  [ELanguage.Cs]: searchGenderOptionsCs,
  [ELanguage.De]: searchGenderOptionsDe,
  [ELanguage.Es]: searchGenderOptionsEs,
  [ELanguage.Fi]: searchGenderOptionsFi,
  [ELanguage.Fr]: searchGenderOptionsFr,
  [ELanguage.He]: searchGenderOptionsHe,
  [ELanguage.Hr]: searchGenderOptionsHr,
  [ELanguage.Hu]: searchGenderOptionsHu,
  [ELanguage.Id]: searchGenderOptionsId,
  [ELanguage.It]: searchGenderOptionsIt,
  [ELanguage.Ja]: searchGenderOptionsJa,
  [ELanguage.Kk]: searchGenderOptionsKk,
  [ELanguage.Ko]: searchGenderOptionsKo,
  [ELanguage.Nl]: searchGenderOptionsNl,
  [ELanguage.No]: searchGenderOptionsNo,
  [ELanguage.Pt]: searchGenderOptionsPt,
  [ELanguage.Sv]: searchGenderOptionsSv,
  [ELanguage.Uk]: searchGenderOptionsUk,
  [ELanguage.Zh]: searchGenderOptionsZh,
};

const searchBarSearchGenderOptionsRu = [
  { label: "парни поблизости", value: ESearchGender.Man },
  { label: "девушки поблизости", value: ESearchGender.Woman },
  { label: "все люди поблизости", value: ESearchGender.All },
];

const searchBarSearchGenderOptionsEn = [
  { label: "boys nearby", value: ESearchGender.Man },
  { label: "girls nearby", value: ESearchGender.Woman },
  { label: "all the people nearby", value: ESearchGender.All },
];

const searchBarSearchGenderOptionsAr = [
  { label: "الرجال في مكان قريب", value: ESearchGender.Man },
  { label: "الفتيات في مكان قريب", value: ESearchGender.Woman },
  { label: "كل الناس في مكان قريب", value: ESearchGender.All },
];

const searchBarSearchGenderOptionsBe = [
  { label: "хлопцы паблізу", value: ESearchGender.Man },
  { label: "дзяўчаты паблізу", value: ESearchGender.Woman },
  { label: "усе людзі паблізу", value: ESearchGender.All },
];

const searchBarSearchGenderOptionsCa = [
  { label: "nois a prop", value: ESearchGender.Man },
  { label: "noies a prop", value: ESearchGender.Woman },
  { label: "tota la gent propera", value: ESearchGender.All },
];

const searchBarSearchGenderOptionsCs = [
  { label: "kluci poblíž", value: ESearchGender.Man },
  { label: "dívky poblíž", value: ESearchGender.Woman },
  { label: "všichni lidé poblíž", value: ESearchGender.All },
];

const searchBarSearchGenderOptionsDe = [
  { label: "jungs in der nähe", value: ESearchGender.Man },
  { label: "mädchen in der nähe", value: ESearchGender.Woman },
  { label: "alle leute in der nähe", value: ESearchGender.All },
];

const searchBarSearchGenderOptionsEs = [
  { label: "chicos cerca", value: ESearchGender.Man },
  { label: "chicas cercanas", value: ESearchGender.Woman },
  { label: "toda la gente cerca", value: ESearchGender.All },
];

const searchBarSearchGenderOptionsFi = [
  { label: "kaverit lähellä", value: ESearchGender.Man },
  { label: "tytöt lähellä", value: ESearchGender.Woman },
  { label: "kaikki lähellä olevat ihmiset", value: ESearchGender.All },
];

const searchBarSearchGenderOptionsFr = [
  { label: "des gars à proximité", value: ESearchGender.Man },
  { label: "filles à proximité", value: ESearchGender.Woman },
  { label: "toutes les personnes à proximité", value: ESearchGender.All },
];

const searchBarSearchGenderOptionsHe = [
  { label: "חבר'ה בקרבת מקום", value: ESearchGender.Man },
  { label: "בנות בקרבת מקום", value: ESearchGender.Woman },
  { label: "כל האנשים בסביבה", value: ESearchGender.All },
];

const searchBarSearchGenderOptionsHr = [
  { label: "momci u blizini", value: ESearchGender.Man },
  { label: "djevojke u blizini", value: ESearchGender.Woman },
  { label: "svi ljudi u blizini", value: ESearchGender.All },
];

const searchBarSearchGenderOptionsHu = [
  { label: "srácok a közelben", value: ESearchGender.Man },
  { label: "lányok a közelben", value: ESearchGender.Woman },
  { label: "az összes közeli ember", value: ESearchGender.All },
];

const searchBarSearchGenderOptionsId = [
  { label: "orang-orang di dekatnya", value: ESearchGender.Man },
  { label: "gadis-gadis di dekatnya", value: ESearchGender.Woman },
  { label: "semua orang di dekatnya", value: ESearchGender.All },
];

const searchBarSearchGenderOptionsIt = [
  { label: "ragazzi nelle vicinanze", value: ESearchGender.Man },
  { label: "ragazze nelle vicinanze", value: ESearchGender.Woman },
  { label: "tutte le persone vicine", value: ESearchGender.All },
];

const searchBarSearchGenderOptionsJa = [
  { label: "近くの人たち", value: ESearchGender.Man },
  { label: "近くの女の子", value: ESearchGender.Woman },
  { label: "近くにいる人たち全員", value: ESearchGender.All },
];

const searchBarSearchGenderOptionsKk = [
  { label: "қасындағы жігіттер", value: ESearchGender.Man },
  { label: "жақын қыздар", value: ESearchGender.Woman },
  { label: "барлық жақын адамдар", value: ESearchGender.All },
];

const searchBarSearchGenderOptionsKo = [
  { label: "근처에 있는 남자들", value: ESearchGender.Man },
  { label: "근처에 있는 여자애들", value: ESearchGender.Woman },
  { label: "근처에 있는 사람들 모두", value: ESearchGender.All },
];

const searchBarSearchGenderOptionsNl = [
  { label: "jongens in de buurt", value: ESearchGender.Man },
  { label: "meisjes in de buurt", value: ESearchGender.Woman },
  { label: "alle mensen in de buurt", value: ESearchGender.All },
];

const searchBarSearchGenderOptionsNo = [
  { label: "gutter i nærheten", value: ESearchGender.Man },
  { label: "jenter i nærheten", value: ESearchGender.Woman },
  { label: "alle menneskene i nærheten", value: ESearchGender.All },
];

const searchBarSearchGenderOptionsPt = [
  { label: "caras próximos", value: ESearchGender.Man },
  { label: "garotas próximas", value: ESearchGender.Woman },
  { label: "todas as pessoas próximas", value: ESearchGender.All },
];

const searchBarSearchGenderOptionsSv = [
  { label: "killar i närheten", value: ESearchGender.Man },
  { label: "tjejer i närheten", value: ESearchGender.Woman },
  { label: "alla människor i närheten", value: ESearchGender.All },
];

const searchBarSearchGenderOptionsUk = [
  { label: "хлопці поблизу", value: ESearchGender.Man },
  { label: "дівчата поблизу", value: ESearchGender.Woman },
  { label: "всі люди поблизу", value: ESearchGender.All },
];

const searchBarSearchGenderOptionsZh = [
  { label: "附近的人", value: ESearchGender.Man },
  { label: "附近的女孩", value: ESearchGender.Woman },
  { label: "所有附近的人", value: ESearchGender.All },
];

export const SEARCH_BAR_SEARCH_GENDER_MAPPING = {
  [ELanguage.Ru]: searchBarSearchGenderOptionsRu,
  [ELanguage.En]: searchBarSearchGenderOptionsEn,
  [ELanguage.Ar]: searchBarSearchGenderOptionsAr,
  [ELanguage.Be]: searchBarSearchGenderOptionsBe,
  [ELanguage.Ca]: searchBarSearchGenderOptionsCa,
  [ELanguage.Cs]: searchBarSearchGenderOptionsCs,
  [ELanguage.De]: searchBarSearchGenderOptionsDe,
  [ELanguage.Es]: searchBarSearchGenderOptionsEs,
  [ELanguage.Fi]: searchBarSearchGenderOptionsFi,
  [ELanguage.Fi]: searchBarSearchGenderOptionsFr,
  [ELanguage.He]: searchBarSearchGenderOptionsHe,
  [ELanguage.Hr]: searchBarSearchGenderOptionsHr,
  [ELanguage.Hu]: searchBarSearchGenderOptionsHu,
  [ELanguage.Id]: searchBarSearchGenderOptionsId,
  [ELanguage.It]: searchBarSearchGenderOptionsIt,
  [ELanguage.Ja]: searchBarSearchGenderOptionsJa,
  [ELanguage.Kk]: searchBarSearchGenderOptionsKk,
  [ELanguage.Ko]: searchBarSearchGenderOptionsKo,
  [ELanguage.Nl]: searchBarSearchGenderOptionsNl,
  [ELanguage.No]: searchBarSearchGenderOptionsNo,
  [ELanguage.Pt]: searchBarSearchGenderOptionsPt,
  [ELanguage.Sv]: searchBarSearchGenderOptionsSv,
  [ELanguage.Uk]: searchBarSearchGenderOptionsUk,
  [ELanguage.Zh]: searchBarSearchGenderOptionsZh,
};
