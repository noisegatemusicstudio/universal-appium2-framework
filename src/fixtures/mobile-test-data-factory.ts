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

export class MobileTestDataFactory {
  private static readonly FIRST_NAMES = [
    'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
    'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
    'Thomas', 'Sarah', 'Christopher', 'Karen', 'Charles', 'Nancy', 'Daniel', 'Lisa',
    'Matthew', 'Betty', 'Anthony', 'Helen', 'Mark', 'Sandra', 'Donald', 'Donna',
    'Steven', 'Carol', 'Paul', 'Ruth', 'Andrew', 'Sharon', 'Joshua', 'Michelle',
    'Kenneth', 'Laura', 'Kevin', 'Sarah', 'Brian', 'Kimberly', 'George', 'Deborah',
    'Timothy', 'Dorothy', 'Ronald', 'Lisa', 'Jason', 'Nancy', 'Edward', 'Karen',
    'Jeffrey', 'Betty', 'Ryan', 'Helen', 'Jacob', 'Sandra', 'Gary', 'Donna'
  ];

  private static readonly LAST_NAMES = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
    'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
    'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
    'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill',
    'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell',
    'Mitchell', 'Carter', 'Roberts', 'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz'
  ];

  private static readonly EMAIL_DOMAINS = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com',
    'icloud.com', 'protonmail.com', 'mail.com', 'zoho.com', 'fastmail.com'
  ];

  private static readonly CITIES = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
    'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville',
    'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco', 'Indianapolis',
    'Seattle', 'Denver', 'Washington', 'Boston', 'El Paso', 'Nashville',
    'Detroit', 'Oklahoma City', 'Portland', 'Las Vegas', 'Memphis', 'Louisville',
    'Baltimore', 'Milwaukee', 'Albuquerque', 'Tucson', 'Fresno', 'Sacramento'
  ];

  private static readonly ANDROID_MODELS = [
    'Samsung Galaxy S23', 'Samsung Galaxy S23+', 'Samsung Galaxy S23 Ultra',
    'Google Pixel 7', 'Google Pixel 7 Pro', 'Google Pixel 6a',
    'OnePlus 11', 'OnePlus 10T', 'Xiaomi 13', 'Xiaomi 12T Pro',
    'Samsung Galaxy A54', 'Samsung Galaxy A34', 'Motorola Edge 40',
    'Sony Xperia 1 V', 'Nothing Phone (2)', 'Realme GT Neo 5'
  ];

  private static readonly IOS_MODELS = [
    'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14',
    'iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13', 'iPhone 13 mini',
    'iPhone 12 Pro Max', 'iPhone 12 Pro', 'iPhone 12', 'iPhone SE (3rd gen)',
    'iPad Pro 12.9"', 'iPad Pro 11"', 'iPad Air', 'iPad mini'
  ];

  /**
   * Generates a random user profile with realistic data
   */
  static generateUser(type: 'basic' | 'premium' | 'enterprise' | 'trial' = 'basic'): UserProfile {
    const firstName = this.getRandomItem(this.FIRST_NAMES);
    const lastName = this.getRandomItem(this.LAST_NAMES);
    const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${this.getRandomNumber(100, 999)}`;
    const email = `${username}@${this.getRandomItem(this.EMAIL_DOMAINS)}`;
    const id = this.generateId();

    return {
      id,
      email,
      username,
      password: this.generatePassword(),
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      phone: this.generatePhoneNumber(),
      dateOfBirth: this.generateDateOfBirth(),
      type,
      isVerified: Math.random() > 0.3, // 70% verified
      createdAt: this.generatePastDate(365).toISOString(),
      preferences: {
        notifications: Math.random() > 0.2, // 80% enable notifications
        theme: this.getRandomItem(['light', 'dark', 'auto']),
        language: this.getRandomItem(['en', 'es', 'fr', 'de', 'pt', 'zh']),
        privacy: this.getRandomItem(['public', 'private', 'friends'])
      },
      profile: {
        avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${this.getRandomNumber(1, 99)}.jpg`,
        bio: this.generateBio(),
        website: `https://${username}.com`,
        location: `${this.getRandomItem(this.CITIES)}, USA`
      }
    };
  }

  /**
   * Generates device information for testing
   */
  static generateDeviceInfo(platform: 'android' | 'ios'): DeviceInfo {
    const isAndroid = platform === 'android';
    const models = isAndroid ? this.ANDROID_MODELS : this.IOS_MODELS;
    const model = this.getRandomItem(models);
    
    const androidVersions = ['11', '12', '13', '14'];
    const iosVersions = ['15.0', '16.0', '16.4', '17.0', '17.1'];
    
    const version = isAndroid 
      ? this.getRandomItem(androidVersions)
      : this.getRandomItem(iosVersions);

    const resolutions = isAndroid 
      ? ['1080x2340', '1440x3200', '1080x2400', '720x1600']
      : ['1170x2532', '1284x2778', '828x1792', '1080x2340'];

    return {
      platform,
      version,
      model,
      manufacturer: isAndroid 
        ? this.getRandomItem(['Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Motorola'])
        : 'Apple',
      screenResolution: this.getRandomItem(resolutions),
      screenDensity: isAndroid ? this.getRandomNumber(280, 560) : this.getRandomNumber(326, 458),
      orientation: this.getRandomItem(['portrait', 'landscape']),
      isTablet: Math.random() > 0.8, // 20% tablets
      hasTouch: true,
      capabilities: this.generateCapabilities(platform),
      appVersion: `${this.getRandomNumber(1, 5)}.${this.getRandomNumber(0, 9)}.${this.getRandomNumber(0, 9)}`,
      buildNumber: this.getRandomNumber(100, 9999).toString()
    };
  }

  /**
   * Generates application-specific test data
   */
  static generateAppData(appType: 'social' | 'productivity' | 'gaming' | 'business' | 'education' = 'social'): AppData {
    const environments: ('development' | 'staging' | 'production')[] = ['development', 'staging', 'production'];
    const features = this.generateAppFeatures(appType);

    return {
      sessionId: this.generateSessionId(),
      environment: this.getRandomItem(environments),
      appType,
      features,
      apiEndpoint: `https://api-${this.getRandomItem(environments)}.example.com`,
      apiKey: this.generateApiKey(),
      version: `${this.getRandomNumber(1, 10)}.${this.getRandomNumber(0, 20)}.${this.getRandomNumber(0, 100)}`,
      buildConfig: {
        debug: Math.random() > 0.7, // 30% debug builds
        analytics: Math.random() > 0.1, // 90% have analytics
        crashReporting: Math.random() > 0.2 // 80% have crash reporting
      }
    };
  }

  /**
   * Generates location data for testing
   */
  static generateLocation(): LocationData {
    const city = this.getRandomItem(this.CITIES);
    const latitude = this.getRandomNumber(25.0, 49.0);
    const longitude = this.getRandomNumber(-125.0, -66.0);

    return {
      latitude: parseFloat(latitude.toFixed(6)),
      longitude: parseFloat(longitude.toFixed(6)),
      address: `${this.getRandomNumber(1, 9999)} ${this.getRandomItem(['Main', 'Oak', 'Pine', 'Maple', 'Cedar'])} St`,
      city,
      state: this.getRandomItem(['CA', 'NY', 'TX', 'FL', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI']),
      country: 'United States',
      zipCode: this.getRandomNumber(10000, 99999).toString(),
      timezone: this.getRandomItem(['America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles']),
      accuracy: this.getRandomNumber(5, 50)
    };
  }

  /**
   * Generates contact information
   */
  static generateContact(): ContactInfo {
    const firstName = this.getRandomItem(this.FIRST_NAMES);
    const lastName = this.getRandomItem(this.LAST_NAMES);
    const city = this.getRandomItem(this.CITIES);

    return {
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${this.getRandomItem(this.EMAIL_DOMAINS)}`,
      phone: this.generatePhoneNumber(),
      company: this.generateCompanyName(),
      jobTitle: this.generateJobTitle(),
      address: {
        street: `${this.getRandomNumber(1, 9999)} ${this.getRandomItem(['Main', 'Oak', 'Pine', 'Maple'])} St`,
        city,
        state: this.getRandomItem(['CA', 'NY', 'TX', 'FL', 'IL']),
        zipCode: this.getRandomNumber(10000, 99999).toString(),
        country: 'United States'
      }
    };
  }

  /**
   * Generates credit card information for testing (fake data)
   */
  static generateCreditCard(): CreditCardInfo {
    const types: ('visa' | 'mastercard' | 'amex' | 'discover')[] = ['visa', 'mastercard', 'amex', 'discover'];
    const type = this.getRandomItem(types);
    const firstName = this.getRandomItem(this.FIRST_NAMES);
    const lastName = this.getRandomItem(this.LAST_NAMES);

    // Generate fake credit card numbers (not real)
    const prefixes: Record<'visa' | 'mastercard' | 'amex' | 'discover', string> = {
      visa: '4',
      mastercard: '5',
      amex: '34',
      discover: '6'
    };

    const number = prefixes[type] + this.getRandomNumber(100000000000000, 999999999999999).toString().substring(1);

    return {
      number,
      expiryMonth: this.getRandomNumber(1, 12).toString().padStart(2, '0'),
      expiryYear: (new Date().getFullYear() + this.getRandomNumber(1, 5)).toString(),
      cvv: type === 'amex' ? this.getRandomNumber(1000, 9999).toString() : this.getRandomNumber(100, 999).toString(),
      holderName: `${firstName} ${lastName}`.toUpperCase(),
      type
    };
  }

  /**
   * Generates a random email address
   */
  static generateEmail(domain?: string): string {
    const username = `user${this.getRandomNumber(1000, 9999)}`;
    const selectedDomain = domain || this.getRandomItem(this.EMAIL_DOMAINS);
    return `${username}@${selectedDomain}`;
  }

  /**
   * Generates a secure password
   */
  static generatePassword(length: number = 12): string {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  }

  /**
   * Generates a phone number
   */
  static generatePhoneNumber(): string {
    const areaCode = this.getRandomNumber(200, 999);
    const exchange = this.getRandomNumber(200, 999);
    const number = this.getRandomNumber(1000, 9999);
    return `+1-${areaCode}-${exchange}-${number}`;
  }

  // Private helper methods
  private static getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  private static getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private static generateId(): string {
    return 'user_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  private static generateSessionId(): string {
    return 'session_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
  }

  private static generateApiKey(): string {
    return 'ak_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  private static generateDateOfBirth(): string {
    const year = this.getRandomNumber(1970, 2005);
    const month = this.getRandomNumber(1, 12);
    const day = this.getRandomNumber(1, 28);
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  private static generatePastDate(daysAgo: number): Date {
    const date = new Date();
    date.setDate(date.getDate() - this.getRandomNumber(1, daysAgo));
    return date;
  }

  private static generateBio(): string {
    const bios = [
      'Love to travel and explore new places 🌍',
      'Coffee enthusiast ☕ | Tech lover 💻',
      'Passionate about photography 📸',
      'Fitness enthusiast 💪 | Healthy living',
      'Foodie | Always looking for great restaurants 🍕',
      'Music lover 🎵 | Concert goer',
      'Book reader 📚 | Always learning',
      'Dog lover 🐕 | Animal advocate',
      'Entrepreneur | Building the future',
      'Designer | Creating beautiful things ✨'
    ];
    return this.getRandomItem(bios);
  }

  private static generateCapabilities(platform: 'android' | 'ios'): string[] {
    const commonCapabilities = ['touchscreen', 'camera', 'microphone', 'speaker', 'accelerometer', 'gyroscope'];
    const androidCapabilities = ['fingerprint', 'nfc', 'usb_otg', 'expandable_storage'];
    const iosCapabilities = ['face_id', 'touch_id', 'apple_pay', '3d_touch'];

    const capabilities = [...commonCapabilities];
    if (platform === 'android') {
      capabilities.push(...androidCapabilities.filter(() => Math.random() > 0.3));
    } else {
      capabilities.push(...iosCapabilities.filter(() => Math.random() > 0.3));
    }

    return capabilities;
  }

  private static generateAppFeatures(appType: 'social' | 'productivity' | 'gaming' | 'business' | 'education'): string[] {
    const featureMap: Record<'social' | 'productivity' | 'gaming' | 'business' | 'education', string[]> = {
      social: ['messaging', 'photo_sharing', 'stories', 'live_streaming', 'groups'],
      productivity: ['document_editing', 'collaboration', 'cloud_sync', 'offline_mode', 'templates'],
      gaming: ['multiplayer', 'achievements', 'leaderboards', 'in_app_purchases', 'cloud_saves'],
      business: ['analytics', 'reporting', 'crm', 'invoicing', 'team_management'],
      education: ['video_lessons', 'quizzes', 'progress_tracking', 'certificates', 'offline_content']
    };

    const baseFeatures = featureMap[appType];
    return baseFeatures.filter(() => Math.random() > 0.3);
  }

  private static generateCompanyName(): string {
    const prefixes = ['Tech', 'Digital', 'Global', 'Smart', 'Innovative', 'Future', 'Advanced'];
    const suffixes = ['Solutions', 'Systems', 'Corp', 'Inc', 'Technologies', 'Dynamics', 'Enterprises'];
    return `${this.getRandomItem(prefixes)} ${this.getRandomItem(suffixes)}`;
  }

  private static generateJobTitle(): string {
    const titles = [
      'Software Engineer', 'Product Manager', 'UX Designer', 'Data Analyst',
      'Marketing Manager', 'Sales Representative', 'Operations Manager', 'HR Specialist',
      'Financial Analyst', 'Customer Success Manager', 'DevOps Engineer', 'QA Engineer'
    ];
    return this.getRandomItem(titles);
  }
}
