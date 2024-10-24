'use client';

import { useTranslation } from "@/app/i18n/client";
import {ErrorUI} from "@/app/shared/components/errorUI";

export default function Error({
                                error,
                                reset,
                              }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useTranslation("index");
  const message = t(error.message as any);

  return <ErrorUI message={message} />
}