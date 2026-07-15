import React from "react";
import ClinicalTagSelector from "@/components/clinical/ClinicalTagSelector";

export default function LinkQualification({ value, onChange }) {
  return (
    <ClinicalTagSelector
      value={value.clinical_tags || []}
      onChange={(tags) => onChange({ clinical_tags: tags })}
    />
  );
}