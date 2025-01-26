import {
  AddCircleOutlineIcon,
  ArrowBackIcon,
  ArrowDownIcon,
  ArrowForwardIOSIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  AttentionIcon,
  CalendarIcon,
  CheckIcon,
  CheckboxIcon,
  CloseIcon,
  CreditIcon,
  CrownIcon,
  EditIcon,
  ExitIcon,
  FilterIcon,
  HeartEmptyIcon,
  HeartIcon,
  HomeIcon,
  ImageIcon,
  InfoIcon,
  LocationIcon,
  MoreHorizIcon,
  NoImageIcon,
  PersonIcon,
  SaveIcon,
  SearchIcon,
  SpinnerIcon,
  TrashIcon,
  UndoIcon,
  WatchIcon,
} from "@/app/uikit/assets/icons";
import { TIconProps } from "@/app/uikit/assets/icons/types";

export type IconType =
  | "AddCircleOutline"
  | "ArrowBack"
  | "ArrowDown"
  | "ArrowForwardIOS"
  | "ArrowLeft"
  | "ArrowRight"
  | "ArrowUp"
  | "Attention"
  | "Calendar"
  | "Check"
  | "Checkbox"
  | "Close"
  | "Credit"
  | "Crown"
  | "Edit"
  | "Exit"
  | "Filter"
  | "HeartEmpty"
  | "Heart"
  | "Home"
  | "Image"
  | "Info"
  | "Location"
  | "MoreHoriz"
  | "NoImage"
  | "Person"
  | "Save"
  | "Search"
  | "Spinner"
  | "Trash"
  | "Undo"
  | "Watch";

export const iconTypes = new Map([
  [
    "AddCircleOutline",
    (props: TIconProps) => (
      <AddCircleOutlineIcon
        key="AddCircleOutlineIcon"
        dataTestId={props.dataTestId}
        height={props.height}
        width={props.width}
      />
    ),
  ],
  [
    "ArrowBack",
    (props: TIconProps) => (
      <ArrowBackIcon
        key="ArrowBackIcon"
        dataTestId={props.dataTestId}
        height={props.height}
        width={props.width}
      />
    ),
  ],
  [
    "ArrowDown",
    (props: TIconProps) => (
      <ArrowDownIcon
        key="ArrowDownIcon"
        dataTestId={props.dataTestId}
        height={props.height}
        width={props.width}
      />
    ),
  ],
  [
    "ArrowForwardIOS",
    (props: TIconProps) => (
      <ArrowForwardIOSIcon
        key="ArrowForwardIOSIcon"
        dataTestId={props.dataTestId}
        height={props.height}
        width={props.width}
      />
    ),
  ],
  [
    "ArrowLeft",
    (props: TIconProps) => (
      <ArrowLeftIcon
        key="ArrowLeftIcon"
        dataTestId={props.dataTestId}
        height={props.height}
        width={props.width}
      />
    ),
  ],
  [
    "ArrowRight",
    (props: TIconProps) => (
      <ArrowRightIcon
        key="ArrowRightIcon"
        dataTestId={props.dataTestId}
        height={props.height}
        width={props.width}
      />
    ),
  ],
  [
    "ArrowUp",
    (props: TIconProps) => (
      <ArrowUpIcon
        key="ArrowUpIcon"
        dataTestId={props.dataTestId}
        height={props.height}
        width={props.width}
      />
    ),
  ],
  [
    "Attention",
    (props: TIconProps) => (
      <AttentionIcon
        key="AttentionIcon"
        dataTestId={props.dataTestId}
        height={props.height}
        width={props.width}
      />
    ),
  ],
  [
    "Calendar",
    (props: TIconProps) => (
      <CalendarIcon
        key="CalendarIcon"
        dataTestId={props.dataTestId}
        height={props.height}
        width={props.width}
      />
    ),
  ],
  [
    "Check",
    (props: TIconProps) => (
      <CheckIcon
        key="CheckIcon"
        dataTestId={props.dataTestId}
        height={props.height}
        width={props.width}
      />
    ),
  ],
  [
    "Checkbox",
    (props: TIconProps) => (
      <CheckboxIcon
        key="CheckboxIcon"
        dataTestId={props.dataTestId}
        height={props.height}
        width={props.width}
      />
    ),
  ],
  [
    "Close",
    (props: TIconProps) => (
      <CloseIcon
        key="CloseIcon"
        dataTestId={props.dataTestId}
        height={props.height}
        width={props.width}
      />
    ),
  ],
  [
    "Credit",
    (props: TIconProps) => (
      <CreditIcon
        key="CreditIcon"
        dataTestId={props.dataTestId}
        height={props.height}
        width={props.width}
      />
    ),
  ],
  [
    "Crown",
    (props: TIconProps) => (
      <CrownIcon
        key="CrownIcon"
        dataTestId={props.dataTestId}
        height={props.height}
        width={props.width}
      />
    ),
  ],
  [
    "Edit",
    (props: TIconProps) => (
      <EditIcon
        key="EditIcon"
        dataTestId={props.dataTestId}
        height={props.height}
        width={props.width}
      />
    ),
  ],
  [
    "Exit",
    (props: TIconProps) => (
      <ExitIcon
        key="ExitIcon"
        dataTestId={props.dataTestId}
        height={props.height}
        width={props.width}
      />
    ),
  ],
  [
    "Filter",
    (props: TIconProps) => (
      <FilterIcon
        key="HeartIcon"
        dataTestId={props.dataTestId}
        height={props.height}
        width={props.width}
      />
    ),
  ],
  [
    "HeartEmpty",
    (props: TIconProps) => (
      <HeartEmptyIcon
        key="HeartEmptyIcon"
        dataTestId={props.dataTestId}
        height={props.height}
        width={props.width}
      />
    ),
  ],
  [
    "Heart",
    (props: TIconProps) => (
      <HeartIcon
        key="HeartIcon"
        dataTestId={props.dataTestId}
        height={props.height}
        width={props.width}
      />
    ),
  ],
  [
    "Home",
    (props: TIconProps) => (
      <HomeIcon
        key="HomeIcon"
        dataTestId={props.dataTestId}
        height={props.height}
        width={props.width}
      />
    ),
  ],
  [
    "Image",
    (props: TIconProps) => (
      <ImageIcon
        key="ImageIcon"
        dataTestId={props.dataTestId}
        height={props.height}
        width={props.width}
      />
    ),
  ],
  [
    "Info",
    (props: TIconProps) => (
      <InfoIcon
        key="InfoIcon"
        dataTestId={props.dataTestId}
        height={props.height}
        width={props.width}
      />
    ),
  ],
  [
    "Location",
    (props: TIconProps) => (
      <LocationIcon
        key="LocationIcon"
        dataTestId={props.dataTestId}
        height={props.height}
        width={props.width}
      />
    ),
  ],
  [
    "MoreHoriz",
    (props: TIconProps) => (
      <MoreHorizIcon
        key="MoreHorizIcon"
        dataTestId={props.dataTestId}
        height={props.height}
        width={props.width}
      />
    ),
  ],
  [
    "NoImage",
    (props: TIconProps) => (
      <NoImageIcon
        key="NoImageIcon"
        dataTestId={props.dataTestId}
        height={props.height}
        width={props.width}
      />
    ),
  ],
  [
    "Person",
    (props: TIconProps) => (
      <PersonIcon
        key="PersonIcon"
        dataTestId={props.dataTestId}
        height={props.height}
        width={props.width}
      />
    ),
  ],
  [
    "Save",
    (props: TIconProps) => (
      <SaveIcon
        key="SaveIcon"
        dataTestId={props.dataTestId}
        height={props.height}
        width={props.width}
      />
    ),
  ],
  [
    "Search",
    (props: TIconProps) => (
      <SearchIcon
        key="SearchIcon"
        data-testid={props.dataTestId}
        height={props.height}
        width={props.width}
      />
    ),
  ],
  [
    "Spinner",
    (props: TIconProps) => (
      <SpinnerIcon
        key="SpinnerIcon"
        dataTestId={props.dataTestId}
        height={props.height}
        width={props.width}
      />
    ),
  ],
  [
    "Trash",
    (props: TIconProps) => (
      <TrashIcon
        key="TrashIcon"
        dataTestId={props.dataTestId}
        height={props.height}
        width={props.width}
      />
    ),
  ],
  [
    "Undo",
    (props: TIconProps) => (
      <UndoIcon
        key="UndoIcon"
        dataTestId={props.dataTestId}
        height={props.height}
        width={props.width}
      />
    ),
  ],
  [
    "Watch",
    (props: TIconProps) => (
      <WatchIcon
        key="WatchIcon"
        dataTestId={props.dataTestId}
        height={props.height}
        width={props.width}
      />
    ),
  ],
]);
