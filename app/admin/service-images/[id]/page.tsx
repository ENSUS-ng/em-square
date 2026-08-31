"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ImagePlus, Trash2 } from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"

type ServiceItem = {
  _id: string
  heading: string
  about: string
  type: "media" | "marketing"
  images?: string[]
}

async function updateServiceImages(serviceId: string, images: string[]) {
  const response = await fetch(`/api/services/${serviceId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ images }),
  })

  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(payload.error || "Failed to update service images")
  }

  return payload.data as ServiceItem
}

export default function ServiceImageManagerPage() {
  const params = useParams<{ id: string }>()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const serviceId = params?.id

  const [service, setService] = useState<ServiceItem | null>(null)
  const [images, setImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!serviceId) return

    const loadService = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/services/${serviceId}`)
        const payload = await response.json()

        if (!response.ok || !payload.success) {
          throw new Error(payload.error || "Service not found")
        }

        const nextService = payload.data as ServiceItem
        setService(nextService)
        setImages(Array.isArray(nextService.images) ? nextService.images.filter(Boolean) : [])
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Failed to load service")
      } finally {
        setIsLoading(false)
      }
    }

    void loadService()
  }, [serviceId])

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !serviceId) return

    try {
      setIsUploading(true)
      setError(null)

      const formData = new FormData()
      formData.append("file", file)

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const uploadPayload = await uploadResponse.json().catch(() => ({}))
      if (!uploadResponse.ok) {
        throw new Error(uploadPayload.error || "Image upload failed")
      }

      const nextImages = [...images, uploadPayload.url]
      setIsSaving(true)
      const updatedService = await updateServiceImages(serviceId, nextImages)
      setImages(
        Array.isArray(updatedService.images) ? updatedService.images.filter(Boolean) : nextImages,
      )
      setService(updatedService)
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Image upload failed")
    } finally {
      setIsUploading(false)
      setIsSaving(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const removeImage = async (imageToRemove: string) => {
    if (!serviceId) return

    try {
      setIsSaving(true)
      setError(null)

      const nextImages = images.filter((image) => image !== imageToRemove)
      const updatedService = await updateServiceImages(serviceId, nextImages)
      setImages(
        Array.isArray(updatedService.images) ? updatedService.images.filter(Boolean) : nextImages,
      )
      setService(updatedService)
    } catch (removeError) {
      setError(removeError instanceof Error ? removeError.message : "Failed to remove image")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0e0b1d] px-4 py-10 text-white">
        <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-4 text-sm text-slate-300">
          Loading service...
        </div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0e0b1d] px-4 py-10 text-white">
        <div className="max-w-md rounded-4xl border border-rose-400/30 bg-rose-500/10 p-6 text-center text-sm text-rose-200">
          {error || "Service not found."}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(124,15,255,0.24),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,168,15,0.16),transparent_24%),#0e0b1d] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2.5rem] border border-white/10 bg-white/6 p-8 backdrop-blur-xl sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-purple">Service images</p>
              <h1 className="mt-2 text-3xl font-semibold text-gray-700 sm:text-4xl">
                {service.heading}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">{service.about}</p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/admin/service-images"
                className="inline-flex items-center gap-2 rounded-full border border-gray-700 bg-white px-4 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-100"
              >
                <ArrowLeft size={16} /> Back
              </Link>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading || isSaving}
                className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <ImagePlus size={16} />
                {isUploading ? "Uploading..." : "Add image"}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </div>
          </div>

          {error ? (
            <div className="mt-6 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              {error}
            </div>
          ) : null}

          <div className="mt-8">
            {images.length === 0 ? (
              <div className="rounded-4xl border border-dashed border-white/15 bg-white/5 p-10 text-center">
                <p className="text-lg font-medium text-white">No images added yet</p>
                <p className="mt-2 text-sm text-slate-300">
                  Use the add image button above to upload the first visual for this service.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {images.map((image:any, index:number) => (
                  <div
                    key={`${image}-${index}`}
                    className="overflow-hidden rounded-4xl border border-white/10 bg-white/5 shadow-sm"
                  >
                    <div className="relative aspect-4/3 w-full overflow-hidden">
                      <Image
                        src={image}
                        alt={`${service.heading} image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="text-xs uppercase tracking-[0.2em] text-slate-300">
                        Image {index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => void removeImage(image)}
                        disabled={isSaving}
                        className="inline-flex items-center gap-2 rounded-full border border-rose-400/40 bg-rose-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-rose-500/60 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
