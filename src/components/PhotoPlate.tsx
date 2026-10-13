"use client";

/**
 * Printed placeholder sheet, shown in a photo slot until a real photo
 * exists in src/assets/moments/. See that folder's README.
 */
export default function PhotoPlate({ label }: { label: string }) {
  return (
    <div className="relative aspect-[4/3] w-full bg-cream-100 border-2 border-dashed border-sage-300 rounded-lg overflow-hidden halftone">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-3 text-center">
        <span className="text-2xl opacity-60">🖼️</span>
        <p className="press-label opacity-60">photo pending</p>
        <p className="text-sm text-sage-500 leading-tight">{label}</p>
      </div>
    </div>
  );
}
