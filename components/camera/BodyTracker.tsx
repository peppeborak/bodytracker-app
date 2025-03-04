/* eslint-disable @typescript-eslint/no-var-requires */
import { Skia } from '@shopify/react-native-skia'
import * as React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { useTensorflowModel } from 'react-native-fast-tflite'
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useSkiaFrameProcessor,
} from 'react-native-vision-camera'
import { useResizePlugin } from 'vision-camera-resize-plugin'
import { drawKeypointsToCanvas, modelToString, parseKeypoints } from './utils'

export default function BodyTracker() {
  const { hasPermission, requestPermission } = useCameraPermission()
  const device = useCameraDevice('front')
  const { width, height } = Dimensions.get('window')

  const model = useTensorflowModel(
    require('../../assets/movenet-singlepose-lightning-tflite-int8.tflite')
  )
  const actualModel = model.state === 'loaded' ? model.model : undefined

  React.useEffect(() => {
    if (actualModel == null) return
    console.log(`Model loaded! Shape:\n${modelToString(actualModel)}]`)
  }, [actualModel])

  React.useEffect(() => {
    requestPermission()
  }, [requestPermission])

  if (!hasPermission) return
  if (device == null) return

  const { resize } = useResizePlugin()
  const paint = Skia.Paint()
  paint.setColor(Skia.Color('red'))

  const frameProcessor = useSkiaFrameProcessor(
    (frame) => {
      'worklet'
      if (actualModel == null) {
        // model is still loading...
        return
      }

      frame.render()

      const resized = resize(frame, {
        scale: {
          width: 192,
          height: 192,
        },
        pixelFormat: 'rgb',
        dataType: 'uint8',
      })
      const result = actualModel.runSync([resized])
      const keypoints = result[0]

      const parsedKeypoints = parseKeypoints(keypoints, width, height)
      drawKeypointsToCanvas(parsedKeypoints, paint, frame)
      
    },
    [actualModel]
  )

  return (
    <View style={styles.container}>
      <Camera
        device={device}
        style={StyleSheet.absoluteFill}
        isActive={true}
        frameProcessor={frameProcessor}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})
