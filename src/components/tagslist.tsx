"use client";
import { useRouter } from "next/navigation";
import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function TagsList({ tags }: { tags: string[] }) {
  const router = useRouter();
  return (
    <div>
      {tags.map((tag) => (
        <button
          className={`${cn(badgeVariants())} bg-blue-400`}
          key={tag}
          onClick={() => router.push(`/browse?search=${tag}`)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
