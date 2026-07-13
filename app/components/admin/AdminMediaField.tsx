"use client"

import Image from "next/image"
import { useRef,useEffect } from "react"

import { useMediaUploader } from "@/app/hooks/useMediaUploader"

type Props = {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  accept?: string
}

export function AdminMediaField({
  label,
  value,
  onChange,
  placeholder,
  accept = "image/*",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { isUploading, previewUrl, setPreviewUrl, uploadMedia, uploadError } =
    useMediaUploader(value)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const uploadedUrl = await uploadMedia(file)
      onChange(uploadedUrl)
      setPreviewUrl(uploadedUrl)
    } catch (error) {
      console.error(error)
    }
  }
//   if value change make file to have chosen nothing
useEffect(() => {
  if (value !==previewUrl && inputRef.current) {
    inputRef.current.value = ""
    setPreviewUrl('')
  }
}, [value])

  return (
    <div className="space-y-3">
      <label className="flex flex-col">
        <span className="mb-1 text-sm text-slate-300">{label}</span>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="rounded-xl border border-white/10 bg-transparent px-4 py-3 text-sm text-white file:mr-3 file:rounded-full file:border-0 file:bg-brand-purple/20 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-brand-gold"
        />
      </label>

      {previewUrl ? (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-2">
          <Image
            src={previewUrl}
            alt="Upload preview"
            width={400}
            height={240}
            className="h-48 w-full rounded-xl object-cover"
          />
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-xl border border-white/10 bg-transparent px-4 py-3 text-white outline-none"
          placeholder={placeholder}
        />
        {isUploading ? <span className="text-sm text-brand-gold">Uploading...</span> : null}
        {uploadError ? <span className="text-sm text-rose-400">{uploadError}</span> : null}
      </div>
    </div>
  )
}
