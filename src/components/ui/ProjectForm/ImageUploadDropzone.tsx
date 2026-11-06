"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { memo, useRef, useState } from "react";
import { LuImagePlus, LuRefreshCw, LuTrash2 } from "react-icons/lu";

interface ImageUploadDropzoneProps {
  preview: string | null;
  onSelectImage: (file: File) => void;
  onRemoveImage: () => void;
}

const ImageUploadDropzone = ({
  preview,
  onSelectImage,
  onRemoveImage,
}: ImageUploadDropzoneProps): React.JSX.Element => {
  const t = useTranslations("admin.addProject");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isDataOrBlob =
    Boolean(preview) &&
    (preview!.startsWith("data:") || preview!.startsWith("blob:"));

  return (
    <div className="w-full">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onSelectImage(e.dataTransfer.files[0]);
          }
        }}
        className={`relative w-full aspect-[16/9] max-h-64 rounded-xl border-2 border-dashed transition-colors duration-150 overflow-hidden flex flex-col items-center justify-center ${
          isDragging
            ? "border-orange-500 bg-orange-500/10"
            : preview
              ? "border-white/10 bg-black/50"
              : "border-white/15 hover:border-orange-500/60 bg-black/40 hover:bg-black/60"
        }`}
      >
        {preview ? (
          <>
            <Image
              fill
              src={preview}
              alt="Preview"
              unoptimized={isDataOrBlob}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-150 flex items-end justify-between p-4 z-20">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-lg bg-gray-light/90 hover:bg-gray-800 text-gray-soft hover:text-white text-xs font-medium flex items-center gap-1.5 border border-white/10 transition-colors"
              >
                <LuRefreshCw size={14} className="text-orange-400" />
                <span>{t("changeImage")}</span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveImage();
                }}
                className="px-3 py-1.5 rounded-lg bg-red-500/80 hover:bg-red-600 text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <LuTrash2 size={14} />
                <span>{t("removeImage")}</span>
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center px-4 pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-gray-800 border border-white/10 flex items-center justify-center text-orange-400 mb-3">
              <LuImagePlus size={22} />
            </div>
            <span className="text-sm font-medium text-gray-soft">
              {t("imageUploadLabel")}
            </span>
            <span className="text-xs text-gray-dark mt-1">
              {t("imageUploadHint")}
            </span>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          aria-label={t("imageUploadLabel")}
          className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer ${
            preview ? "pointer-events-none" : "z-10"
          }`}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              onSelectImage(e.target.files[0]);
            }
          }}
        />
      </div>
    </div>
  );
};

export default memo(ImageUploadDropzone);
