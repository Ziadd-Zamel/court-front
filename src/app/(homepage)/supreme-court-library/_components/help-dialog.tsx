"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HelpCircle } from "lucide-react";

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
          className="text-muted-foreground hover:text-primary"
        >
          <HelpCircle size={18} />
        </button>
      </DialogTrigger>

      <DialogContent dir="rtl" className="max-w-xl text-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <ul className="list-disc pr-5 space-y-2">
          {body.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
