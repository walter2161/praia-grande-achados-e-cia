import React, { useState, useRef } from 'react';
import { Button } from './ui/button';
import { processImage, saveImageToSheets } from '@/utils/imageProcessor';
import { Image, Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploaderProps {
  onImageSaved?: (imageId: string) => void;
  listingId?: string;
  maxImages?: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSaved,
  listingId = 'temp',
  maxImages = 6,
}) => {
  const [images, setImages] = useState<{ file: File; preview: string; uploading: boolean }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    
    const newFiles = Array.from(event.target.files);
    
    // Check if we would exceed max images
    if (images.length + newFiles.length > maxImages) {
      toast({
        title: 'Limite de imagens excedido',
        description: `Você pode adicionar no máximo ${maxImages} imagens.`,
        variant: 'destructive',
      });
      return;
    }

    // Process each file
    const newImages = await Promise.all(
      newFiles.map(async (file) => {
        // Create a URL for preview
        const preview = URL.createObjectURL(file);
        
        return {
          file,
          preview,
          uploading: false,
        };
      })
    );

    setImages((prev) => [...prev, ...newImages]);
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev];
      
      // Revoke the object URL to prevent memory leaks
      URL.revokeObjectURL(newImages[index].preview);
      
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleProcessAndUpload = async (index: number) => {
    try {
      const image = images[index];
      
      // Mark image as uploading
      setImages((prev) => {
        const newImages = [...prev];
        newImages[index] = { ...newImages[index], uploading: true };
        return newImages;
      });

      // Process the image (resize, optimize)
      const base64Image = await processImage(image.file);
      
      // Save to Google Sheets
      const result = await saveImageToSheets(
        base64Image,
        image.file.name,
        listingId
      );

      if (result.success && result.imageId) {
        // Notify parent component
        if (onImageSaved) {
          onImageSaved(result.imageId);
        }
        
        // Update state
        setImages((prev) => {
          const newImages = [...prev];
          newImages[index] = { ...newImages[index], uploading: false };
          return newImages;
        });
        
        toast({
          title: 'Sucesso!',
          description: 'Imagem processada e salva com sucesso.',
        });
      } else {
        throw new Error(result.message || 'Erro desconhecido ao salvar imagem');
      }
    } catch (error) {
      setImages((prev) => {
        const newImages = [...prev];
        newImages[index] = { ...newImages[index], uploading: false };
        return newImages;
      });
      
      toast({
        title: 'Erro',
        description: error instanceof Error ? error.message : 'Erro ao processar imagem',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
        {/* Existing images */}
        {images.map((image, index) => (
          <div 
            key={index} 
            className="relative aspect-square border rounded-md overflow-hidden flex items-center justify-center bg-muted"
          >
            <img
              src={image.preview}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 right-0 p-1">
              <Button
                size="icon"
                variant="destructive"
                className="w-6 h-6"
                onClick={() => handleRemoveImage(index)}
                disabled={image.uploading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {!image.uploading ? (
              <Button
                className="absolute bottom-2 left-1/2 -translate-x-1/2"
                size="sm"
                onClick={() => handleProcessAndUpload(index)}
              >
                Processar
              </Button>
            ) : (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
              </div>
            )}
          </div>
        ))}

        {/* Upload button */}
        {images.length < maxImages && (
          <div
            className="aspect-square border-2 border-dashed rounded-md flex flex-col items-center justify-center bg-muted cursor-pointer hover:bg-muted/80 transition"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Adicionar foto</p>
          </div>
        )}
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        accept="image/*"
        multiple
      />
      
      <div className="text-xs text-muted-foreground">
        Imagens serão automaticamente redimensionadas para 350x350px e otimizadas para qualidade web.
      </div>
    </div>
  );
};

export default ImageUploader;
