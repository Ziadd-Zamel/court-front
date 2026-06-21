"use client";

import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";

export type PieSlice = {
  id: string;
  name: string;
  value: number;
  color?: string;
};

const COLOR_RAMP = [
  "#FFD6D0",
  "#FFADA3",
  "#FF7A6E",
  "#F74746",
  "#D93030",
  "#B81E1E",
  "#930F0F",
  "#6B0000",
];

function getColors(count: number): string[] {
  if (count === 1) return [COLOR_RAMP[4]];
  return Array.from({ length: count }, (_, i) => {
    const idx = Math.round((i / (count - 1)) * (COLOR_RAMP.length - 1));
    return COLOR_RAMP[idx];
  });
}

type ComputedSlice = {
  id: string;
  name: string;
  value: number;
  color: string;
  startAngle: number;
  sweep: number;
};

type Tooltip = {
  clientX: number;
  clientY: number;
  slice: ComputedSlice;
};

const TOOLTIP_MARGIN = 8;
const TOOLTIP_OFFSET = 12;

type Props = {
  slices: PieSlice[];
  size?: number;
  singleMode?: boolean;
};

export default function CustomPieChart({
  slices,
  size = 300,
  singleMode = false,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const computedRef = useRef<ComputedSlice[]>([]);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ left: 0, top: 0 });
  const [tooltipReady, setTooltipReady] = useState(false);

  // build computed slices and draw — same logic as before
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !slices.length) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cx = size / 2;
    const cy = size / 2;
    const R = size * 0.38;
    const ECHO_GAP = 6;
    const ECHO_W = 2;
    const ECHO_R = R + ECHO_GAP + ECHO_W / 2;
    const GAP = (4 * Math.PI) / 180;

    const rampColors = singleMode
      ? ["#D93030", "#FFB3AB"]
      : getColors(slices.length);

    ctx.clearRect(0, 0, size, size);

    // ── Single slice ──────────────────────────────────────────────────────
    if (slices.length === 1) {
      const color = slices[0].color ?? rampColors[0];
      computedRef.current = [
        {
          ...slices[0],
          color,
          startAngle: -Math.PI / 2,
          sweep: 2 * Math.PI,
        },
      ];

      ctx.beginPath();
      ctx.arc(cx, cy, ECHO_R, 0, 2 * Math.PI);
      ctx.strokeStyle = color;
      ctx.lineWidth = ECHO_W;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      return;
    }

    // ── Multiple slices ───────────────────────────────────────────────────
    const sum = slices.reduce((s, d) => s + d.value, 0);
    const total = sum <= 0 ? 1 : sum;

    const computed: ComputedSlice[] = [];
    let angle = -Math.PI / 2;

    for (let i = 0; i < slices.length; i++) {
      const sweep = (slices[i].value / total) * 2 * Math.PI;
      if (sweep < 0.001) continue;
      computed.push({
        ...slices[i],
        color:
          slices[i].color ?? rampColors[i] ?? rampColors[rampColors.length - 1],
        startAngle: angle,
        sweep,
      });
      angle += sweep;
    }

    computedRef.current = computed;

    computed.forEach((s) => {
      ctx.beginPath();
      ctx.arc(
        cx,
        cy,
        ECHO_R,
        s.startAngle + GAP / 2,
        s.startAngle + s.sweep - GAP / 2,
      );
      ctx.strokeStyle = s.color;
      ctx.lineWidth = ECHO_W;
      ctx.stroke();
    });

    computed.forEach((s) => {
      const CENTER_GAP = 1; // ← increase this to push slices further from center
      const midAngle = s.startAngle + s.sweep / 2;
      const ox = cx + Math.cos(midAngle) * CENTER_GAP;
      const oy = cy + Math.sin(midAngle) * CENTER_GAP;

      ctx.beginPath();
      ctx.moveTo(ox, oy); // ← start from offset center, not (cx, cy)
      ctx.arc(
        cx,
        cy,
        R,
        s.startAngle + GAP / 2,
        s.startAngle + s.sweep - GAP / 2,
      );
      ctx.closePath();
      ctx.fillStyle = s.color;
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }, [slices, size, singleMode]);

  // hit-test: find which slice the mouse is over
  const getSliceAtPoint = useCallback(
    (offsetX: number, offsetY: number): ComputedSlice | null => {
      const cx = size / 2;
      const cy = size / 2;
      const R = size * 0.38;

      const dx = offsetX - cx;
      const dy = offsetY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > R) return null; // outside the pie

      let angle = Math.atan2(dy, dx); // -π to π
      if (angle < -Math.PI / 2) angle += 2 * Math.PI; // normalize to start at top

      for (const s of computedRef.current) {
        const end = s.startAngle + s.sweep;
        if (angle >= s.startAngle && angle <= end) return s;
      }
      return null;
    },
    [size],
  );

  const updateTooltipFromPoint = useCallback(
    (clientX: number, clientY: number, offsetX: number, offsetY: number) => {
      const slice = getSliceAtPoint(offsetX, offsetY);
      if (slice) {
        setTooltipReady(false);
        setTooltip({ clientX, clientY, slice });
      } else {
        setTooltip(null);
        setTooltipReady(false);
      }
    },
    [getSliceAtPoint],
  );

  const handlePointerMove = useCallback(
    (clientX: number, clientY: number, target: HTMLCanvasElement) => {
      const rect = target.getBoundingClientRect();
      const scaleX = size / rect.width;
      const scaleY = size / rect.height;
      const offsetX = (clientX - rect.left) * scaleX;
      const offsetY = (clientY - rect.top) * scaleY;
      updateTooltipFromPoint(clientX, clientY, offsetX, offsetY);
    },
    [size, updateTooltipFromPoint],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      handlePointerMove(e.clientX, e.clientY, e.currentTarget);
    },
    [handlePointerMove],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      const touch = e.touches[0];
      if (!touch) return;
      handlePointerMove(touch.clientX, touch.clientY, e.currentTarget);
    },
    [handlePointerMove],
  );

  const handleMouseLeave = useCallback(() => {
    setTooltip(null);
    setTooltipReady(false);
  }, []);

  useLayoutEffect(() => {
    if (!tooltip || !tooltipRef.current) return;

    const el = tooltipRef.current;
    const { width, height } = el.getBoundingClientRect();

    let left = tooltip.clientX + TOOLTIP_OFFSET;
    let top = tooltip.clientY - 10;

    if (left + width > window.innerWidth - TOOLTIP_MARGIN) {
      left = tooltip.clientX - width - TOOLTIP_OFFSET;
    }
    if (left < TOOLTIP_MARGIN) {
      left = TOOLTIP_MARGIN;
    }

    if (top + height > window.innerHeight - TOOLTIP_MARGIN) {
      top = window.innerHeight - height - TOOLTIP_MARGIN;
    }
    if (top < TOOLTIP_MARGIN) {
      top = TOOLTIP_MARGIN;
    }

    setTooltipPos({ left, top });
    setTooltipReady(true);
  }, [tooltip]);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        role="img"
        aria-label="مخطط دائري لتوزيع النسب"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseLeave}
        style={{ cursor: tooltip ? "pointer" : "default", display: "block", touchAction: "none" }}
      />

      {tooltip && (
        <div
          ref={tooltipRef}
          className="pointer-events-none fixed z-50 max-w-[calc(100vw-16px)] rounded-[5px] border border-border bg-white px-3 py-2 shadow-sm dark:border-white/10 dark:bg-gray-800"
          style={{
            left: tooltipPos.left,
            top: tooltipPos.top,
            direction: "rtl",
            visibility: tooltipReady ? "visible" : "hidden",
          }}
        >
          <div className="mb-1.5 flex items-center gap-1.5">
            <span
              className="size-2.5 shrink-0 rounded-full"
              style={{ background: tooltip.slice.color }}
            />
            <span className="text-[13px] font-medium text-gray-900 dark:text-white">
              {tooltip.slice.name}
            </span>
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-300">
            النسبة:{" "}
            <span className="font-medium text-gray-900 dark:text-white">
              {Number(tooltip.slice.value).toFixed(1)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
