import { useState, useEffect } from "react";

interface ViewportInfo {
  width: number;
  height: number;
  vmin: number;
  vmax: number;
}

const getViewportInfo = (): ViewportInfo => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  return {
    width: w,
    height: h,
    vmin: Math.min(w, h),
    vmax: Math.max(w, h),
  };
};

export const useViewport = (): ViewportInfo => {
  const [viewport, setViewport] = useState<ViewportInfo>(getViewportInfo);

  useEffect(() => {
    const handleResize = () => {
      setViewport(getViewportInfo());
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return viewport;
};

export const useWheelSize = (): {
  wheelSize: number;
  spinner: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
} => {
  const { width, height, vmin, vmax } = useViewport();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1280;
  const isDesktop = width >= 1280;

  const spinner = !isMobile && !isTablet;

  let wheelSize: number;

  if (isMobile) {
    wheelSize = Math.min(vmin * 0.85, width * 0.9, 320);
  } else if (isTablet) {
    wheelSize = Math.min(vmin * 0.8, 450);
  } else {
    wheelSize = Math.min(vmin * 0.65, vmax * 0.5, 550);
  }

  return { wheelSize, spinner, isMobile, isTablet, isDesktop };
};
