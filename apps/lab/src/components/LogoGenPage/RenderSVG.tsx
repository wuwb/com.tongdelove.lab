import { forwardRef, useEffect, useRef, useState, memo } from 'react'

export const RenderSVG = memo(
  forwardRef(
    (
      {
        formValue,
        rotatePoint,
      }: {
        formValue: {
          text: string
          size: number
          radius: number
          backgroundColor: string
          fontFamily: string
          fontWeight: number
          fontSize?: number
          fontRotate: number
          textColor: string
          textStrokeColor: string
          textStrokeWidth: number
          fineTuneVerticalPosition: number
          fineTuneHorizontalPosition: number
        }
        rotatePoint?: {
          x: number
          y: number
        }
      },
      ref?: any
    ) => {
      const textRef = useRef<SVGTextElement>(null)
      const [fontSize, setFontSize] = useState(formValue.fontSize)

      const fixFontSize = (text: string, size: number) => {
        if (!textRef.current) {
          return
        }
        const isAllEnglish = /^[A-Za-z0-9\s]+$/.test(text)
        const charCount = text.length

        let fontSize
        if (charCount <= 2) {
          fontSize = size * 0.8
        } else if (isAllEnglish) {
          fontSize = size * 0.75
        } else {
          fontSize = size * 0.6
        }

        const maxWidth = size * 0.95
        const maxHeight = size * 0.95
        const scaleFactor = isAllEnglish ? 0.98 : 0.95

        let iterations = 0
        const maxIterations = 50

        while (fontSize > 1 && iterations < maxIterations) {
          const bbox = textRef.current.getBBox()
          if (bbox.width <= maxWidth && bbox.height <= maxHeight) {
            break
          }
          fontSize *= scaleFactor
          iterations++
        }
        return fontSize
      }

      useEffect(() => {
        const fontSize = fixFontSize(formValue.text, formValue.size)
        setFontSize(fontSize)
      }, [formValue])

      const handleVisibilityChange = () => {
        const fontSize = fixFontSize(formValue.text, formValue.size)
        setFontSize(fontSize)
      }

      // useEffect(() => {

      //   document.addEventListener('visibilitychange', handleVisibilityChange)

      //   return () => {
      //     document.removeEventListener('visibilitychange', handleVisibilityChange)
      //   }
      // }, [])

      return (
        <svg
          ref={ref?.svgRef}
          viewBox={`0 0 ${formValue.size} ${formValue.size}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width={formValue.size}
            height={formValue.size}
            fill={formValue.backgroundColor}
            rx={formValue.radius}
            ry={formValue.radius}
          ></rect>
          <text
            ref={ref?.textRef ?? textRef}
            x="50%"
            y="50%"
            dominantBaseline="central"
            textAnchor="middle"
            fontFamily={formValue.fontFamily}
            fontWeight={formValue.fontWeight}
            fill={formValue.textColor}
            fontSize={formValue.fontSize ?? fontSize}
            transform={`rotate(${formValue.fontRotate}, ${rotatePoint?.x ?? 0}, ${rotatePoint?.y ?? 0})`}
            dx={formValue.fineTuneHorizontalPosition * 512}
            dy={formValue.fineTuneVerticalPosition * 512}
            stroke={formValue.textStrokeColor}
            strokeWidth={formValue.textStrokeWidth}
          >
            {formValue.text}
          </text>
        </svg>
      )
    }
  )
)

RenderSVG.displayName = 'RenderSVG'
