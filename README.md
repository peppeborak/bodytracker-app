# Body Tracker App 🧑‍💻📱

## Overview Solution:

For the this body tracking application, I used react-native-vision-camera to efficiently access the camera stream. This library provided high performance and was highly compatible with a Frame Processor, allowing seamless integration with TensorFlow Lite (TFLite) for real-time body part detection.

To overlay visuals on top of the camera feed, I utilized SkiaFrameProcessor, which enabled smooth and efficient drawing.


## Trade-offs ⚖️:

- **react-native-vision-camera vs expo-camera**  
  I traded **ease of use** for better performance and advanced features like frame processors and camera settings.

- **SkiaFrameProcessor vs FrameProcessor**  
  I traded **stability** for the ability to draw directly on top of the camera feed.

- **TensorFlow Lite vs tensorflow-react-native**  
  I traded **potential compatibility issues** for a more modern, optimized library (TensorFlow Lite) that provides better performance and compatibility.

## Quality Assurance ✅:

- Git
- Prettier 
- ESLint
- Modular-based 

## Planned Improvements 🔧:

- End-to-end tests using **Cypress** 
- Unit tests with **Jest** 
- Try out different **TensorFlow models** for enhanced accuracy 
- Add a button to toggle drawing overlays on the camera feed 
- Improve drawing of skeletons and keypoints between them 

## How to Setup This App 🔧:

### Prerequisites 📝
Make sure you have the following:

- Node.js (Latest LTS recommended) 
- npm
- React Native CLI 
- Xcode 
- Apple Developer Account (A free account is fine) 
- Mac
- Iphone

This only works for ios for now.

### Setup Instructions:

1. Clone the repository:
   ```bash
   git clone https://github.com/peppeborak/bodytracker-app
   cd bodytracker-app
   ```

   ```bash
   npm install
   npx expo prebuild
   ```
   ```bash
   cd ios && pod install
   open bodytrackerapp.xcworkspace
   cd ..
   ```
   ```bash
   npx expo start --clear --dev-client
   ```

### Configure Signing & Capabilities in Xcode:

1. **Apple Developer Account**: Ensure you’re signed in with your Apple Developer account in Xcode. Navigate to **Xcode > Preferences > Accounts**.

2. **Signing & Capabilities**: In the "Signing & Capabilities" tab of your project settings, make sure the correct development team is selected. If you’re using a free Apple Developer account, you’ll need to select **"Automatically manage signing"**.

3. **Device Selection**: Choose your physical device from the top dropdown menu.

4. Press **Cmd + R** or click the play button to build and run the app on your phone 📱.

The app should now be running on your device! 🎉


---
---
---
---
---
---
---
---
---
---
---
---


























# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
