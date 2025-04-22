
/**
 * Lista de imagens de pessoas fazendo negócios para usar no banner.
 * Fonte: Unsplash (Livre Uso)
 */
export const bannerImages = [
  // Unsplash business images - pessoas em negócio
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80", // pessoas com laptops
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80", // usando MacBook
  "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1200&q=80", // grupo em telão
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80", // mulher notebook
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80", // reunião escritório
  "https://images.unsplash.com/photo-1556740772-1a741367b93e?auto=format&fit=crop&w=1200&q=80", // pessoas negócio
];

/**
 * Retorna uma imagem aleatória
 */
export function getRandomBannerImage() {
  const idx = Math.floor(Math.random() * bannerImages.length);
  return bannerImages[idx];
}
