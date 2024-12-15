import {
  AddCircleOutlineIcon,
  ArrowBackIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  AttentionIcon,
  CalendarIcon,
  CheckboxIcon,
  CloseIcon,
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

export type IconType =
  | "AddCircleOutline"
  | "ArrowBack"
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight"
  | "Attention"
  | "Calendar"
  | "Checkbox"
  | "Close"
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
  ["AddCircleOutline", <AddCircleOutlineIcon key="AddCircleOutlineIcon" />],
  ["ArrowBack", <ArrowBackIcon key="ArrowBackIcon" />],
  ["ArrowDown", <ArrowDownIcon key="ArrowDownIcon" />],
  ["ArrowLeft", <ArrowLeftIcon key="ArrowLeftIcon" />],
  ["ArrowRight", <ArrowRightIcon key="ArrowRightIcon" />],
  ["Attention", <AttentionIcon key="AttentionIcon" />],
  ["Calendar", <CalendarIcon key="CalendarIcon" />],
  ["Checkbox", <CheckboxIcon key="CheckboxIcon" />],
  ["Close", <CloseIcon key="CloseIcon" />],
  ["Edit", <EditIcon key="EditIcon" />],
  ["Exit", <ExitIcon key="ExitIcon" />],
  ["Filter", <FilterIcon key="HeartIcon" />],
  ["HeartEmpty", <HeartEmptyIcon key="HeartEmptyIcon" />],
  ["Heart", <HeartIcon key="HeartIcon" />],
  ["Home", <HomeIcon key="HomeIcon" />],
  ["Image", <ImageIcon key="ImageIcon" />],
  ["Info", <InfoIcon key="InfoIcon" />],
  ["Location", <LocationIcon key="LocationIcon" />],
  ["MoreHoriz", <MoreHorizIcon key="MoreHorizIcon" />],
  ["NoImage", <NoImageIcon key="NoImageIcon" />],
  ["Person", <PersonIcon key="PersonIcon" />],
  ["Save", <SaveIcon key="SaveIcon" />],
  ["Search", <SearchIcon key="SearchIcon" />],
  ["Spinner", <SpinnerIcon key="SpinnerIcon" />],
  ["Trash", <TrashIcon key="TrashIcon" />],
  ["Undo", <UndoIcon key="UndoIcon" />],
  ["Watch", <WatchIcon key="WatchIcon" />],
]);
