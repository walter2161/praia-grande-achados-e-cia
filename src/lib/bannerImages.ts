
const bannerImages = [
  "/lovable-uploads/239ae548-ca2d-41d4-bf2f-45fb03041253.png",
  "/lovable-uploads/5f7b8b03-3150-4e7b-a80f-1bda2a724c84.png",
  "/lovable-uploads/6845329c-d67e-490b-8052-45275eed2754.png",
  "/lovable-uploads/abee89b4-ad96-4e76-afc0-ee0e567cf71b.png",
  "/lovable-uploads/2151e1d2-70c1-4782-a130-b2ffd11fd0cc.png",
  "/lovable-uploads/00a82f2d-dbf2-43ed-a234-69598ae56bd5.png"
];

export const getRandomBannerImage = () => {
  const randomIndex = Math.floor(Math.random() * bannerImages.length);
  return bannerImages[randomIndex];
};
