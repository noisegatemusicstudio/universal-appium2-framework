/**
 * Mobile Test Data Factory
 *
 * This factory generates realistic test data for mobile application testing.
 * It provides methods for creating various types of test data including:
 * - User profiles with different types and characteristics
 * - Device information for different platforms
 * - Application-specific data
 * - Location and geographic data
 * - Mobile-specific test scenarios
 *
 * Usage:
 * ```typescript
 * const user = MobileTestDataFactory.generateUser('premium');
 * const device = MobileTestDataFactory.generateDeviceInfo('android');
 * const location = MobileTestDataFactory.generateLocation();
 * ```
 */
export interface UserProfile {
    id: string;
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    fullName: string;
    phone: string;
    dateOfBirth: string;
    type: 'basic' | 'premium' | 'enterprise' | 'trial';
    isVerified: boolean;
    createdAt: string;
    preferences: {
        notifications: boolean;
        theme: 'light' | 'dark' | 'auto';
        language: string;
        privacy: 'public' | 'private' | 'friends';
    };
    profile: {
        avatar: string;
        bio: string;
        website: string;
        location: string;
    };
}
export interface DeviceInfo {
    platform: 'android' | 'ios';
    version: string;
    model: string;
    manufacturer: string;
    screenResolution: string;
    screenDensity: number;
    orientation: 'portrait' | 'landscape';
    isTablet: boolean;
    hasTouch: boolean;
    capabilities: string[];
    appVersion: string;
    buildNumber: string;
}
export interface AppData {
    sessionId: string;
    environment: 'development' | 'staging' | 'production';
    appType: 'social' | 'productivity' | 'gaming' | 'business' | 'education';
    features: string[];
    apiEndpoint: string;
    apiKey: string;
    version: string;
    buildConfig: {
        debug: boolean;
        analytics: boolean;
        crashReporting: boolean;
    };
}
export interface LocationData {
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    timezone: string;
    accuracy: number;
}
export interface ContactInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    jobTitle: string;
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
}
export interface CreditCardInfo {
    number: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
    holderName: string;
    type: 'visa' | 'mastercard' | 'amex' | 'discover';
}
export declare class MobileTestDataFactory {
    private static readonly FIRST_NAMES;
    private static readonly LAST_NAMES;
    private static readonly EMAIL_DOMAINS;
    private static readonly CITIES;
    private static readonly ANDROID_MODELS;
    private static readonly IOS_MODELS;
    /**
     * Generates a random user profile with realistic data
     */
    static generateUser(type?: 'basic' | 'premium' | 'enterprise' | 'trial'): UserProfile;
    /**
     * Generates device information for testing
     */
    static generateDeviceInfo(platform: 'android' | 'ios'): DeviceInfo;
    /**
     * Generates application-specific test data
     */
    static generateAppData(appType?: 'social' | 'productivity' | 'gaming' | 'business' | 'education'): AppData;
    /**
     * Generates location data for testing
     */
    static generateLocation(): LocationData;
    /**
     * Generates contact information
     */
    static generateContact(): ContactInfo;
    /**
     * Generates credit card information for testing (fake data)
     */
    static generateCreditCard(): CreditCardInfo;
    /**
     * Generates a random email address
     */
    static generateEmail(domain?: string): string;
    /**
     * Generates a secure password
     */
    static generatePassword(length?: number): string;
    /**
     * Generates a phone number
     */
    static generatePhoneNumber(): string;
    private static getRandomItem;
    private static getRandomNumber;
    private static generateId;
    private static generateSessionId;
    private static generateApiKey;
    private static generateDateOfBirth;
    private static generatePastDate;
    private static generateBio;
    private static generateCapabilities;
    private static generateAppFeatures;
    private static generateCompanyName;
    private static generateJobTitle;
}
