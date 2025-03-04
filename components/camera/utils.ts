import { Skia, SkPaint } from '@shopify/react-native-skia'
import { Tensor, TensorflowModel } from 'react-native-fast-tflite'
import { DrawableFrame } from 'react-native-vision-camera'

type Keypoint = {
  part: string
  x: number
  y: number
  confidence: number
}

type BodyPartsArray = Keypoint[]

const bodyParts = [
  'nose',
  'left_eye',
  'right_eye',
  'left_ear',
  'right_ear',
  'left_shoulder',
  'right_shoulder',
  'left_elbow',
  'right_elbow',
  'left_wrist',
  'right_wrist',
  'left_hip',
  'right_hip',
  'left_knee',
  'right_knee',
  'left_ankle',
  'right_ankle',
]

function tensorToString(tensor: Tensor): string {
  return `\n  - ${tensor.dataType} ${tensor.name}[${tensor.shape}]`
}

export function modelToString(model: TensorflowModel): string {
  return (
    `TFLite Model (${model.delegate}):\n` +
    `- Inputs: ${model.inputs.map(tensorToString).join('')}\n` +
    `- Outputs: ${model.outputs.map(tensorToString).join('')}`
  )
}

export function parseKeypoints(
  keypointsObj: any,
  width: number,
  height: number
): BodyPartsArray {
  'worklet'
  const result: BodyPartsArray = []

  for (let i = 0; i < bodyParts.length; i++) {
    const part = bodyParts[i]
    const y = keypointsObj[(i * 3).toString()]
    const x = keypointsObj[(i * 3 + 1).toString()]
    const confidence = keypointsObj[(i * 3 + 2).toString()]

    if (y !== undefined && x !== undefined && confidence !== undefined) {
      result.push({
        part,
        x: x * width,
        y: y * height,
        confidence,
      })
    }
  }

  return result
}

export function drawKeypointsToCanvas(
  keypoints: Keypoint[],
  paint: SkPaint,
  frame: DrawableFrame
) {
  'worklet'
  for (const part of keypoints) {
    const square = Skia.XYWHRect(part.x, part.y, 50, 50)
    frame.drawRect(square, paint)
  }
}