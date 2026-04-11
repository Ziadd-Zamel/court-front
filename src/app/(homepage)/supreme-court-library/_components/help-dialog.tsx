"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  title: string;
  body: string[];
}

export function HelpDialog({ title, body }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="مساعدة"
          className=" cursor-pointer aspect-square text-base size-6 flex-center font-bold rounded-full border-1 border-black"
        >
          <span className="mt-1">؟</span>
        </button>
      </DialogTrigger>

      <DialogContent dir="rtl" className="max-w-xl text-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <ul className="list-disc pr-5 space-y-2 marker:text-main">
          {body.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
