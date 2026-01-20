"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function PaginationControls({ page, hasNext }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    router.push(`/explore?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="flex items-center justify-center gap-4 pt-6">
      <Button
        variant="outline"
        disabled={page <= 1}
        onClick={() => goToPage(page - 1)}
      >
        Previous
      </Button>

      <span className="text-sm text-muted-foreground">
        Page {page}
      </span>

      <Button
        variant="outline"
        disabled={!hasNext}
        onClick={() => goToPage(page + 1)}
      >
        Next
      </Button>
    </div>
  );
}
