"use client";
import { useState } from "react";
import PageContent from "./page-content";
import Sidebar from "./Sidebar";

export default function AppealInquiryPage() {
  const [showstates, setShowstates] = useState<boolean>(false);

  return (
    <>
      <div className="min-h-screen lg:flex lg:flex-row">
        <PageContent showstates={showstates} setShowstates={setShowstates} />
        <div className="hidden min-h-screen  lg:block w-1/4">
          <Sidebar showstates={showstates} />
        </div>
      </div>
    </>
  );
}
