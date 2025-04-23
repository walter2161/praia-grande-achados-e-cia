
/**
 * Image Processing Utility
 * Handles resizing, optimization, and Base64 conversion
 */

/**
 * Configuration for image processing
 */
interface ImageProcessConfig {
  width: number;
  height: number;
  quality: number; // 0-1
  dpi: number;
}

// Default configuration
const DEFAULT_CONFIG: ImageProcessConfig = {
  width: 350,
  height: 350,
  quality: 0.8, // 80% quality
  dpi: 70
};

/**
 * Resize and optimize an image
 * @param file The image file to process
 * @param config Configuration options for processing
 * @returns A promise that resolves to the processed image as a Base64 string
 */
export const processImage = async (
  file: File,
  config: Partial<ImageProcessConfig> = {}
): Promise<string> => {
  // Merge provided config with defaults
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  
  return new Promise((resolve, reject) => {
    // Create a FileReader to read the file
    const reader = new FileReader();
    
    reader.onload = (event) => {
      // Create an image element to draw on canvas
      const img = new Image();
      
      img.onload = () => {
        // Create a canvas element for resizing
        const canvas = document.createElement('canvas');
        canvas.width = finalConfig.width;
        canvas.height = finalConfig.height;
        
        // Get canvas context
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Não foi possível criar contexto de canvas'));
          return;
        }
        
        // Draw image with resizing
        ctx.drawImage(img, 0, 0, finalConfig.width, finalConfig.height);
        
        // Convert to Base64
        const base64Image = canvas.toDataURL('image/jpeg', finalConfig.quality);
        
        resolve(base64Image);
      };
      
      img.onerror = () => {
        reject(new Error('Erro ao carregar imagem'));
      };
      
      // Set source of image to the FileReader result
      if (event.target && typeof event.target.result === 'string') {
        img.src = event.target.result;
      } else {
        reject(new Error('Erro ao ler arquivo'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Erro ao ler arquivo'));
    };
    
    // Read the file as data URL (Base64)
    reader.readAsDataURL(file);
  });
};

/**
 * Save an image to the Google Sheets
 * @param base64Image Base64 encoded image string
 * @param filename Original filename
 * @param listingId Related listing ID
 */
export const saveImageToSheets = async (
  base64Image: string,
  filename: string,
  listingId: string
): Promise<{success: boolean; imageId?: string; message?: string}> => {
  try {
    // Implementation to save the image to Google Sheets via API
    // This would typically call the sheetsService.ts methods
    
    // For now, we'll return a mock response
    return {
      success: true,
      imageId: `img_${Date.now()}`,
      message: 'Imagem salva com sucesso'
    };
  } catch (error) {
    console.error('Erro ao salvar imagem:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Erro desconhecido ao salvar imagem'
    };
  }
};

/**
 * Create a File object from a Base64 string
 * @param base64 Base64 encoded string
 * @param filename Filename to use
 * @param mimeType MIME type of the file
 * @returns A File object
 */
export const base64ToFile = (
  base64: string,
  filename: string,
  mimeType = 'image/jpeg'
): File => {
  // Get the Base64 content without the data URL prefix
  const base64Content = base64.split(',')[1];
  const binaryString = window.atob(base64Content);
  const bytes = new Uint8Array(binaryString.length);
  
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  const blob = new Blob([bytes], { type: mimeType });
  return new File([blob], filename, { type: mimeType });
};
