import { EProfileEditFormFields } from "@/app/actions/profile/editProfile/enums";
import { TFile } from "@/app/shared/types/file";

type TProps = {
  [EProfileEditFormFields.DisplayName]: string;
  [EProfileEditFormFields.Age]: string | number;
  [EProfileEditFormFields.Gender]: string;
  [EProfileEditFormFields.SearchGender]: string;
  [EProfileEditFormFields.Description]?: string | null | undefined;
  [EProfileEditFormFields.Image]: TFile | TFile[] | null | undefined;
  [EProfileEditFormFields.TelegramUserID]: string;
  [EProfileEditFormFields.TelegramUsername]: string;
  [EProfileEditFormFields.TelegramFirstName]?: string | null | undefined;
  [EProfileEditFormFields.TelegramLastName]?: string | null | undefined;
  [EProfileEditFormFields.TelegramLanguageCode]: string;
  [EProfileEditFormFields.TelegramAllowsWriteToPm]: string;
  [EProfileEditFormFields.TelegramQueryId]: string;
  [EProfileEditFormFields.CountryCode]?: string | null | undefined;
  [EProfileEditFormFields.CountryName]?: string | null | undefined;
  [EProfileEditFormFields.City]?: string | null | undefined;
  [EProfileEditFormFields.Latitude]?: number | null | undefined;
  [EProfileEditFormFields.Longitude]?: number | null | undefined;
  [EProfileEditFormFields.AgeFrom]: string;
  [EProfileEditFormFields.AgeTo]: string;
  [EProfileEditFormFields.Distance]: string;
  [EProfileEditFormFields.Page]: string;
  [EProfileEditFormFields.Size]: string;
  [EProfileEditFormFields.IsLiked]: string;
  [EProfileEditFormFields.IsOnline]: string;
  [EProfileEditFormFields.IsImages]?: string | null | undefined;
  [EProfileEditFormFields.Measurement]: string;
};

type TProfileForm = {
  [EProfileEditFormFields.DisplayName]: string;
  [EProfileEditFormFields.Age]: string;
  [EProfileEditFormFields.Gender]: string;
  [EProfileEditFormFields.SearchGender]: string;
  [EProfileEditFormFields.Description]: string | null;
  [EProfileEditFormFields.Image]: TFile | TFile[] | null;
  [EProfileEditFormFields.TelegramUserID]: string;
  [EProfileEditFormFields.TelegramUsername]: string;
  [EProfileEditFormFields.TelegramFirstName]: string | null;
  [EProfileEditFormFields.TelegramLastName]: string | null;
  [EProfileEditFormFields.TelegramLanguageCode]: string;
  [EProfileEditFormFields.TelegramAllowsWriteToPm]: string;
  [EProfileEditFormFields.TelegramQueryId]: string;
  [EProfileEditFormFields.CountryCode]: string | null;
  [EProfileEditFormFields.CountryName]: string | null;
  [EProfileEditFormFields.City]: string | null;
  [EProfileEditFormFields.Latitude]: string | null;
  [EProfileEditFormFields.Longitude]: string | null;
  [EProfileEditFormFields.AgeFrom]: string;
  [EProfileEditFormFields.AgeTo]: string;
  [EProfileEditFormFields.Distance]: string;
  [EProfileEditFormFields.Page]: string;
  [EProfileEditFormFields.Size]: string;
  [EProfileEditFormFields.IsLiked]: string;
  [EProfileEditFormFields.IsOnline]: string;
  [EProfileEditFormFields.IsImages]: string;
  [EProfileEditFormFields.Measurement]: string;
};

type TResponse = {
  profileForm: TProfileForm;
};

type TMapUpdateToDto = (props: TProps) => TResponse;

export const mapUpdateToDto: TMapUpdateToDto = (props) => {
  return {
    profileForm: {
      [EProfileEditFormFields.DisplayName]: props.displayName,
      [EProfileEditFormFields.Age]: props.age.toString(),
      [EProfileEditFormFields.Gender]: props.gender,
      [EProfileEditFormFields.SearchGender]: props.searchGender,
      [EProfileEditFormFields.Description]: props?.description ?? null,
      [EProfileEditFormFields.Image]: props?.image ?? null,
      [EProfileEditFormFields.TelegramUserID]: props.telegramUserId,
      [EProfileEditFormFields.TelegramUsername]: props.telegramUsername,
      [EProfileEditFormFields.TelegramFirstName]:
        props?.telegramFirstName ?? null,
      [EProfileEditFormFields.TelegramLastName]:
        props?.telegramLastName ?? null,
      [EProfileEditFormFields.TelegramLanguageCode]: props.telegramLanguageCode,
      [EProfileEditFormFields.TelegramAllowsWriteToPm]:
        props.telegramAllowsWriteToPm,
      [EProfileEditFormFields.TelegramQueryId]: props.telegramQueryId,
      [EProfileEditFormFields.CountryCode]: props?.countryCode ?? null,
      [EProfileEditFormFields.CountryName]: props?.countryName ?? null,
      [EProfileEditFormFields.City]: props?.city ?? null,
      [EProfileEditFormFields.Latitude]: props?.latitude
        ? props.latitude.toString()
        : null,
      [EProfileEditFormFields.Longitude]: props?.longitude
        ? props.longitude.toString()
        : null,
      [EProfileEditFormFields.AgeFrom]: props.ageFrom,
      [EProfileEditFormFields.AgeTo]: props.ageTo,
      [EProfileEditFormFields.Distance]: props.distance,
      [EProfileEditFormFields.Page]: props.page,
      [EProfileEditFormFields.Size]: props.size,
      [EProfileEditFormFields.IsLiked]: props?.isLiked ?? "false",
      [EProfileEditFormFields.IsOnline]: props?.isOnline ?? "false",
      [EProfileEditFormFields.IsImages]: props?.isImages ?? "false",
      [EProfileEditFormFields.Measurement]: props.measurement,
    },
  };
};
