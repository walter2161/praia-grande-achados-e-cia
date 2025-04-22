
/**
 * Lista de imagens reais e públicas de Praia Grande, SP, para usar no banner.
 * Recomendado sempre atribuir para Unsplash/Pexels.
 */
export const bannerImages = [
  // Praia Grande - Portal da Cidade
  "https://images.unsplash.com/photo-1522507651781-2cda430b53c0?auto=format&fit=crop&w=1200&q=80", // praia com quiosques
  // Praia Grande vista a partir da areia
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80", // mar e areia
  // Praia Grande - calçadão com ciclovia
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80", // orla/ciclovia
  // Praia Grande - Edifícios à beira-mar
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80", // prédios de frente
  // Praia Grande - Mar em dia ensolarado
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80", // céu azul e mar
  // Praia Grande - Final de tarde
  "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=1200&q=80", // pôr do sol
];

/**
 * Retorna uma imagem aleatória
 */
export function getRandomBannerImage() {
  const idx = Math.floor(Math.random() * bannerImages.length);
  return bannerImages[idx];
}
