import type { TDropzoneProps } from "@/app/uikit/components/dropzone/types";

export const getTypes = (accept?: Pick<TDropzoneProps, "accept">): string =>
  accept
    ? Object.values(accept)
        .flat(Infinity)
        .toString()
        .toUpperCase()
        .replace(/\./g, "")
        .replace(/,/g, ", ")
    : "";
