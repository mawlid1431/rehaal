import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { galleryApi } from '../../lib/api';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export const GalleryPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const data = await galleryApi.getAll();
      setGalleryImages(data);
    } catch (error) {
      console.error('Failed to fetch gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const hasMore = visibleCount < galleryImages.length;

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-80 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1632782532013-bd3f5f9197db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2MTIyMzEzOHww&ixlib=rb-4.1.0&q=80&w=1080)'
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center text-white z-10"
        >
          <h1 className="text-4xl md:text-5xl mb-4 text-white">Gallery</h1>
          <p className="text-xl text-white/90">Moments from our spiritual journeys</p>
        </motion.div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">Loading gallery...</div>
          ) : galleryImages.length === 0 ? (
            <div className="text-center py-12">No images available yet.</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {galleryImages.slice(0, visibleCount).map((image, index) => (
                  <motion.div
                    key={String(image.id)}
                    initial={{ opacity: 0, y: 60, scale: 0.8, rotateX: -15 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 1.2,
                      delay: (index % 6) * 0.1,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -10,
                      boxShadow: "0 25px 50px rgba(216, 167, 40, 0.3)",
                      transition: { duration: 0.5, ease: "easeOut" }
                    }}
                    className="relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-xl border-2 border-[rgb(216,167,40)]/20 hover:border-[rgb(216,167,40)]/60 transition-all group"
                    onClick={() => setSelectedImage(String(image.id))}
                  >
                    <ImageWithFallback
                      src={image.image_url}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-white text-xl font-semibold mb-2">{image.title}</h3>
                        <p className="text-[rgb(216,167,40)] text-sm">{image.description}</p>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-[rgb(216,167,40)]/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                  </motion.div>
                ))}
              </div>

              {hasMore && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLoadMore}
                    className="bg-gradient-to-r from-[rgb(216,167,40)] to-[rgb(186,137,10)] text-white px-10 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all text-lg"
                  >
                    See More Images
                  </motion.button>
                  <p className="text-muted-foreground mt-4 text-sm">
                    Showing {visibleCount} of {galleryImages.length} images
                  </p>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-[rgb(216,167,40)] transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {galleryImages.find((img) => String(img.id) === selectedImage) && (
                <div>
                  <ImageWithFallback
                    src={galleryImages.find((img) => String(img.id) === selectedImage)!.image_url}
                    alt={galleryImages.find((img) => String(img.id) === selectedImage)!.title}
                    className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                  />
                  <div className="mt-4 text-center">
                    <h3 className="text-white text-xl mb-2">
                      {galleryImages.find((img) => String(img.id) === selectedImage)!.title}
                    </h3>
                    <p className="text-white/70">
                      {galleryImages.find((img) => String(img.id) === selectedImage)!.description}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
