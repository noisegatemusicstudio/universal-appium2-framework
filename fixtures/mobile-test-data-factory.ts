/**
 * Universal test data factory for mobile applications
 * Generates realistic test data for any mobile app
 */
export class MobileTestDataFactory {
  private static readonly FIRST_NAMES = [
    'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Quinn',
    'Sage', 'River', 'Phoenix', 'Rowan', 'Skylar', 'Blake', 'Charlie', 'Drew'
  ];

  private static readonly LAST_NAMES = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas'
  ];

  private static readonly CITIES = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
    'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville',
    'Singapore', 'London', 'Tokyo', 'Sydney', 'Toronto', 'Berlin'
  ];

  private static readonly COUNTRIES = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany',
    'France', 'Japan', 'Singapore', 'Netherlands', 'Sweden'
  ];

  private static readonly PHONE_PREFIXES = [
    '+1', '+44', '+61', '+49', '+33', '+81', '+65', '+31', '+46'
  ];

  /**
   * Generate a random string of specified length
   */
  static generateRandomString(length: number = 8): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generate a unique ID
   */
  static generateId(): string {
    return `${Date.now()}-${this.generateRandomString(6)}`;
  }

  /**
   * Get random item from array
   */
  private static getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  /**
   * Generate a random email
   */
  static generateEmail(domain: string = 'example.com'): string {
    const username = `test-${this.generateRandomString(8)}`;
    return `${username}@${domain}`;
  }

  /**
   * Generate a random phone number
   */
  static generatePhoneNumber(): string {
    const prefix = this.getRandomItem(this.PHONE_PREFIXES);
    const number = Math.floor(Math.random() * 9000000000) + 1000000000;
    return `${prefix}${number}`;
  }

  /**
   * Generate a random password
   */
  static generatePassword(length: number = 12): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    
    // Ensure at least one uppercase, lowercase, number, and special char
    password += this.getRandomItem('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));
    password += this.getRandomItem('abcdefghijklmnopqrstuvwxyz'.split(''));
    password += this.getRandomItem('0123456789'.split(''));
    password += this.getRandomItem('!@#$%^&*'.split(''));
    
    // Fill the rest randomly
    for (let i = 4; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Shuffle the password
    return password.split('').sort(() => Math.random() - 0.5).join('');
  }

  /**
   * Generate user data for mobile apps
   */
  static generateUser(userType: string = 'standard'): any {
    const firstName = this.getRandomItem(this.FIRST_NAMES);
    const lastName = this.getRandomItem(this.LAST_NAMES);
    const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${Math.floor(Math.random() * 1000)}`;
    
    return {
      id: this.generateId(),
      userType,
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      username,
      email: this.generateEmail(),
      password: this.generatePassword(),
      phone: this.generatePhoneNumber(),
      dateOfBirth: this.generateDateOfBirth(),
      address: this.generateAddress(),
      preferences: this.generateUserPreferences(),
      createdAt: new Date().toISOString(),
    };
  }

  /**
   * Generate date of birth (18-65 years old)
   */
  static generateDateOfBirth(): string {
    const currentYear = new Date().getFullYear();
    const birthYear = currentYear - Math.floor(Math.random() * 47) - 18; // 18-65 years old
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1; // Safe day range
    
    return `${birthYear}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  /**
   * Generate address
   */
  static generateAddress(): any {
    return {
      street: `${Math.floor(Math.random() * 9999) + 1} ${this.getRandomItem(['Main', 'Oak', 'Pine', 'Maple', 'Cedar'])} St`,
      city: this.getRandomItem(this.CITIES),
      state: this.getRandomItem(['CA', 'NY', 'TX', 'FL', 'WA', 'OR', 'NV']),
      zipCode: `${Math.floor(Math.random() * 90000) + 10000}`,
      country: this.getRandomItem(this.COUNTRIES),
    };
  }

  /**
   * Generate user preferences
   */
  static generateUserPreferences(): any {
    return {
      language: this.getRandomItem(['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'ko']),
      timezone: this.getRandomItem(['America/New_York', 'America/Los_Angeles', 'Europe/London', 'Asia/Tokyo']),
      notifications: {
        push: Math.random() > 0.3,
        email: Math.random() > 0.4,
        sms: Math.random() > 0.7,
      },
      theme: this.getRandomItem(['light', 'dark', 'auto']),
      accessibility: {
        fontSize: this.getRandomItem(['small', 'medium', 'large']),
        highContrast: Math.random() > 0.8,
        voiceOver: Math.random() > 0.9,
      },
    };
  }

  /**
   * Generate mobile app specific data
   */
  static generateAppData(appType: string): any {
    const baseData = {
      appVersion: '1.0.0',
      deviceId: this.generateId(),
      sessionId: this.generateId(),
      timestamp: Date.now(),
    };

    switch (appType.toLowerCase()) {
      case 'social':
        return {
          ...baseData,
          posts: Math.floor(Math.random() * 100),
          followers: Math.floor(Math.random() * 1000),
          following: Math.floor(Math.random() * 500),
        };
      
      case 'ecommerce':
        return {
          ...baseData,
          cartItems: Math.floor(Math.random() * 10),
          wishlistItems: Math.floor(Math.random() * 20),
          orderHistory: Math.floor(Math.random() * 50),
        };
      
      case 'music':
        return {
          ...baseData,
          playlists: Math.floor(Math.random() * 20),
          favoriteArtists: Math.floor(Math.random() * 50),
          genres: this.getRandomItem([['rock', 'pop'], ['jazz', 'blues'], ['electronic', 'ambient']]),
        };
      
      default:
        return baseData;
    }
  }

  /**
   * Generate device information
   */
  static generateDeviceInfo(platform: 'android' | 'ios'): any {
    if (platform === 'android') {
      return {
        platform: 'android',
        version: this.getRandomItem(['11', '12', '13', '14']),
        model: this.getRandomItem(['Pixel 6', 'Pixel 7', 'Galaxy S22', 'Galaxy S23']),
        manufacturer: this.getRandomItem(['Google', 'Samsung']),
        screenSize: this.getRandomItem(['1080x2340', '1440x3200']),
        dpi: this.getRandomItem([420, 480, 560]),
      };
    } else {
      return {
        platform: 'ios',
        version: this.getRandomItem(['15.0', '16.0', '17.0']),
        model: this.getRandomItem(['iPhone 13', 'iPhone 14', 'iPhone 15']),
        manufacturer: 'Apple',
        screenSize: this.getRandomItem(['390x844', '428x926']),
        dpi: this.getRandomItem([458, 460]),
      };
    }
  }

  /**
   * Generate location data
   */
  static generateLocation(): any {
    return {
      latitude: (Math.random() * 180 - 90).toFixed(6),
      longitude: (Math.random() * 360 - 180).toFixed(6),
      accuracy: Math.floor(Math.random() * 100) + 5,
      timestamp: Date.now(),
    };
  }

  /**
   * Generate payment information (for testing - not real)
   */
  static generatePaymentInfo(): any {
    const cardTypes = ['visa', 'mastercard', 'amex'];
    const cardType = this.getRandomItem(cardTypes);
    
    let cardNumber = '';
    switch (cardType) {
      case 'visa':
        cardNumber = '4111111111111111';
        break;
      case 'mastercard':
        cardNumber = '5555555555554444';
        break;
      case 'amex':
        cardNumber = '378282246310005';
        break;
    }
    
    return {
      cardType,
      cardNumber,
      expiryMonth: Math.floor(Math.random() * 12) + 1,
      expiryYear: new Date().getFullYear() + Math.floor(Math.random() * 5) + 1,
      cvv: Math.floor(Math.random() * 900) + 100,
      holderName: `${this.getRandomItem(this.FIRST_NAMES)} ${this.getRandomItem(this.LAST_NAMES)}`,
    };
  }

  /**
   * Generate test file data
   */
  static generateFileData(): any {
    const fileTypes = ['image', 'video', 'document', 'audio'];
    const fileType = this.getRandomItem(fileTypes);
    
    const extensions = {
      image: ['jpg', 'png', 'gif', 'webp'],
      video: ['mp4', 'mov', 'avi', 'mkv'],
      document: ['pdf', 'doc', 'txt', 'xlsx'],
      audio: ['mp3', 'wav', 'aac', 'm4a'],
    };
    
    const extension = this.getRandomItem(extensions[fileType as keyof typeof extensions]);
    const fileName = `test-file-${this.generateRandomString(8)}.${extension}`;
    
    return {
      fileName,
      fileType,
      extension,
      size: Math.floor(Math.random() * 10000000) + 1000, // 1KB to 10MB
      mimeType: `${fileType}/${extension}`,
      lastModified: Date.now() - Math.floor(Math.random() * 86400000), // Within last 24 hours
    };
  }
}
