import * as React from "react";

type Breakpoint = 'mobile' | 'lg' | 'xl';

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = React.useState<Breakpoint>('mobile');

  React.useEffect(() => {
    const getBreakpoint = () => {
      const width = window.innerWidth;
      if (width >= 1280) return 'xl';
      if (width >= 1024) return 'lg';
      return 'mobile';
    };

    const updateBreakpoint = () => {
      setBreakpoint(getBreakpoint());
    };

    updateBreakpoint(); // Set on initial load
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  return breakpoint;
}
