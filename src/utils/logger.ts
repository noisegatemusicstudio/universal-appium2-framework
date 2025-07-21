/**
 * Universal logger utility for mobile testing
 * Provides structured logging with different levels
 */
export class Logger {
  private context: string;
  private logLevel: 'debug' | 'info' | 'warn' | 'error';

  constructor(context: string, logLevel: 'debug' | 'info' | 'warn' | 'error' = 'info') {
    this.context = context;
    this.logLevel = logLevel;
  }

  private getTimestamp(): string {
    return new Date().toISOString();
  }

  private formatMessage(level: string, message: string): string {
    return `[${this.getTimestamp()}] [${level.toUpperCase()}] [${this.context}] ${message}`;
  }

  private shouldLog(level: 'debug' | 'info' | 'warn' | 'error'): boolean {
    const levels = ['debug', 'info', 'warn', 'error'];
    return levels.indexOf(level) >= levels.indexOf(this.logLevel);
  }

  debug(message: string, data?: any): void {
    if (this.shouldLog('debug')) {
      console.debug(this.formatMessage('debug', message));
      if (data) {
        console.debug('Data:', data);
      }
    }
  }

  info(message: string, data?: any): void {
    if (this.shouldLog('info')) {
      console.log(this.formatMessage('info', message));
      if (data) {
        console.log('Data:', data);
      }
    }
  }

  warn(message: string, data?: any): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message));
      if (data) {
        console.warn('Data:', data);
      }
    }
  }

  error(message: string, error?: any): void {
    if (this.shouldLog('error')) {
      console.error(this.formatMessage('error', message));
      if (error) {
        console.error('Error:', error);
      }
    }
  }

  step(stepName: string): void {
    this.info(`📱 Step: ${stepName}`);
  }

  action(actionName: string, details?: string): void {
    const message = details ? `${actionName} - ${details}` : actionName;
    this.info(`🎯 Action: ${message}`);
  }

  assertion(assertion: string, result: boolean): void {
    const icon = result ? '✅' : '❌';
    this.info(`${icon} Assertion: ${assertion} - ${result ? 'PASSED' : 'FAILED'}`);
  }
}
