import Image from "next/image";

type Props = {
  title?: string;
  subtitle?: string;
};

/** Shared PDF/print header for principle and appeal inquiry exports. */
export default function PrinciplePrintHeader({ title, subtitle }: Props) {
  const showCenterSection = Boolean(title || subtitle);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex items-center justify-between w-full -mb-4">
        <Image
          src="/assets/principle-print/pdf-logo.png"
          alt="Logo"
          width={180}
          height={0}
          loading="eager"
          unoptimized
        />
        <Image
          src="/assets/principle-print/qr.png"
          alt="Qr"
          width={100}
          height={150}
          loading="eager"
          unoptimized
        />
      </div>

      {showCenterSection ? (
        <div className="mt-6 flex w-full flex-col items-center">
          {title ? (
            <p dir="rtl" className="text-center text-2xl font-bold">
              {title}
            </p>
          ) : null}

          <div className="mt-6 flex items-center gap-2">
            <div className="h-px w-14 bg-gray-300" />
            <Image
              src="/assets/ShortLogoB.jpg"
              alt="logo"
              width={36}
              height={36}
              loading="eager"
              unoptimized
            />
            <div className="h-px w-14 bg-gray-300" />
          </div>

          {subtitle ? (
            <p dir="rtl" className="mt-6 text-center text-2xl font-bold">
              {subtitle}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
