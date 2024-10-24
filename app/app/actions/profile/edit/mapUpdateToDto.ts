import { EProfileEditFormFields } from "@/app/actions/profile/edit/enums";
import { TFile } from "@/app/shared/types/file";

type TProps = {
  [EProfileEditFormFields.SessionId]: string;
  [EProfileEditFormFields.DisplayName]: string;
  [EProfileEditFormFields.Birthday]: string;
  [EProfileEditFormFields.Gender]: string;
  [EProfileEditFormFields.SearchGender]: string;
  [EProfileEditFormFields.Location]?: string | null | undefined;
  [EProfileEditFormFields.Description]?: string | null | undefined;
  [EProfileEditFormFields.Height]?: string | null | undefined;
  [EProfileEditFormFields.Weight]?: string | null | undefined;
  [EProfileEditFormFields.LookingFor]: string;
  [EProfileEditFormFields.Image]: TFile | TFile[] | null | undefined;
  [EProfileEditFormFields.TelegramUserID]: string;
  [EProfileEditFormFields.TelegramUsername]: string;
  [EProfileEditFormFields.TelegramFirstName]: string;
  [EProfileEditFormFields.TelegramLastName]: string;
  [EProfileEditFormFields.TelegramLanguageCode]: string;
  [EProfileEditFormFields.TelegramAllowsWriteToPm]: string;
  [EProfileEditFormFields.TelegramQueryId]: string;
  [EProfileEditFormFields.TelegramChatId]: string;
  [EProfileEditFormFields.Latitude]?: string | null | undefined;
  [EProfileEditFormFields.Longitude]?: string | null | undefined;
  [EProfileEditFormFields.AgeFrom]: string;
  [EProfileEditFormFields.AgeTo]: string;
  [EProfileEditFormFields.Distance]: string;
  [EProfileEditFormFields.Page]: string;
  [EProfileEditFormFields.Size]: string;
  [EProfileEditFormFields.IsImages]?: string | null | undefined;
};

type TProfileForm = {
  [EProfileEditFormFields.SessionId]: string;
  [EProfileEditFormFields.DisplayName]: string;
  [EProfileEditFormFields.Birthday]: string;
  [EProfileEditFormFields.Gender]: string;
  [EProfileEditFormFields.SearchGender]: string;
  [EProfileEditFormFields.Location]: string | null;
  [EProfileEditFormFields.Description]: string | null;
  [EProfileEditFormFields.Height]: string | null;
  [EProfileEditFormFields.Weight]: string | null;
  [EProfileEditFormFields.LookingFor]: string;
  [EProfileEditFormFields.Image]: TFile | TFile[] | null;
  [EProfileEditFormFields.TelegramUserID]: string;
  [EProfileEditFormFields.TelegramUsername]: string;
  [EProfileEditFormFields.TelegramFirstName]: string | null;
  [EProfileEditFormFields.TelegramLastName]: string | null;
  [EProfileEditFormFields.TelegramLanguageCode]: string;
  [EProfileEditFormFields.TelegramAllowsWriteToPm]: string;
  [EProfileEditFormFields.TelegramQueryId]: string;
  [EProfileEditFormFields.TelegramChatId]: string;
  [EProfileEditFormFields.Latitude]: string | null;
  [EProfileEditFormFields.Longitude]: string | null;
  [EProfileEditFormFields.AgeFrom]: string;
  [EProfileEditFormFields.AgeTo]: string;
  [EProfileEditFormFields.Distance]: string;
  [EProfileEditFormFields.Page]: string;
  [EProfileEditFormFields.Size]: string;
  [EProfileEditFormFields.IsImages]: string;
};

type TResponse = {
  profileForm: TProfileForm;
};

type TMapUpdateToDto = (props: TProps) => TResponse;

export const mapUpdateToDto: TMapUpdateToDto = (props) => {
  return {
    profileForm: {
      [EProfileEditFormFields.SessionId]: props.sessionId,
      [EProfileEditFormFields.DisplayName]: props.displayName,
      [EProfileEditFormFields.Birthday]: props.birthday,
      [EProfileEditFormFields.Gender]: props.gender,
      [EProfileEditFormFields.SearchGender]: props.searchGender,
      [EProfileEditFormFields.Location]: props?.location ?? null,
      [EProfileEditFormFields.Description]: props?.description ?? null,
      [EProfileEditFormFields.Height]: props?.height ?? null,
      [EProfileEditFormFields.Weight]: props?.weight ?? null,
      [EProfileEditFormFields.LookingFor]: props.lookingFor,
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
      [EProfileEditFormFields.TelegramChatId]: props.telegramChatId,
      [EProfileEditFormFields.Latitude]: props?.latitude ?? null,
      [EProfileEditFormFields.Longitude]: props?.longitude ?? null,
      [EProfileEditFormFields.AgeFrom]: props.ageFrom,
      [EProfileEditFormFields.AgeTo]: props.ageTo,
      [EProfileEditFormFields.Distance]: props.distance,
      [EProfileEditFormFields.Page]: props.page,
      [EProfileEditFormFields.Size]: props.size,
      [EProfileEditFormFields.IsImages]: props?.isImages ?? "false",
    },
  };
};
