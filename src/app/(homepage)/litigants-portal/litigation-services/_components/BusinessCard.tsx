import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import React from "react";

interface mainData {
  uuid: string;
  name: string;
}

interface ILawyer {
  uuid: string;
  name: string;
  office_name: string;
  email: string;
  phone: string;
  image: string | null;
  office_circle: mainData[];
  fields: mainData[];
}

interface ContactCardProps {
  lawyer: ILawyer;
}

const BusinessCard = ({ lawyer }: ContactCardProps) => {
  return (
    <div className={`mb-4 border-t border-gray-500 bg-white py-6 w-full`}>
      <div className="flex justify-between gap-5 sm:flex-row sm:items-center">
        {lawyer.image ? (
          <Image
            src={lawyer.image}
            alt={lawyer.name}
            height={60}
            width={60}
            className="size-14 flex-shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="size-14 flex-shrink-0 rounded-full bg-yellow-400" />
        )}
        {/* Right side - Arabic text */}
        <div className="w-full space-y-1">
          <h3 className="text-md font-bold">{lawyer.name}</h3>
          <p className="text-base text-gray-400">{lawyer.office_name}</p>
          <p className="text-base text-gray-400">
            {lawyer.office_circle[0]?.name}
          </p>
          <p className="text-base text-gray-400">
            <span className="text-md font-bold text-black">المجال:</span>{" "}
            {lawyer.fields.map((field) => field.name).join(" - ")}
          </p>
        </div>
        {/* Left side - Profile circle */}
      </div>

      {/* Contact information */}
      <div className="mt-4 border-t border-gray-200 pt-4">
        <div className="mb-2 flex items-center justify-end" dir="rtl">
          <span className="mr-2 text-gray-700">{lawyer.phone}</span>
          <Phone className="h-4 w-4 text-yellow-600" />
        </div>
        <div className="flex items-center justify-end" dir="rtl">
          <span className="mr-2 text-gray-700">{lawyer.email}</span>
          <Mail className="h-4 w-4 text-yellow-600" />
        </div>
      </div>
    </div>
  );
};

export { BusinessCard };
