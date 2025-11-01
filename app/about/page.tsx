import type React from "react";
import Navbar from "@/components/ui/principal/Navbar";
import FooterSection from "@/components/ui/principal/FooterSection";
import {
  Beneficts,
  Characteristics,
  HeroicSection,
  PurposeAndMision,
  Technologies,
} from "@/components/ui/index_about";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />

      {/* Hero Section */}
      <HeroicSection />

      {/* Propósito y mision del Proyecto */}
      <PurposeAndMision />

      {/* Características Clave */}
      <Characteristics />

      {/* Tecnologías Utilizadas */}
      <Technologies />

      {/* Beneficios y final */}
      <Beneficts />

      <FooterSection />
    </div>
  );
}
