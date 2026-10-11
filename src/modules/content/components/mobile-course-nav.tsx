"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { ListTree, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/progress-bar";
import { CourseSidebar } from "./course-sidebar";

type Props = React.ComponentProps<typeof CourseSidebar>;

/**
 * Below the lg breakpoint the course sidebar is hidden, so this bar opens
 * it as a slide-in sheet. Navigating to another lesson closes the sheet.
 */
export function MobileCourseNav(props: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  const total = props.outline.reduce((n, c) => n + c.lessons.length, 0);
  const completed = props.progressEntries.filter(([, s]) => s === "completed").length;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger
        render={
          <button
            type="button"
            className="mb-6 flex w-full items-center gap-3 rounded-xl border bg-card px-4 py-3 text-left text-sm shadow-xs transition-colors hover:bg-accent/30"
          />
        }
      >
        <ListTree className="size-4 shrink-0 text-muted-foreground" aria-hidden />
        <span className="font-medium">Course outline</span>
        <ProgressBar value={total ? (completed / total) * 100 : 0} label="Course progress" className="ml-auto w-20" />
        <span className="text-xs tabular-nums text-muted-foreground">
          {completed}/{total}
        </span>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/20 duration-150 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <DialogPrimitive.Popup className="fixed inset-y-0 left-0 z-50 w-[min(22rem,88vw)] overflow-y-auto border-r bg-background p-4 pt-12 shadow-lg outline-none duration-200 data-open:animate-in data-open:slide-in-from-left data-closed:animate-out data-closed:slide-out-to-left">
          <DialogPrimitive.Title className="sr-only">Course outline</DialogPrimitive.Title>
          <DialogPrimitive.Close
            render={<Button variant="ghost" size="icon-sm" className="absolute top-3 right-3" />}
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
          <CourseSidebar {...props} morph={false} />
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
