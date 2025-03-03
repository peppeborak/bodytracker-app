/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
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
} from 'react-native-vision-camera'

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

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'
    console.log(`Frame: ${frame.width}x${frame.height} (${frame.pixelFormat})`)
  }, [])

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
