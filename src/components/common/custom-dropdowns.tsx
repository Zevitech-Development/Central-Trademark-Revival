"use client";

import React, { useState, useRef, useEffect } from "react";
import { FieldValues } from "react-hook-form";
import { FixedSizeList as List } from "react-window";

import {
  CustomDropdown01Interface,
  CustomDropdown02Interface,
} from "@/interfaces/common-interface";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { ChevronDown } from "lucide-react";

export const CustomDropdown01 = <T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder = "Select an option",
  isVirtualized = false,
}: CustomDropdown01Interface<T>) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-heading md:text-base text-sm font-normal">
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative w-full" ref={dropdownRef}>
              <div
                className="rounded-[5px] w-full md:text-base text-sm h-[50px] border border-border flex items-center justify-between px-3 leading-[1.25rem] cursor-pointer bg-input"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <span>{selectedValue || placeholder}</span>
                <ChevronDown size={18} className="text-paragraph" />
              </div>

              {showDropdown && (
                <div className="absolute top-[55px] left-0 w-full bg-white border border-border shadow-md rounded-[5px] z-10 h-[300px] overflow-hidden">
                  {isVirtualized ? (
                    <List
                      height={400}
                      itemCount={options.length}
                      itemSize={50}
                      width="100%"
                    >
                      {({ index, style }) => (
                        <div
                          key={options[index].value}
                          style={style}
                          className="px-4 py-4 hover:bg-muted cursor-pointer"
                          onClick={() => {
                            field.onChange(options[index].value);
                            setSelectedValue(options[index].label);
                            setShowDropdown(false);
                          }}
                        >
                          {options[index].label}
                        </div>
                      )}
                    </List>
                  ) : (
                    <div className="h-[300px] overflow-y-auto">
                      {options.map((option) => (
                        <div
                          key={option.value}
                          className="px-4 py-2 hover:bg-muted cursor-pointer"
                          onClick={() => {
                            field.onChange(option.value);
                            setSelectedValue(option.label);
                            setShowDropdown(false);
                          }}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage className="text-destructive text-sm" />
        </FormItem>
      )}
    />
  );
};

export const CustomDropdown02 = <T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder = "Select an option",
}: CustomDropdown02Interface<T>) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-heading md:text-base text-sm font-normal">
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative w-full" ref={dropdownRef}>
              <div
                className="rounded-[5px] font-lato w-full md:text-base text-sm h-[50px] border border-border flex items-center justify-between px-3 leading-[1.25rem] cursor-pointer bg-input"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                <span>
                  {options.find((opt) => opt.value === field.value)?.label ||
                    placeholder}
                </span>
                <ChevronDown size={18} className="text-paragraph" />
              </div>

              {showDropdown && (
                <div className="absolute top-[55px] left-0 w-full bg-input border border-border shadow-md rounded-[5px] z-10 h-auto overflow-y-auto">
                  {options.map((option) => (
                    <div
                      key={option.label}
                      className="px-4 py-2 hover:bg-muted cursor-pointer"
                      onClick={() => {
                        field.onChange(option.value);
                        setShowDropdown(false);
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage className="text-destructive text-sm" />
        </FormItem>
      )}
    />
  );
};
