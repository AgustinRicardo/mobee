"use client";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CalendarIcon from "./icons/CalendarIcon";
import { Dispatch, SetStateAction } from "react";

interface Props {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
}

export function CalendarForm({ date, setDate }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-fit flex justify-start px-2 gap-2 font-normal h-7 opacity-50 border-none bg-beeBrownHeader hover:bg-beeBrownLight group",
            !date && "text-muted-foreground"
          )}
        >
          {date ? (
            format(date, "PPP")
          ) : (
            <span className="text-beeBeig group-hover:text-beeBeig">
              Pick a date
            </span>
          )}
          <CalendarIcon className=" h-4 w-4 opacity-50 text-beeBeig group-hover:text-beeBeig" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 bg-beeBrownLight text-beeBeig border-none "
        align="start"
      >
        <Calendar
          styles={{
            head_cell: { color: "#2E2928" },
            caption: { color: "#2E2928" },
            nav_button_next: { border: "none" },
            nav_button_previous: { border: "none" },
          }}
          modifiersStyles={{
            outside: { color: "#F6EAC4", opacity: "50%" },
            disabled: { color: "#F6EAC4", opacity: "50%" },
            selected: { color: "#F6EAC4", backgroundColor: "#2E2928" },
          }}
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
