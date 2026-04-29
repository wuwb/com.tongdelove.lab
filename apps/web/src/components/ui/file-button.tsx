'use client'

import * as React from 'react'
import { Button } from './button'
import { Input } from './input'
import { LuFile, LuUpload, LuX } from 'react-icons/lu'

export interface FileUploadRootProps extends React.ComponentProps<'label'> {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export const FileUploadRoot = React.forwardRef<
  HTMLLabelElement,
  FileUploadRootProps
>(function FileUploadRoot(props, ref) {
  const { children, inputProps, className, ...rest } = props
  return (
    <label ref={ref} className={className} {...rest}>
      <input type="file" className="sr-only" {...inputProps} />
      {children}
    </label>
  )
})

export interface FileUploadDropzoneProps extends React.ComponentProps<'div'> {
  label: React.ReactNode
  description?: React.ReactNode
}

export const FileUploadDropzone = React.forwardRef<
  HTMLDivElement,
  FileUploadDropzoneProps
>(function FileUploadDropzone(props, ref) {
  const { label, description, className, ...rest } = props
  return (
    <div
      ref={ref}
      className={`border-muted-foreground/20 hover:border-muted-foreground/40 flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 transition-colors ${className}`}
      {...rest}
    >
      <LuUpload className="text-muted-foreground h-8 w-8" />
      <div className="text-center">
        <div>{label}</div>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </div>
    </div>
  )
})

interface FileUploadItemProps {
  file: File
  showSize?: boolean
  clearable?: boolean
  onRemove?: () => void
}

const FileUploadItem = React.forwardRef<HTMLLIElement, FileUploadItemProps>(
  function FileUploadItem(props, ref) {
    const { file, showSize, clearable, onRemove } = props
    const formatSize = (bytes: number) => {
      if (bytes < 1024) return bytes + ' B'
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
      return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
    }
    return (
      <li ref={ref} className="bg-muted flex items-center gap-3 rounded-md p-2">
        <LuFile className="text-muted-foreground h-5 w-5" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{file.name}</p>
          {showSize && (
            <p className="text-muted-foreground text-xs">
              {formatSize(file.size)}
            </p>
          )}
        </div>
        {clearable && (
          <Button variant="ghost" size="icon" onClick={onRemove}>
            <LuX className="h-4 w-4" />
          </Button>
        )}
      </li>
    )
  }
)

interface FileUploadListProps extends React.ComponentProps<'ul'> {
  files?: File[]
  showSize?: boolean
  clearable?: boolean
  onRemove?: (file: File) => void
}

export const FileUploadList = React.forwardRef<
  HTMLUListElement,
  FileUploadListProps
>(function FileUploadList(props, ref) {
  const {
    files = [],
    showSize,
    clearable,
    onRemove,
    className,
    ...rest
  } = props
  if (files.length === 0) return null
  return (
    <ul ref={ref} className={`flex flex-col gap-2 ${className}`} {...rest}>
      {files.map((file) => (
        <FileUploadItem
          key={file.name + file.size}
          file={file}
          showSize={showSize}
          clearable={clearable}
          onRemove={() => onRemove?.(file)}
        />
      ))}
    </ul>
  )
})

interface FileInputProps extends React.ComponentProps<typeof Button> {
  placeholder?: React.ReactNode
  onFileChange?: (files: FileList | null) => void
}

export const FileInput = React.forwardRef<HTMLButtonElement, FileInputProps>(
  function FileInput(props, ref) {
    const {
      placeholder = 'Select file(s)',
      onFileChange,
      className,
      ...rest
    } = props
    const [fileName, setFileName] = React.useState<string>('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) {
        const firstFile = files[0]
        setFileName(
          files.length === 1 && firstFile
            ? firstFile.name
            : `${files.length} files`
        )
      } else {
        setFileName('')
      }
      onFileChange?.(files)
    }

    return (
      <FileUploadRoot
        className="inline-flex"
        inputProps={{ type: 'file', onChange: handleChange }}
      >
        <Button ref={ref} variant="outline" className={className} {...rest}>
          <LuUpload className="mr-2 h-4 w-4" />
          {fileName || placeholder}
        </Button>
      </FileUploadRoot>
    )
  }
)
