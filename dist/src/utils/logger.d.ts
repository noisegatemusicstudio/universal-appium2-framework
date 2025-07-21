/**
 * Universal logger utility for mobile testing
 * Provides structured logging with different levels
 */
export declare class Logger {
    private context;
    private logLevel;
    constructor(context: string, logLevel?: 'debug' | 'info' | 'warn' | 'error');
    private getTimestamp;
    private formatMessage;
    private shouldLog;
    debug(message: string, data?: any): void;
    info(message: string, data?: any): void;
    warn(message: string, data?: any): void;
    error(message: string, error?: any): void;
    step(stepName: string): void;
    action(actionName: string, details?: string): void;
    assertion(assertion: string, result: boolean): void;
}
