import { EProfileEditFormFields } from "@/app/actions/profile/editProfile/enums";
import { TFile } from "@/app/shared/types/file";

type TProps = {
  [EProfileEditFormFields.DisplayName]: string;
  [EProfileEditFormFields.Birthday]: string;
  [EProfileEditFormFields.Gender]: string;
  [EProfileEditFormFields.SearchGender]: string;
  [EProfileEditFormFields.Location]?: string | null | undefined;
  [EProfileEditFormFields.Description]?: string | null | undefined;
  [EProfileEditFormFields.Height]?: number | null | undefined;
  [EProfileEditFormFields.Weight]?: number | null | undefined;
  [EProfileEditFormFields.LookingFor]: string;
  [EProfileEditFormFields.Image]: TFile | TFile[] | null | undefined;
  [EProfileEditFormFields.TelegramUserID]: string;
  [EProfileEditFormFields.TelegramUsername]: string;
  [EProfileEditFormFields.TelegramFirstName]?: string | null | undefined;
  [EProfileEditFormFields.TelegramLastName]?: string | null | undefined;
  [EProfileEditFormFields.TelegramLanguageCode]: string;
  [EProfileEditFormFields.TelegramAllowsWriteToPm]: string;
  [EProfileEditFormFields.TelegramQueryId]: string;
  [EProfileEditFormFields.Latitude]?: number | null | undefined;
  [EProfileEditFormFields.Longitude]?: number | null | undefined;
  [EProfileEditFormFields.AgeFrom]: string;
  [EProfileEditFormFields.AgeTo]: string;
  [EProfileEditFormFields.Distance]: string;
  [EProfileEditFormFields.Page]: string;
  [EProfileEditFormFields.Size]: string;
  [EProfileEditFormFields.IsImages]?: string | null | undefined;
};

type TProfileForm = {
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
      [EProfileEditFormFields.DisplayName]: props.displayName,
      [EProfileEditFormFields.Birthday]: props.birthday,
      [EProfileEditFormFields.Gender]: props.gender,
      [EProfileEditFormFields.SearchGender]: props.searchGender,
      [EProfileEditFormFields.Location]: props?.location ?? null,
      [EProfileEditFormFields.Description]: props?.description ?? null,
      [EProfileEditFormFields.Height]: props?.height
        ? props.height.toString()
        : null,
      [EProfileEditFormFields.Weight]: props?.weight
        ? props.weight.toString()
        : null,
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
      [EProfileEditFormFields.IsImages]: props?.isImages ?? "false",
    },
  };
};
