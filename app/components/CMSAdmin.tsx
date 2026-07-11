"use client"

import { useEffect, useState } from "react"

type PageItem = { id: string; title: string; slug: string; content: string }

const STORAGE_KEY = "emsquare_cms"

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

export default function CMSAdmin() {
  const [items, setItems] = useState<PageItem[]>([])
  const [editing, setEditing] = useState<PageItem | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
      else {
        const seed: PageItem[] = [
          {
            id: uid(),
            title: "Demo Post",
            slug: "demo-post",
            content: "This is sample CMS content.",
          },
        ]
        setItems(seed)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seed))
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const create = () => {
    const p: PageItem = { id: uid(), title: "New Page", slug: `page-${uid()}`, content: "" }
    setItems((s) => [p, ...s])
    setEditing(p)
  }

  const remove = (id: string) => {
    setItems((s) => s.filter((i) => i.id !== id))
    if (editing?.id === id) setEditing(null)
  }

  const save = (updated: PageItem) => {
    setItems((s) => s.map((it) => (it.id === updated.id ? updated : it)))
    setEditing(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">CMS (local demo)</h3>
        <div className="flex gap-3">
          <button
            onClick={create}
            className="rounded-md bg-white/5 px-3 py-2 text-sm"
          >
            New page
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          {items.map((it) => (
            <div
              key={it.id}
              className="flex items-start justify-between gap-3 rounded-lg border border-white/8 p-3"
            >
              <div>
                <div className="text-sm font-semibold">{it.title}</div>
                <div className="text-xs text-slate-400">/{it.slug}</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditing(it)}
                  className="rounded-md bg-white/5 px-3 py-1 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => remove(it.id)}
                  className="rounded-md bg-rose-600/20 px-3 py-1 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div>
          {editing ? (
            <Editor
              item={editing}
              onSave={save}
              onCancel={() => setEditing(null)}
            />
          ) : (
            <div className="rounded-lg border border-white/8 p-6 text-sm text-slate-400">
              Select a page to edit.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Editor({
  item,
  onSave,
  onCancel,
}: {
  item: PageItem
  onSave: (p: PageItem) => void
  onCancel: () => void
}) {
  const [title, setTitle] = useState(item.title)
  const [slug, setSlug] = useState(item.slug)
  const [content, setContent] = useState(item.content)

  useEffect(() => {
    setTitle(item.title)
    setSlug(item.slug)
    setContent(item.content)
  }, [item])

  return (
    <div className="space-y-4">
      <label className="flex flex-col">
        <span className="text-xs text-slate-400">Title</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 rounded-md border border-white/10 bg-transparent px-3 py-2 text-white"
        />
      </label>

      <label className="flex flex-col">
        <span className="text-xs text-slate-400">Slug</span>
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="mt-1 rounded-md border border-white/10 bg-transparent px-3 py-2 text-white"
        />
      </label>

      <label className="flex flex-col">
        <span className="text-xs text-slate-400">Content</span>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className="mt-1 rounded-md border border-white/10 bg-transparent px-3 py-2 text-white resize-none"
        />
      </label>

      <div className="flex gap-3">
        <button
          onClick={() => onSave({ ...item, title, slug, content })}
          className="rounded-md btn-gradient px-4 py-2 text-sm text-white"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="rounded-md bg-white/5 px-4 py-2 text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
