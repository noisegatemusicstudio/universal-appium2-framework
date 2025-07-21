"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
/**
 * Universal logger utility for mobile testing
 * Provides structured logging with different levels
 */
class Logger {
    constructor(context, logLevel = 'info') {
        this.context = context;
        this.logLevel = logLevel;
    }
    getTimestamp() {
        return new Date().toISOString();
    }
    formatMessage(level, message) {
        return `[${this.getTimestamp()}] [${level.toUpperCase()}] [${this.context}] ${message}`;
    }
    shouldLog(level) {
        const levels = ['debug', 'info', 'warn', 'error'];
        return levels.indexOf(level) >= levels.indexOf(this.logLevel);
    }
    debug(message, data) {
        if (this.shouldLog('debug')) {
            console.debug(this.formatMessage('debug', message));
            if (data) {
                console.debug('Data:', data);
            }
        }
    }
    info(message, data) {
        if (this.shouldLog('info')) {
            console.log(this.formatMessage('info', message));
            if (data) {
                console.log('Data:', data);
            }
        }
    }
    warn(message, data) {
        if (this.shouldLog('warn')) {
            console.warn(this.formatMessage('warn', message));
            if (data) {
                console.warn('Data:', data);
            }
        }
    }
    error(message, error) {
        if (this.shouldLog('error')) {
            console.error(this.formatMessage('error', message));
            if (error) {
                console.error('Error:', error);
            }
        }
    }
    step(stepName) {
        this.info(`📱 Step: ${stepName}`);
    }
    action(actionName, details) {
        const message = details ? `${actionName} - ${details}` : actionName;
        this.info(`🎯 Action: ${message}`);
    }
    assertion(assertion, result) {
        const icon = result ? '✅' : '❌';
        this.info(`${icon} Assertion: ${assertion} - ${result ? 'PASSED' : 'FAILED'}`);
    }
}
exports.Logger = Logger;
