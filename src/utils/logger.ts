
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: string;
  userAgent?: string;
  url?: string;
}

class Logger {
  private isDevelopment = import.meta.env.DEV;
  private logBuffer: LogEntry[] = [];
  private maxBufferSize = 100;

  private createLogEntry(level: LogLevel, message: string, data?: any): LogEntry {
    return {
      level,
      message,
      data,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    };
  }

  private addToBuffer(entry: LogEntry) {
    this.logBuffer.push(entry);
    if (this.logBuffer.length > this.maxBufferSize) {
      this.logBuffer.shift();
    }
  }

  private shouldLog(level: LogLevel): boolean {
    if (this.isDevelopment) return true;
    return level >= LogLevel.WARN; // Only log warnings and errors in production
  }

  debug(message: string, data?: any) {
    const entry = this.createLogEntry(LogLevel.DEBUG, message, data);
    this.addToBuffer(entry);
    
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.debug(`[DEBUG] ${message}`, data);
    }
  }

  info(message: string, data?: any) {
    const entry = this.createLogEntry(LogLevel.INFO, message, data);
    this.addToBuffer(entry);
    
    if (this.shouldLog(LogLevel.INFO)) {
      console.info(`[INFO] ${message}`, data);
    }
  }

  warn(message: string, data?: any) {
    const entry = this.createLogEntry(LogLevel.WARN, message, data);
    this.addToBuffer(entry);
    
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(`[WARN] ${message}`, data);
    }

    // Send to analytics in production
    if (!this.isDevelopment && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'warning', {
        event_category: 'Application',
        event_label: message,
        custom_parameter: data ? JSON.stringify(data) : undefined,
      });
    }
  }

  error(message: string, error?: any) {
    const entry = this.createLogEntry(LogLevel.ERROR, message, error);
    this.addToBuffer(entry);
    
    console.error(`[ERROR] ${message}`, error);

    // Send to analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: message,
        fatal: false,
        custom_parameter: error ? JSON.stringify(error) : undefined,
      });
    }
  }

  getLogBuffer(): LogEntry[] {
    return [...this.logBuffer];
  }

  clearBuffer() {
    this.logBuffer = [];
  }

  // For debugging - get logs as downloadable file
  downloadLogs() {
    const logs = this.getLogBuffer().map(entry => 
      `[${entry.timestamp}] [${LogLevel[entry.level]}] ${entry.message}${entry.data ? ` | Data: ${JSON.stringify(entry.data)}` : ''}`
    ).join('\n');
    
    const blob = new Blob([logs], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cloudways-calculator-logs-${new Date().toISOString()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }
}

export const logger = new Logger();
