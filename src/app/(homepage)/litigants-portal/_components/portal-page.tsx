"use client";
import Link from "next/link";
import React from "react";
import ServiceCard from "./ServiceCard";
import { serviceData } from "@/lib/constants/serviceData";

export default function LitigantsPortalPage() {
  return (
    <section
      id="litigants-portal"
      aria-labelledby="litigants-portal Page"
      className="relative py-40 bg-main-bg"
    >
      <div className="grid  box-container  grid-cols-2 gap-10 ">
        {serviceData.map((service, index) => (
          <Link href={service.path ? service.path : "#"} key={index}>
            <ServiceCard
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
