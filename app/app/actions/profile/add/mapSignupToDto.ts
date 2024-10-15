import isEmpty from "lodash/isEmpty";
import { EProfileAddFormFields } from "@/app/actions/profile/add/enums";
import { TFile } from "@/app/shared/types/file";

type TProps = {
  [EProfileAddFormFields.DisplayName]: string;
  [EProfileAddFormFields.Birthday]: string;
  [EProfileAddFormFields.Gender]: string;
  [EProfileAddFormFields.SearchGender]: string;
  [EProfileAddFormFields.Location]: string;
  [EProfileAddFormFields.Description]: string;
  [EProfileAddFormFields.Height]: string;
  [EProfileAddFormFields.Weight]: string;
  [EProfileAddFormFields.LookingFor]: string;
  [EProfileAddFormFields.Image]: TFile | TFile[];
  [EProfileAddFormFields.TelegramUserID]: string;
  [EProfileAddFormFields.TelegramUsername]: string;
  [EProfileAddFormFields.TelegramFirstName]: string;
  [EProfileAddFormFields.TelegramLastName]: string;
  [EProfileAddFormFields.TelegramLanguageCode]: string;
  [EProfileAddFormFields.TelegramAllowsWriteToPm]: string;
  [EProfileAddFormFields.TelegramQueryId]: string;
  [EProfileAddFormFields.TelegramChatId]: string;
  [EProfileAddFormFields.Latitude]: string;
  [EProfileAddFormFields.Longitude]: string;
  [EProfileAddFormFields.AgeFrom]: string;
  [EProfileAddFormFields.AgeTo]: string;
  [EProfileAddFormFields.Distance]: string;
  [EProfileAddFormFields.Page]: string;
  [EProfileAddFormFields.Size]: string;
};

type TProfileForm = {
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
  [EProfileAddFormFields.TelegramChatId]: string;
  [EProfileAddFormFields.Latitude]: string | null;
  [EProfileAddFormFields.Longitude]: string | null;
  [EProfileAddFormFields.AgeFrom]: string;
  [EProfileAddFormFields.AgeTo]: string;
  [EProfileAddFormFields.Distance]: string;
  [EProfileAddFormFields.Page]: string;
  [EProfileAddFormFields.Size]: string;
};

type TResponse = {
  profileForm: TProfileForm;
};

type TMapSignupToDto = (props: TProps) => TResponse;

export const mapSignupToDto: TMapSignupToDto = (props) => {
  return {
    profileForm: {
      [EProfileAddFormFields.DisplayName]: props.displayName,
      [EProfileAddFormFields.Birthday]: props.birthday,
      [EProfileAddFormFields.Gender]: props.gender,
      [EProfileAddFormFields.SearchGender]: props.searchGender,
      [EProfileAddFormFields.Location]: !isEmpty(props?.location)
        ? props.location
        : null,
      [EProfileAddFormFields.Description]: !isEmpty(props?.description)
        ? props.description
        : null,
      [EProfileAddFormFields.Height]: !isEmpty(props?.height)
        ? props.height
        : null,
      [EProfileAddFormFields.Weight]: !isEmpty(props?.weight)
        ? props.weight
        : null,
      [EProfileAddFormFields.LookingFor]: props.lookingFor,
      [EProfileAddFormFields.Image]: props.image,
      [EProfileAddFormFields.TelegramUserID]: props.telegramUserId,
      [EProfileAddFormFields.TelegramUsername]: props.telegramUsername,
      [EProfileAddFormFields.TelegramFirstName]: !isEmpty(
        props.telegramFirstName,
      )
        ? props.telegramFirstName
        : null,
      [EProfileAddFormFields.TelegramLastName]: !isEmpty(props.telegramLastName)
        ? props.telegramLastName
        : null,
      [EProfileAddFormFields.TelegramLanguageCode]: props.telegramLanguageCode,
      [EProfileAddFormFields.TelegramAllowsWriteToPm]:
        props.telegramAllowsWriteToPm,
      [EProfileAddFormFields.TelegramQueryId]: props.telegramQueryId,
      [EProfileAddFormFields.TelegramChatId]: props.telegramChatId,
      [EProfileAddFormFields.Latitude]: !isEmpty(props.latitude)
        ? props.latitude
        : null,
      [EProfileAddFormFields.Longitude]: !isEmpty(props.longitude)
        ? props.longitude
        : null,
      [EProfileAddFormFields.AgeFrom]: props.ageFrom,
      [EProfileAddFormFields.AgeTo]: props.ageTo,
      [EProfileAddFormFields.Distance]: props.distance,
      [EProfileAddFormFields.Page]: props.page,
      [EProfileAddFormFields.Size]: props.size,
    },
  };
};
