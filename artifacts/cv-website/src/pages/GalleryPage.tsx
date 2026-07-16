import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../lib/api';

interface Photo { filename: string; url: string }

export function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selected, setSelected] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getGallery()
      .then(setPhotos)
      .catch(() => setPhotos([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="px-6 md:px-12 py-20 flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="px-6 md:px-12 py-20 text-center min-h-[50vh] flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground text-lg">No photos yet.</p>
        <p className="text-sm text-muted-foreground/60">Upload photos via the admin panel.</p>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-12 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-3">
          <div className="h-[1px] w-10 bg-primary" />
          <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">Gallery</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-serif">Photo Gallery</h2>
      </div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {photos.map((photo, i) => (
          <motion.div
            key={photo.filename}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="aspect-square rounded-xl overflow-hidden border border-white/8 cursor-pointer group relative"
            onClick={() => setSelected(photo)}
          >
            <img
              src={photo.url}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
          onClick={() => setSelected(null)}
        >
          <button className="absolute top-4 right-6 text-white/60 hover:text-white text-3xl">×</button>
          <img
            src={selected.url}
            alt=""
            className="max-w-full max-h-[90vh] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
