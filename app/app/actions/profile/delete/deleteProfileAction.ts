"use server";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { deleteProfileFormSchema } from "@/app/actions/profile/delete/schemas";
import { deleteProfile } from "@/app/api/profile/delete";
import { ERoutes } from "@/app/shared/enums";
import type { TSession } from "@/app/shared/types/session";
import { getErrorsResolver, createPath } from "@/app/shared/utils";

export async function deleteProfileAction(prevState: any, formData: FormData) {
  // const resolver = deleteProfileFormSchema.safeParse(
  //   Object.fromEntries(formData.entries()),
  // );
  //

  // if (!resolver.success) {
  //   const errors = getErrorsResolver(resolver);
  //   return {
  //     data: undefined,
  //     error: undefined,
  //     errors: errors,
  //     success: false,
  //   };
  // }
  //
  // const formattedParams = {
  //   ...resolver.data,
  // };
  //
  // const userResponse = await deleteUser({ id: session.user.id });
  //
  // if (userResponse.success) {
  //   const response = await deleteProfile(formattedParams);
  //   if (response.success) {
  //     const path = createPath({
  //       route: ERoutes.Logout,
  //     });
  //     redirect(path);
  //   }
  // }
  return {
    data: undefined,
    error: undefined,
    errors: undefined,
    success: true,
  };
}
