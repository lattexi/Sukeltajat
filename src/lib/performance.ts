// Performance monitoring utilities
interface WebVitalMetric {
  name: string;
  id: string;
  value: number;
  delta: number;
  entries: PerformanceEntry[];
}

export function reportWebVitals(metric: WebVitalMetric) {
  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(metric);
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === "production") {
    // You can send to Google Analytics, Vercel Analytics, etc.
    // gtag('event', metric.name, {
    //   event_category: 'Web Vitals',
    //   event_label: metric.id,
    //   value: Math.round(metric.value),
    //   non_interaction: true,
    // })
  }
}

export function measurePerformance() {
  // Measure First Contentful Paint
  if ("performance" in window && "getEntriesByType" in performance) {
    const fcpEntry = performance
      .getEntriesByType("paint")
      .find((entry) => entry.name === "first-contentful-paint");

    if (fcpEntry) {
      console.log("First Contentful Paint:", fcpEntry.startTime);
    }
  }
}
