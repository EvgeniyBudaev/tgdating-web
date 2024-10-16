"use client";

import Image from "next/image";
import { type FC } from "react";
import { deleteImageAction } from "@/app/actions/image/delete/deleteImageAction";
import type { TImage } from "@/app/api/profile/image";
import { useTranslation } from "@/app/i18n/client";
import { EFormFields } from "@/app/shared/components/form/fileUploader/previews/imageList/enums";
import { DropDown } from "@/app/uikit/components/dropDown";
import { Typography } from "@/app/uikit/components/typography";

type TProps = {
  defaultImages: TImage[];
  lng: string;
};

export const ImageList: FC<TProps> = ({ defaultImages, lng }) => {
  const { t } = useTranslation("index");

  const handleDeleteImage = async (image: TImage) => {
    const formDataDto = new FormData();
    formDataDto.append(EFormFields.Id, image.id.toString());
    // @ts-ignore
    await deleteImageAction({}, formDataDto);
  };

  return (
    <>
      {defaultImages.map((image) => {
        return (
          <div className="Previews-Thumb" key={image.id}>
            <div className="Previews-Thumb-Inner">
              <DropDown>
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
