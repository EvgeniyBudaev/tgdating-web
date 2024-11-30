import isEmpty from "lodash/isEmpty";
import {redirect} from "next/navigation";
import {useEffect} from "react";
import {useTelegramContext} from "@/app/shared/context";
import {ELanguage, ERoutes} from "@/app/shared/enums";
import {createPath} from "@/app/shared/utils";

type TProps = {
  lng: ELanguage;
}

type TUseCheckPermissions = (props: TProps) => void;

export const useCheckPermissions: TUseCheckPermissions = (props) => {
  const {lng} = props;
  const telegram = useTelegramContext();
  const user = telegram?.user;

  // Check authorization in telegram
  useEffect(() => {
    // if (isEmpty(user)) {
    //   const path = createPath({
    //     route: ERoutes.Unauthorized,
    //     lng: lng,
    //   });
    //   redirect(path);
    // }
  }, [lng, user]);
}