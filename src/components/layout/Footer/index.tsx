import FooterContent from "./component/footer-content";
import { getSiteSettings } from "@/lib/api/site-settings.api";

const FALLBACK_BACKGROUND = "/assets/footer.jpg";

export default async function Footer() {
  const { data } = await getSiteSettings();
  const backgroundImage = data.home_footer_background ?? FALLBACK_BACKGROUND;

  return (
    <footer
      className="relative h-fit w-full border-t-[3px] border-solid border-main bg-cover bg-center bg-no-repeat text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="absolute inset-0 h-[100%] bg-black/80" />
      <div className="relative z-10 flex min-h-screen flex-col">
        <FooterContent />
      </div>
    </footer>
  );
}
