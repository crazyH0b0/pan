"use client";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import React from "react";
import { Button } from "./ui/button";
import { BsSortDown } from "react-icons/bs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const SortAction = () => {
  const [sortBy, setSortBy] = React.useState("name");
  return (
    <Select onValueChange={(value) => setSortBy(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="name">Sort by name</SelectItem>
          <SelectItem value="time">Sort by time</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortAction;
