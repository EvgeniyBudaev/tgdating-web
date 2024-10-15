import { PROXY_URL } from "@/app/shared/constants";

type TUseProxyUrl = () => { proxyUrl: string };

export const useProxyUrl: TUseProxyUrl = () => {
  return { proxyUrl: PROXY_URL };
};
