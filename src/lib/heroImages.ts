
/**
 * Lista de imagens de pessoas felizes da Unsplash para usar no banner.
 */
export const bannerImages = [
  // Woman sitting on a bed using laptop
  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=1200&q=80",
  // Woman using laptop
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
  // People working together
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
];

export function getRandomBannerImage() {
  const idx = Math.floor(Math.random() * bannerImages.length);
  return bannerImages[idx];
}
