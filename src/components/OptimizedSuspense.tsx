import { ReactNode, Suspense } from "react";

interface OptimizedSuspenseProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function OptimizedSuspense({
  children,
  fallback,
}: OptimizedSuspenseProps) {
  const defaultFallback = fallback || (
    <div className="flex items-center justify-center py-20">
      <div className="loading-spinner rounded-full h-12 w-12 border-b-2 border-blue-300"></div>
      <span className="ml-3 text-blue-100">
        Ladataan uutisia syvyyksistä...
      </span>
    </div>
  );

  return (
    <div className="min-h-[200px]">
      {" "}
      {/* Prevent layout shift */}
      <Suspense fallback={defaultFallback}>{children}</Suspense>
    </div>
  );
}
