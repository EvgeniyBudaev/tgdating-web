export type TDateTimeProps = {
  className?: string;
  classes?: { date?: string; time?: string };
  dateFormat?: string;
  dataTestId?: string;
  isTime?: boolean;
  isUtc?: boolean;
  value?: Date | string | number | null;
};
