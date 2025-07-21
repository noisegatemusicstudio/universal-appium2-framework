#!/bin/bash

# Start Appium Server Script
# This script starts the Appium server with optimized settings

set -e

echo "🚀 Starting Appium Server..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Default values
HOST=${APPIUM_HOST:-127.0.0.1}
PORT=${APPIUM_PORT:-4723}
LOG_LEVEL=${APPIUM_LOG_LEVEL:-info}

# Check if Appium is installed
if ! command -v appium &> /dev/null; then
    print_error "Appium is not installed globally"
    print_error "Please run: npm install -g appium"
    exit 1
fi

# Check if port is already in use
check_port() {
    if lsof -i :$PORT &> /dev/null; then
        print_warning "Port $PORT is already in use"
        print_status "Attempting to kill existing process..."
        
        # Find and kill process using the port
        PID=$(lsof -ti :$PORT)
        if [ ! -z "$PID" ]; then
            kill -9 $PID
            sleep 2
            print_success "Killed process $PID using port $PORT"
        fi
    fi
}

# Start Appium server
start_appium() {
    print_status "Starting Appium server on $HOST:$PORT"
    print_status "Log level: $LOG_LEVEL"
    
    # Create logs directory if it doesn't exist
    mkdir -p logs
    
    # Start Appium with optimized settings
    appium \
        --address $HOST \
        --port $PORT \
        --log-level $LOG_LEVEL \
        --log-timestamp \
        --local-timezone \
        --session-override \
        --relaxed-security \
        --log logs/appium-server.log \
        --allow-cors &
    
    APPIUM_PID=$!
    echo $APPIUM_PID > .appium.pid
    
    print_success "Appium server started with PID: $APPIUM_PID"
    print_status "Server logs are being written to: logs/appium-server.log"
    
    # Wait a moment for server to start
    sleep 3
    
    # Check if server is responding
    if curl -s http://$HOST:$PORT/status &> /dev/null; then
        print_success "✅ Appium server is running and responding"
        print_status "Server status: http://$HOST:$PORT/status"
        print_status "Inspector: http://$HOST:$PORT/"
    else
        print_error "❌ Appium server started but not responding"
        print_error "Check logs/appium-server.log for details"
    fi
    
    print_status "Press Ctrl+C to stop the server"
    
    # Wait for the Appium process
    wait $APPIUM_PID
}

# Cleanup function
cleanup() {
    print_status "Stopping Appium server..."
    
    if [ -f .appium.pid ]; then
        PID=$(cat .appium.pid)
        if ps -p $PID > /dev/null 2>&1; then
            kill $PID
            print_success "Appium server stopped"
        fi
        rm -f .appium.pid
    fi
    
    exit 0
}

# Set up signal handling
trap cleanup SIGINT SIGTERM

# Main execution
print_status "Checking environment..."
check_port
start_appium
