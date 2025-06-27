import { logger } from './logger';

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private isDevelopment = import.meta.env.DEV;

  // Mark the start of a performance measurement
  markStart(name: string) {
    if (typeof performance !== 'undefined') {
      performance.mark(`${name}-start`);
    }
  }

  // Mark the end and measure performance
  markEnd(name: string) {
    if (typeof performance !== 'undefined') {
      const endMark = `${name}-end`;
      const startMark = `${name}-start`;
      
      performance.mark(endMark);
      
      try {
        performance.measure(name, startMark, endMark);
        const measure = performance.getEntriesByName(name, 'measure')[0];
        
        if (measure) {
          this.recordMetric(name, measure.duration);
          
          // Log slow operations
          if (measure.duration > 1000) { // More than 1 second
            logger.warn(`Slow operation detected: ${name}`, {
              duration: measure.duration,
            });
          }
        }
      } catch (error) {
        logger.error(`Performance measurement failed for ${name}`, error);
      }
    }
  }

  // Record custom metrics
  recordMetric(name: string, value: number) {
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: Date.now(),
    };
    
    this.metrics.push(metric);
    
    // Keep only last 100 metrics
    if (this.metrics.length > 100) {
      this.metrics.shift();
    }

    // Send to analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'timing_complete', {
        name: name,
        value: Math.round(value),
      });
    }

    if (this.isDevelopment) {
      logger.debug(`Performance metric: ${name}`, { value, unit: 'ms' });
    }
  }

  // Monitor Core Web Vitals
  observeWebVitals() {
    if (typeof window === 'undefined') return;

    // First Contentful Paint
    this.observePerformanceEntry('first-contentful-paint', (entry) => {
      this.recordMetric('FCP', entry.startTime);
    });

    // Largest Contentful Paint
    this.observeLCP();

    // Cumulative Layout Shift
    this.observeCLS();

    // First Input Delay
    this.observeFID();
  }

  private observePerformanceEntry(entryType: string, callback: (entry: PerformanceEntry) => void) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          callback(entry);
        }
      });
      observer.observe({ entryTypes: [entryType] });
    } catch (error) {
      logger.debug(`Performance observer not supported for ${entryType}`);
    }
  }

  private observeLCP() {
    this.observePerformanceEntry('largest-contentful-paint', (entry) => {
      this.recordMetric('LCP', entry.startTime);
    });
  }

  private observeCLS() {
    this.observePerformanceEntry('layout-shift', (entry: any) => {
      if (!entry.hadRecentInput) {
        this.recordMetric('CLS', entry.value);
      }
    });
  }

  private observeFID() {
    this.observePerformanceEntry('first-input', (entry: any) => {
      this.recordMetric('FID', entry.processingStart - entry.startTime);
    });
  }

  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  getAverageMetric(name: string): number {
    const matching = this.metrics.filter(m => m.name === name);
    if (matching.length === 0) return 0;
    
    const sum = matching.reduce((acc, m) => acc + m.value, 0);
    return sum / matching.length;
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Initialize web vitals monitoring when the module loads
if (typeof window !== 'undefined') {
  performanceMonitor.observeWebVitals();
}
