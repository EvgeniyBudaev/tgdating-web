"use server";

import { cookies } from "next/headers";
import { Environment } from "@/app/environment";
import { cookieName } from "@/app/i18n/settings";
import { DEFAULT_LANGUAGE } from "@/app/shared/constants";
import { EErrorTypes } from "@/app/shared/enums";
import type {
  TApiConfig,
  TApiFunction,
  TErrorResponse,
} from "@/app/shared/types/api";
import {
  gatewayTimeout,
  internalError,
  processError,
  processSuccessResponse,
  setResponseTimeout,
} from "@/app/shared/utils";

export const fetchApi: TApiFunction = async (path, options) => {
  const config: TApiConfig = {
    basePath: Environment.NEXT_PUBLIC_API_URL,
    timeout: 50_000,
    retry: 1,
  };
  const cookieStore = cookies();
  const locale = cookieStore.get(cookieName as any)?.value;
  const url = config.basePath + path;
  let contentType: { "Content-Type"?: string } = {
    "Content-Type": "application/json",
  };
  let body;
  if (options?.body) {
    if (options?.body instanceof FormData) {
      contentType = {};
      body = options?.body;
    } else {
      body = JSON.stringify(options.body);
    }
  }

  const requestOptions = {
    ...options,
    headers: {
      ...contentType,
      "Accept-Language": locale ?? DEFAULT_LANGUAGE,
      ...options?.headers,
    },
    body,
  };

  let errorResponse: TErrorResponse | null = null;

  for (let i = 0; i < (options?.retry ?? config.retry); i++) {
    const [signal, timeoutId] = setResponseTimeout(config.timeout);
    try {
      const response = await fetch(url, {
        ...requestOptions,
        signal,
        cache: "no-store",
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        return await processSuccessResponse(response);
      }
      errorResponse = { type: EErrorTypes.Server, response: response };
    } catch (e: any) {
      errorResponse = processError(e);
    }
  }
  if (errorResponse) {
    if (errorResponse.type === EErrorTypes.Abort) {
      throw gatewayTimeout();
    }
    if (errorResponse.response) {
      const { response } = errorResponse;
      const errorMsg = await errorResponse.response.text();
      throw new Response(errorMsg, { status: response?.status });
    }
    throw internalError("Unexpected errorUI");
  }
  throw internalError("Unexpected errorUI");
};
