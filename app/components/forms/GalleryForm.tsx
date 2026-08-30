"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export function GalleryForm() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [status, setStatus] = useState("")
  const [uploading, setUploading] = useState(false)

  async function uploadImages(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || [])
    if (!files.length) return
    setUploading(true)
    try {
      const urls = await Promise.all(
        files.map(async (file) => {
          const body = new FormData()
          body.append("file", file)
          const response = await fetch("/api/upload", { method: "POST", body })
          if (!response.ok) throw new Error("Upload failed")
          const result = await response.json()
          return result.url as string
        }),
      )
      setImages((current) => [...current, ...urls])
    } catch {
      setStatus("One or more images could not be uploaded.")
    } finally {
      setUploading(false)
    }
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setStatus("")
    const response = await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, images }),
    })
    if (!response.ok) {
      setStatus("Add a title, description, and at least one image.")
      return
    }
    setTitle("")
    setDescription("")
    setImages([])
    setStatus("Gallery section published.")
    router.refresh()
  }

  return (
    <form
      onSubmit={submit}
      className="grid w-full max-w-full gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6"
    >
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-brand-gold">Gallery section</p>
        <h2 className="mt-2 text-2xl font-semibold">Curate a new collection</h2>
      </div>
      <input
        required
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Section title"
        className="w-full max-w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-brand-purple"
      />
      <textarea
        required
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="What happened here?"
        rows={3}
        className="w-full max-w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-brand-purple"
      />
      <label className="block w-full max-w-full cursor-pointer rounded-xl border border-dashed border-white/80 bg-black/10 px-4 py-5 text-sm text-slate-300">
        {uploading ? "Uploading..." : "Click to upload images from your gallery"}
        <input
          multiple
          type="file"
          accept="image/*"
          onChange={uploadImages}
          className="mt-3 block w-full max-w-full text-xs"
        />
      </label>
      {images.length > 0 && (
        <p className="text-sm text-brand-purple">
          {images.length} image{images.length === 1 ? "" : "s"} ready to publish.
        </p>
      )}
      <button
        disabled={uploading}
        className="rounded-xl btn-gradient px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
      >
        Publish section
      </button>
      {status && <p className="text-sm text-slate-300">{status}</p>}
    </form>
  )
}
