"use client";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ToastHydrator() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const toastData = localStorage.getItem("postReloadToast");
      if (toastData) {
        const { type, message, description } = JSON.parse(toastData);
        if (type === "success") toast.success(message, { description });
        else if (type === "error") toast.error(message, { description });
        localStorage.removeItem("postReloadToast");
      }
    }
  }, []);
  return null;
} 