/* eslint-disable @typescript-eslint/no-var-requires */
import { Skia, Canvas, Paint, Color } from '@shopify/react-native-skia'
import * as React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import {
  Tensor,
  TensorflowModel,
  useTensorflowModel,
} from 'react-native-fast-tflite'
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
  useSkiaFrameProcessor,
} from 'react-native-vision-camera'
import { useResizePlugin } from 'vision-camera-resize-plugin'

function tensorToString(tensor: Tensor): string {
  return `\n  - ${tensor.dataType} ${tensor.name}[${tensor.shape}]`
}
function modelToString(model: TensorflowModel): string {
  return (
    `TFLite Model (${model.delegate}):\n` +
    `- Inputs: ${model.inputs.map(tensorToString).join('')}\n` +
    `- Outputs: ${model.outputs.map(tensorToString).join('')}`
  )
}

export default function Index() {
  const { hasPermission, requestPermission } = useCameraPermission()
  const device = useCameraDevice('back')
  const { width, height } = Dimensions.get('window')

  const model = useTensorflowModel(
    require('../assets/movenet-singlepose-lightning-tflite-int8.tflite')
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
      console.log(keypoints)

      const rect = Skia.XYWHRect(150, 150, 50, 50)
      frame.drawRect(rect, paint)

    },
    [actualModel]
  )

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Camera
        device={device}
        style={StyleSheet.absoluteFill}
        isActive={true}
        frameProcessor={frameProcessor}
      />
    </View>
  )
}
