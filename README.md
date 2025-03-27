
# AnalyticsSDK Documentation

## Introduction

The **AnalyticsSDK** provides seamless tracking and real-time logging for Android applications. Designed for minimal integration effort, this SDK enables developers to collect vital user analytics without writing extra tracking code.

### Key Features

- **User Analytics:** Track total users, daily logins, session duration, and retention rates.
- **Event Logging:** Monitor key interactions like button clicks, page views, and feature usage.
- **Crash & Error Tracking:** Detect application crashes and API request failures in real-time.
- **Geolocation Analytics:** Log geographical data for improved regional insights.
- **Secure Data Handling:** Stored logs are encrypted and efficiently managed.
- **App Rating Analytics:** Collect and analyze user feedback through ratings and comments.
- **JitPack Compatible:** Easily integrate via JitPack with minimal configuration.

![Analytics SDK Overview](https://github.com/user-attachments/assets/481fdcad-caf8-412a-8090-3d500d91ec4b)
![Analytics SDK Graphic](https://github.com/user-attachments/assets/2aaca6d7-6607-4acf-89f6-39a9c61bfd64)

## Installation

To integrate AnalyticsSDK into your Android project using JitPack, add the following to your Gradle configuration.

### Step 1: Add the JitPack Repository

```groovy
repositories {
    maven { url 'https://jitpack.io' }
}
```

### Step 2: Add the AnalyticsSDK Dependency

```groovy
dependencies {
    implementation 'com.github.YourRepo:AnalyticsSDK:1.0.14'
}
```

## Getting Started

Integrate and start using AnalyticsSDK with just a few simple steps.

### 1️⃣ Initialize the SDK

```java
public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        // Initialize AnalyticsSDK
        AnalyticsSDK.initialize(this);
    }
}
```

### 2️⃣ Required Permissions

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <application android:usesCleartextTraffic="true">
        <!-- Other configurations -->
    </application>
</manifest>
```

### 3️⃣ Log Events

```java
AnalyticsSDK.createLog("ButtonClicked", "User Clicked On Button");
AnalyticsSDK.createLog("UserLogin", "User logged into the app");
AnalyticsSDK.createLog("Crash", "App crashed due to NullPointerException");
AnalyticsSDK.createLog("APIRequestFailed", "Failed to fetch user data");
AnalyticsSDK.createLog("FeatureUsed", "User accessed analytics dashboard");
AnalyticsSDK.createLog("PageViewed", "User viewed the settings page");
AnalyticsSDK.createLog("DataExport", "User exported activity data");
```

### 4️⃣ App Rating Integration

```java
AnalyticsSDK.showRatingDialog(this);
```

![Rating Dialog](https://github.com/user-attachments/assets/e9d23026-d259-4429-a2c7-28ed9690b9d5)

## API Reference

The `AnalyticsSDK` class provides the following key methods:

- **initialize(Context context)** – Initializes the SDK.
- **createLog(String event, String message)** – Logs a custom event with a message.
- **showRatingDialog(Context context)** – Displays the app rating dialog.

## Examples

Below is an example demonstrating how to integrate AnalyticsSDK in an Android activity:

```java
public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        // Initialize AnalyticsSDK
        AnalyticsSDK.initialize(this);
        
        // Log an event
        AnalyticsSDK.createLog("ButtonClicked", "User clicked the button");
    }
}
```

![Web Analytics Screenshot](https://github.com/user-attachments/assets/481fdcad-caf8-412a-8090-3d500d91ec4b)
![Analytics Dashboard](https://github.com/user-attachments/assets/bd6608cf-6c12-460f-a0f4-603dffc83abe)
![User Analytics](https://github.com/user-attachments/assets/adc9001a-3710-4a69-87e9-23e2b003e578)
