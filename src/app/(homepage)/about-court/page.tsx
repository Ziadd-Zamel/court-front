import MainHeading from "@/components/common/main-heading";
import ContactSection from "@/components/custom/contact-section";

export default function AboutCourtPage() {
  return (
    <>
      {/* Main Heading */}
      <MainHeading
        title="عن المحكمة"
        bgImage="/assets/bg-1.jpg"
        description="تعرف على المحكمة العليا واختصاصاتها ودورها في النظام القضائي"
        overlay
      />

      {/* Main Content - Will be added later */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            صفحة عن المحكمة قيد التطوير
          </h2>
          <p className="text-gray-600">سيتم إضافة المحتوى قريباً</p>
        </div>
      </div>

      {/* Contact Section */}
      <ContactSection />
    </>
  );
}
