import { Clock, Mail } from "lucide-react";
import Image from "next/image";

interface ContactCardProps {
  lawyer: ILawyer;
}

const ContactCard = ({ lawyer }: ContactCardProps) => {
  return (
    <div className="flex items-center w-full justify-between border-t flex-wrap border-gray-300 py-4">
      <div className="flex flex-1 items-center gap-5">
        {lawyer.image ? (
          <Image
            src={lawyer.image}
            alt={lawyer.name}
            width={60}
            height={60}
            className="ml-4 size-14 flex-shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="ml-4 size-14 flex-shrink-0 rounded-full bg-yellow-400" />
        )}
        <div className="w-full space-y-1">
          <h3 className="text-lg font-bold">{lawyer.name}</h3>
          <p className=" text-gray-400">{lawyer.office_name}</p>
          <p className=" text-gray-400">{lawyer.office_circle[0]?.name}</p>
          <p className="text-sm text-gray-400">
            <span className="font-bold text-lg text-black">المجال:</span>{" "}
            {lawyer.fields.map((field) => field.name).join(" - ")}
          </p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-end space-x-2">
          <Clock size={14} className="text-main" />
          <span>{lawyer.phone}</span>
        </div>
        <div className="flex items-center space-x-2 justify-end ">
          <Mail size={14} className="text-main " />
          <span>{lawyer.email}</span>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
