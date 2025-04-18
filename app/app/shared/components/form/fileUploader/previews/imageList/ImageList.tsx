"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { type FC, memo } from "react";
import type { TImage } from "@/app/api/image";
import { deleteImageAction } from "@/app/actions/image/deleteImage/deleteImageAction";
import { useTranslation } from "@/app/i18n/client";
import { EImageDeleteFormFields } from "@/app/actions/image/deleteImage/enums";
import { useAuthenticityTokenContext } from "@/app/shared/context";
import { useTelegram } from "@/app/shared/hooks";
import { DropDown } from "@/app/uikit/components/dropDown";
import { Typography } from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";

type TProps = {
  defaultImages: TImage[];
  lng: string;
  theme?: ETheme;
};

const ImageListComponent: FC<TProps> = ({ defaultImages, theme }) => {
  const csrf = useAuthenticityTokenContext();
  const { t } = useTranslation("index");
  const { initDataCrypt } = useTelegram();
  const params = useParams();
  const telegramUserId = (params?.telegramUserId ?? "") as string;

  const handleDeleteImage = async (image: TImage) => {
    const formDataDto = new FormData();
    formDataDto.append(EImageDeleteFormFields.Id, image.id.toString());
    formDataDto.append(EImageDeleteFormFields.TelegramUserId, telegramUserId);
    formDataDto.append(
      EImageDeleteFormFields.TelegramInitDataCrypt,
      initDataCrypt ?? "",
    );
    formDataDto.append(EImageDeleteFormFields.Csrf, csrf ?? "");
    // @ts-ignore
    await deleteImageAction({}, formDataDto);
  };

  return (
    <>
      {defaultImages.map((image) => {
        return (
          <div className="Previews-Thumb" key={image.id}>
            <div className="Previews-Thumb-Inner">
              <DropDown theme={theme}>
                <DropDown.Button>
                  <Image
                    alt={image.name}
                    className="Previews-Thumb-Image"
                    fill={true}
                    priority={true}
                    sizes="100vw"
                    src={image.url}
                    quality={100}
                  />
                </DropDown.Button>
                <DropDown.Panel>
                  <div className="DropDown-Menu">
                    <div
                      className="DropDown-MenuItem"
                      onClick={() => handleDeleteImage(image)}
                    >
                      <Typography>{t("common.actions.delete")}</Typography>
                    </div>
                  </div>
                  <div className="DropDown-Menu">
                    <div className="DropDown-MenuItem DropDown-MenuItem-Cancel">
                      <Typography>{t("common.actions.cancel")}</Typography>
                    </div>
                  </div>
                </DropDown.Panel>
              </DropDown>
            </div>
          </div>
        );
      })}
    </>
  );
};

ImageListComponent.displayName = "ImageList";

export const ImageList = memo(ImageListComponent);
