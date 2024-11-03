import { EProfileAddFormFields } from "@/app/actions/profile/add/enums";
import { TFile } from "@/app/shared/types/file";

type TProps = {
  [EProfileAddFormFields.SessionId]: string;
  [EProfileAddFormFields.DisplayName]: string;
  [EProfileAddFormFields.Birthday]: string;
  [EProfileAddFormFields.Gender]: string;
  [EProfileAddFormFields.SearchGender]: string;
  [EProfileAddFormFields.Location]?: string | null | undefined;
  [EProfileAddFormFields.Description]?: string | null | undefined;
  [EProfileAddFormFields.Height]?: string | null | undefined;
  [EProfileAddFormFields.Weight]?: string | null | undefined;
  [EProfileAddFormFields.LookingFor]: string;
  [EProfileAddFormFields.Image]: TFile | TFile[];
  [EProfileAddFormFields.TelegramUserID]: string;
  [EProfileAddFormFields.TelegramUsername]: string;
  [EProfileAddFormFields.TelegramFirstName]?: string | null | undefined;
  [EProfileAddFormFields.TelegramLastName]?: string | null | undefined;
  [EProfileAddFormFields.TelegramLanguageCode]: string;
  [EProfileAddFormFields.TelegramAllowsWriteToPm]: string;
  [EProfileAddFormFields.TelegramQueryId]: string;
  [EProfileAddFormFields.Latitude]?: string | null | undefined;
  [EProfileAddFormFields.Longitude]?: string | null | undefined;
  [EProfileAddFormFields.AgeFrom]: string;
  [EProfileAddFormFields.AgeTo]: string;
  [EProfileAddFormFields.Distance]: string;
  [EProfileAddFormFields.Page]: string;
  [EProfileAddFormFields.Size]: string;
};

type TProfileForm = {
  [EProfileAddFormFields.SessionId]: string;
  [EProfileAddFormFields.DisplayName]: string;
  [EProfileAddFormFields.Birthday]: string;
  [EProfileAddFormFields.Gender]: string;
  [EProfileAddFormFields.SearchGender]: string;
  [EProfileAddFormFields.Location]: string | null;
  [EProfileAddFormFields.Description]: string | null;
  [EProfileAddFormFields.Height]: string | null;
  [EProfileAddFormFields.Weight]: string | null;
  [EProfileAddFormFields.LookingFor]: string;
  [EProfileAddFormFields.Image]: TFile | TFile[];
  [EProfileAddFormFields.TelegramUserID]: string;
  [EProfileAddFormFields.TelegramUsername]: string;
  [EProfileAddFormFields.TelegramFirstName]: string | null;
  [EProfileAddFormFields.TelegramLastName]: string | null;
  [EProfileAddFormFields.TelegramLanguageCode]: string;
  [EProfileAddFormFields.TelegramAllowsWriteToPm]: string;
  [EProfileAddFormFields.TelegramQueryId]: string;
  [EProfileAddFormFields.Latitude]: string | null;
  [EProfileAddFormFields.Longitude]: string | null;
  [EProfileAddFormFields.AgeFrom]: string;
  [EProfileAddFormFields.AgeTo]: string;
  [EProfileAddFormFields.Distance]: string;
  [EProfileAddFormFields.Page]: string;
  [EProfileAddFormFields.Size]: string;
};

type TResponse = {
  // profileForm: TProfileForm;
  profileForm: any;
};

type TMapSignupToDto = (props: TProps) => TResponse;

export const mapSignupToDto: TMapSignupToDto = (props) => {
  return {
    profileForm: {
      [EProfileAddFormFields.SessionId]: props.sessionId,
      [EProfileAddFormFields.DisplayName]: props.displayName,
      [EProfileAddFormFields.Birthday]: props.birthday,
      [EProfileAddFormFields.Gender]: props.gender,
      [EProfileAddFormFields.SearchGender]: props.searchGender,
      [EProfileAddFormFields.Location]: props?.location ?? null,
      [EProfileAddFormFields.Description]: props?.description ?? null,
      [EProfileAddFormFields.Height]: props?.height ?? null,
      [EProfileAddFormFields.Weight]: props?.weight ?? null,
      [EProfileAddFormFields.LookingFor]: props.lookingFor,
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
      [EProfileAddFormFields.Latitude]: props?.latitude
        ? props?.latitude.toString()
        : null,
      [EProfileAddFormFields.Longitude]: props?.longitude
        ? props.longitude.toString()
        : null,
      [EProfileAddFormFields.AgeFrom]: props.ageFrom,
      [EProfileAddFormFields.AgeTo]: props.ageTo,
      [EProfileAddFormFields.Distance]: props.distance,
      [EProfileAddFormFields.Page]: props.page,
      [EProfileAddFormFields.Size]: props.size,
    },
  };
};
