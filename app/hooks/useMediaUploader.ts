"use client"

import axios from "axios"
import { useCallback, useState } from "react"

export function useMediaUploader(initialPreview = "") {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState(initialPreview)

  const uploadMedia = useCallback(async (file: File) => {
    setIsUploading(true)
    setUploadError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const { data } = await axios.post("/api/upload", formData)

      setPreviewUrl(data.url)

      return data.url as string
    } catch (error) {
      const message =
        axios.isAxiosError(error)
          ? error.response?.data?.error || error.message
          : error instanceof Error
            ? error.message
            : "Image upload failed"

      setUploadError(message)
      throw new Error(message)
    } finally {
      setIsUploading(false)
    }
  }, [])

  return {
    isUploading,
    uploadError,
    previewUrl,
    setPreviewUrl,
    uploadMedia,
  }
}