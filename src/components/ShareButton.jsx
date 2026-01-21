import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ShareButton() {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}${pathname}`;

    try {
      // Copy to clipboard
      await navigator.clipboard.writeText(url);
      setCopied(true);

      // Native share popup (mobile + supported browsers)
      if (navigator.share) {
        await navigator.share({
          title: "Interview Experience",
          text: "Check out this interview experience",
          url,
        });
      }
    } catch (err) {
      console.error("Share failed", err);
    }

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button size="sm" onClick={handleShare}>
      {copied ? "Link Copied!" : "Share"}
    </Button>
  );
}
