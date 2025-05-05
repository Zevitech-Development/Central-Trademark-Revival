import { StaticImageData } from "next/image";
import { Control, FieldValues, Path, UseFormSetValue } from "react-hook-form";

import { ProtectionTypeEnum } from "@/enums/protection-type-enum";

export interface SystemHeadingInterface {
  heading: string;
  subheading: string;
}

export interface CustomSystemFieldInterface {
  value: string;
  onChange: (value: string) => void;
  name: string;
}

export interface CustomInputInterface<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}

export interface CustomDropdown01Interface<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  isVirtualized?: boolean;
}

export interface CustomDropdown02Interface<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: {
    label: string;
    value: string | boolean | number;
  }[];
  placeholder?: string;
}

export interface CustomSelectionInterface<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: {
    label: string;
    value: ProtectionTypeEnum;
    image: string | StaticImageData;
  }[];
}

export interface CustomUploadInterface<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
}

export interface CustomCalendarInterface<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  disabled?: boolean;
  setValue: UseFormSetValue<T>;
}

export interface CustomTextareaInterface<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  rows?: number;
}

export interface CustomCheckbox01Interface<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  description?: string;
  priceLabel?: string;
}

export interface CustomCheckbox02Interface<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
}
