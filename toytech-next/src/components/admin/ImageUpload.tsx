"use client";

import React, { useRef, useState } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { createSupabaseBrowserClient } from "../../lib/supabase/browser";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
}

export function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createSupabaseBrowserClient();

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setError(null);

      const file = event.target.files?.[0];
      if (!file) return;

      // Create a unique file name
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()
        .toString(36)
        .substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `service-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("services")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("services").getPublicUrl(filePath);

      onChange(publicUrl);
    } catch (err) {
      console.error("Error uploading image:", err);
      setError("Failed to upload image. Please ensure the 'services' bucket exists and is public.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = () => {
    onChange("");
  };

  return (
    <div className="space-y-2">
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </span>

      <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-800 bg-zinc-950 p-4 transition-colors hover:border-zinc-700">
        {value ? (
          <div className="relative w-full overflow-hidden rounded-xl">
             {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Preview"
              className="aspect-video w-full object-cover"
            />
            <button
              onClick={removeImage}
              className="absolute right-2 top-2 rounded-full bg-red-600 p-1.5 text-white shadow-lg transition-transform hover:scale-110"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex w-full cursor-pointer flex-col items-center gap-3 py-6"
          >
            <div className="rounded-full bg-zinc-900 p-4 text-zinc-500">
              {uploading ? (
                <Loader2 className="h-8 w-8 animate-spin text-red-500" />
              ) : (
                <Upload className="h-8 w-8" />
              )}
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-zinc-300">
                {uploading ? "Uploading..." : "Click to upload image"}
              </p>
              <p className="text-xs text-zinc-500">PNG, JPG or WebP up to 5MB</p>
            </div>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleUpload}
          accept="image/*"
          className="hidden"
          disabled={uploading}
        />
      </div>

      {error && (
        <div className="text-xs font-medium text-red-400">
          {error}
        </div>
      )}
      
      {value && !value.includes('supabase') && (
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <ImageIcon className="h-3 w-3" />
          <span>External image URL detected</span>
        </div>
      )}
    </div>
  );
}
