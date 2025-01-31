import { EProfileAddFormFields } from "@/app/actions/profile/addProfile/enums";
import { TFile } from "@/app/shared/types/file";

type TProps = {
  [EProfileAddFormFields.DisplayName]: string;
  [EProfileAddFormFields.Age]: string | number;
  [EProfileAddFormFields.Gender]: string;
  [EProfileAddFormFields.SearchGender]: string;
  [EProfileAddFormFields.Description]?: string | null | undefined;
  [EProfileAddFormFields.Image]: TFile | TFile[];
  [EProfileAddFormFields.TelegramUserID]: string;
  [EProfileAddFormFields.TelegramUsername]: string;
  [EProfileAddFormFields.TelegramFirstName]?: string | null | undefined;
  [EProfileAddFormFields.TelegramLastName]?: string | null | undefined;
  [EProfileAddFormFields.TelegramLanguageCode]: string;
  [EProfileAddFormFields.TelegramAllowsWriteToPm]: string;
  [EProfileAddFormFields.TelegramQueryId]: string;
  [EProfileAddFormFields.CountryCode]?: string | null | undefined;
  [EProfileAddFormFields.CountryName]?: string | null | undefined;
  [EProfileAddFormFields.City]?: string | null | undefined;
  [EProfileAddFormFields.Latitude]?: number | null | undefined;
  [EProfileAddFormFields.Longitude]?: number | null | undefined;
  [EProfileAddFormFields.AgeFrom]: string;
  [EProfileAddFormFields.AgeTo]: string;
  [EProfileAddFormFields.Distance]: string;
  [EProfileAddFormFields.Page]: string;
  [EProfileAddFormFields.Size]: string;
  [EProfileAddFormFields.IsLeftHand]: string;
};

type TProfileForm = {
  [EProfileAddFormFields.DisplayName]: string;
  [EProfileAddFormFields.Age]: string;
  [EProfileAddFormFields.Gender]: string;
  [EProfileAddFormFields.SearchGender]: string;
  [EProfileAddFormFields.Description]: string | null;
  [EProfileAddFormFields.Image]: TFile | TFile[];
  [EProfileAddFormFields.TelegramUserID]: string;
  [EProfileAddFormFields.TelegramUsername]: string;
  [EProfileAddFormFields.TelegramFirstName]: string | null;
  [EProfileAddFormFields.TelegramLastName]: string | null;
  [EProfileAddFormFields.TelegramLanguageCode]: string;
  [EProfileAddFormFields.TelegramAllowsWriteToPm]: string;
  [EProfileAddFormFields.TelegramQueryId]: string;
  [EProfileAddFormFields.CountryCode]: string | null;
  [EProfileAddFormFields.CountryName]: string | null;
  [EProfileAddFormFields.City]: string | null;
  [EProfileAddFormFields.Latitude]: string | null;
  [EProfileAddFormFields.Longitude]: string | null;
  [EProfileAddFormFields.AgeFrom]: string;
  [EProfileAddFormFields.AgeTo]: string;
  [EProfileAddFormFields.Distance]: string;
  [EProfileAddFormFields.Page]: string;
  [EProfileAddFormFields.Size]: string;
  [EProfileAddFormFields.IsLeftHand]: string;
};

type TResponse = {
  profileForm: TProfileForm;
};

type TMapSignupToDto = (props: TProps) => TResponse;

export const mapSignupToDto: TMapSignupToDto = (props) => {
  return {
    profileForm: {
      [EProfileAddFormFields.DisplayName]: props.displayName,
      [EProfileAddFormFields.Age]: props.age.toString(),
      [EProfileAddFormFields.Gender]: props.gender,
      [EProfileAddFormFields.SearchGender]: props.searchGender,
      [EProfileAddFormFields.Description]: props?.description ?? null,
      [EProfileAddFormFields.Image]: props.image,
      [EProfileAddFormFields.TelegramUserID]: props.telegramUserId,
      [EProfileAddFormFields.TelegramUsername]: props.telegramUsername,
      [EProfileAddFormFields.TelegramFirstName]:
        props?.telegramFirstName ?? null,
      [EProfileAddFormFields.TelegramLastName]: props?.telegramLastName ?? null,
      [EProfileAddFormFields.TelegramLanguageCode]: props.telegramLanguageCode,
      [EProfileAddFormFields.TelegramAllowsWriteToPm]:
        props.telegramAllowsWriteToPm,
      [EProfileAddFormFields.TelegramQueryId]: props.telegramQueryId,
      [EProfileAddFormFields.CountryCode]: props?.countryCode ?? null,
      [EProfileAddFormFields.CountryName]: props?.countryName ?? null,
      [EProfileAddFormFields.City]: props?.city ?? null,
      [EProfileAddFormFields.Latitude]: props?.latitude
        ? props.latitude.toString()
        : null,
      [EProfileAddFormFields.Longitude]: props?.longitude
        ? props.longitude.toString()
        : null,
      [EProfileAddFormFields.AgeFrom]: props.ageFrom,
      [EProfileAddFormFields.AgeTo]: props.ageTo,
      [EProfileAddFormFields.Distance]: props.distance,
      [EProfileAddFormFields.Page]: props.page,
      [EProfileAddFormFields.Size]: props.size,
      [EProfileAddFormFields.IsLeftHand]: props.isLeftHand,
    },
  };
};
