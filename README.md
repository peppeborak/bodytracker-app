# Overview solution:


For the this body tracking application, I used react-native-vision-camera to efficiently access the camera stream. This library provided high performance and was highly compatible with a Frame Processor, allowing seamless integration with TensorFlow Lite (TFLite) for real-time body part detection.
To overlay visuals on top of the camera feed, I utilized SkiaFrameProcessor, which enabled smooth and efficient drawing.


# How to setup this app:

Prerequisites
Make sure you have the following installed:

Node.js (Latest LTS recommended)
npm or yarn
React Native CLI
xcode

Iphone 


git clone <your-repo-url>
cd bodytracker-app

npm install

npx expo prebuild

cd ios && pod install 

open bodytracker-app.




# Trade-offs:

react-native-vision-camera vs expo-camera 
I traded **easy-use** for better performance, features like frameprocessor and camera settings



SkiaFrameProcessor vs FrameProcessor 
I traded **stability** for being able to draw on top of the camera.



TensorFlow Lite vs tensorflow-react-native
I traded **potential compatibility issues** for a more modern library instead.



# Quality ensurance
Git
Prettier
Eslint
module based


# Improvements

Und-to-end tests using cypress

Unit-tests with jest

Try different tensorflow model

Add button to toggle drawings

Add drawings betweek the keypoints(skeleton)




























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
