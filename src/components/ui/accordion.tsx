"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const ACCORDION_DURATION = 400; // ms — single source of truth for all accordion timing
const ACCORDION_EASING = "cubic-bezier(0.16, 1, 0.3, 1)";

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "border-b border-gray-300 dark:border-white/10 scroll-mt-24",
        className,
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  onClick,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      // let any consumer-provided onClick run too
      onClick?.(e);

      // Wait one frame so Radix has flipped data-state, then check if we
      // just OPENED (never scroll on close) and bring it fully into view.
      requestAnimationFrame(() => {
        setTimeout(() => {
          const trigger = triggerRef.current;
          if (!trigger) return;
          const isOpen = trigger.getAttribute("data-state") === "open";
          if (!isOpen) return;

          const item = trigger.closest('[data-slot="accordion-item"]');
          item?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }, ACCORDION_DURATION + 30); // small buffer after the height transition ends
      });
    },
    [onClick],
  );

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={triggerRef}
        data-slot="accordion-trigger"
        onClick={handleClick}
        className={cn(
          "focus-visible:border-ring justify-self-end self-end cursor-pointer focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          className="mr-auto text-black dark:text-main justify-self-end hidden md:block pointer-events-none size-5 shrink-0 translate-y-0.5"
          style={{
            transition: `transform ${ACCORDION_DURATION}ms ${ACCORDION_EASING}`,
          }}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const innerRef = React.useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [height, setHeight] = React.useState<number | "auto">(0);

  // Watch Radix's data-state attribute (forceMount keeps this element in the
  // DOM at all times, so we drive the height animation ourselves instead of
  // relying on Radix's own show/hide, which is what was causing the abrupt cut).
  React.useEffect(() => {
    const node = contentRef.current;
    if (!node) return;

    const sync = () => setIsOpen(node.getAttribute("data-state") === "open");
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(node, {
      attributes: true,
      attributeFilter: ["data-state"],
    });
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    if (isOpen) {
      // Animate from current height up to the real content height...
      setHeight(inner.scrollHeight);
      // ...then release to "auto" once the transition finishes, so the
      // content can still resize freely (window resize, dynamic text, etc.)
      const timer = setTimeout(() => setHeight("auto"), ACCORDION_DURATION);
      return () => clearTimeout(timer);
    }

    // Closing: if we're currently at "auto" we need a real pixel value to
    // transition FROM, otherwise the browser can't animate it at all.
    setHeight(inner.scrollHeight);
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => setHeight(0));
      return () => cancelAnimationFrame(raf2);
    });
    return () => cancelAnimationFrame(raf1);
  }, [isOpen]);

  return (
    <AccordionPrimitive.Content
      ref={contentRef}
      data-slot="accordion-content"
      forceMount
      className="overflow-hidden text-sm"
      style={{
        height: height === "auto" ? "auto" : `${height}px`,
        transition: `height ${ACCORDION_DURATION}ms ${ACCORDION_EASING}`,
        willChange: "height",
      }}
      {...props}
    >
      <div ref={innerRef} className={cn("pt-0 pb-4", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
