#!/bin/bash

# Appium2 Framework Setup Script
# This script sets up the Appium2 mobile testing framework

set -e  # Exit on any error

echo "🚀 Setting up Appium2 Mobile Testing Framework..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 16+ and try again."
        exit 1
    fi
    
    NODE_VERSION=$(node -v | cut -d 'v' -f 2)
    MAJOR_VERSION=$(echo $NODE_VERSION | cut -d '.' -f 1)
    
    if [ "$MAJOR_VERSION" -lt 16 ]; then
        print_error "Node.js version $NODE_VERSION detected. Please upgrade to Node.js 16+ and try again."
        exit 1
    fi
    
    print_success "Node.js $NODE_VERSION detected"
}

# Check if Java is installed (required for Android)
check_java() {
    if ! command -v java &> /dev/null; then
        print_warning "Java is not installed. Java 8+ is required for Android testing."
        print_warning "Please install Java from: https://adoptium.net/"
    else
        JAVA_VERSION=$(java -version 2>&1 | head -n 1 | cut -d '"' -f 2)
        print_success "Java $JAVA_VERSION detected"
    fi
}

# Check if Android SDK is installed
check_android_sdk() {
    if [ -z "$ANDROID_HOME" ]; then
        print_warning "ANDROID_HOME is not set. Android testing will not work without Android SDK."
        print_warning "Please install Android SDK and set ANDROID_HOME environment variable."
        print_warning "Guide: https://developer.android.com/studio"
    else
        print_success "Android SDK found at: $ANDROID_HOME"
    fi
}

# Check if Xcode is installed (macOS only)
check_xcode() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        if ! command -v xcodebuild &> /dev/null; then
            print_warning "Xcode is not installed. iOS testing will not work without Xcode."
            print_warning "Please install Xcode from the App Store."
        else
            XCODE_VERSION=$(xcodebuild -version | head -n 1 | cut -d ' ' -f 2)
            print_success "Xcode $XCODE_VERSION detected"
        fi
    else
        print_status "iOS testing is only available on macOS"
    fi
}

# Install npm dependencies
install_dependencies() {
    print_status "Installing npm dependencies..."
    
    if [ -f "package.json" ]; then
        npm install
        print_success "Dependencies installed successfully"
    else
        print_error "package.json not found. Please run this script from the framework root directory."
        exit 1
    fi
}

# Install Appium globally
install_appium() {
    print_status "Checking Appium installation..."
    
    if ! command -v appium &> /dev/null; then
        print_status "Installing Appium globally..."
        npm install -g appium
        print_success "Appium installed globally"
    else
        APPIUM_VERSION=$(appium -v)
        print_success "Appium $APPIUM_VERSION already installed"
    fi
}

# Install Appium drivers
install_drivers() {
    print_status "Installing Appium drivers..."
    
    # Install UiAutomator2 driver for Android
    print_status "Installing UiAutomator2 driver for Android..."
    appium driver install uiautomator2
    
    # Install XCUITest driver for iOS (macOS only)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        print_status "Installing XCUITest driver for iOS..."
        appium driver install xcuitest
    fi
    
    print_success "Appium drivers installed"
}

# Install Appium Doctor
install_appium_doctor() {
    print_status "Installing Appium Doctor for diagnostics..."
    
    if ! command -v appium-doctor &> /dev/null; then
        npm install -g appium-doctor
        print_success "Appium Doctor installed"
    else
        print_success "Appium Doctor already installed"
    fi
}

# Create environment file
setup_environment() {
    print_status "Setting up environment configuration..."
    
    if [ ! -f ".env" ]; then
        if [ -f ".env.example" ]; then
            cp .env.example .env
            print_success "Environment file created from template"
            print_warning "Please update .env file with your app-specific configuration"
        else
            print_error ".env.example not found"
        fi
    else
        print_status "Environment file already exists"
    fi
}

# Create directories
create_directories() {
    print_status "Creating necessary directories..."
    
    mkdir -p test-results/screenshots
    mkdir -p test-results/reports
    mkdir -p test-results/videos
    mkdir -p logs
    mkdir -p apps/android
    mkdir -p apps/ios
    
    print_success "Directories created"
}

# Run Appium Doctor
run_diagnostics() {
    print_status "Running Appium Doctor diagnostics..."
    
    if command -v appium-doctor &> /dev/null; then
        echo ""
        print_status "Android diagnostics:"
        appium-doctor --android || true
        
        if [[ "$OSTYPE" == "darwin"* ]]; then
            echo ""
            print_status "iOS diagnostics:"
            appium-doctor --ios || true
        fi
        
        echo ""
        print_warning "Please review the diagnostics above and fix any issues before running tests"
    else
        print_warning "Appium Doctor not available for diagnostics"
    fi
}

# Build TypeScript
build_typescript() {
    print_status "Building TypeScript..."
    
    if [ -f "tsconfig.json" ]; then
        npm run build || npx tsc
        print_success "TypeScript build completed"
    else
        print_warning "TypeScript configuration not found"
    fi
}

# Main setup function
main() {
    echo ""
    print_status "Starting Appium2 Framework Setup..."
    echo ""
    
    # System checks
    check_node
    check_java
    check_android_sdk
    check_xcode
    
    echo ""
    
    # Framework setup
    install_dependencies
    install_appium
    install_drivers
    install_appium_doctor
    
    echo ""
    
    # Configuration setup
    setup_environment
    create_directories
    build_typescript
    
    echo ""
    
    # Final diagnostics
    run_diagnostics
    
    echo ""
    print_success "🎉 Appium2 Framework setup completed!"
    echo ""
    print_status "Next steps:"
    echo "  1. Update .env file with your app configuration"
    echo "  2. Place your app files in apps/android/ or apps/ios/"
    echo "  3. Update test files with your app-specific selectors"
    echo "  4. Run tests with: npm run test:android or npm run test:ios"
    echo ""
    print_status "Available commands:"
    echo "  npm run test:android    - Run Android tests"
    echo "  npm run test:ios        - Run iOS tests" 
    echo "  npm run test:all        - Run all tests"
    echo "  npm run start:appium    - Start Appium server"
    echo "  npm run build           - Build TypeScript"
    echo "  npm run lint            - Run ESLint"
    echo ""
}

# Run main function
main
