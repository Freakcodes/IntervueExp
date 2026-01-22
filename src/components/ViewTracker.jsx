"use client";

import { useEffect } from "react";
import { trackExperienceView } from "@/app/actions/experience";

export default function ViewTracker({ id }) {
  useEffect(() => {
    trackExperienceView(id);
  }, [id]);

  return null;
}
