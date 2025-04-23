
/**
 * Lista de vídeos de pessoas felizes do Pexels para usar no banner.
 * Todos os vídeos são otimizados para web e gratuitos.
 */
export const bannerVideos = [
  {
    url: "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761",
    poster: "https://images.pexels.com/videos/4538902/free-video-4538902.jpg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    url: "https://player.vimeo.com/external/371843262.sd.mp4?s=10c759c0bfce966d72f5e0893f3c450d48ae4ebd&profile_id=164&oauth2_token_id=57447761",
    poster: "https://images.pexels.com/videos/3045163/free-video-3045163.jpg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    url: "https://player.vimeo.com/external/477260156.sd.mp4?s=0f0585fe3f0a85cbaedc86002211a57aad5c4dd4&profile_id=164&oauth2_token_id=57447761",
    poster: "https://images.pexels.com/videos/5377585/pexels-photo-5377585.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    url: "https://player.vimeo.com/external/403278689.sd.mp4?s=0febd6dc9552dd72d347011432f9e49c5675a26e&profile_id=164&oauth2_token_id=57447761",
    poster: "https://images.pexels.com/videos/4090902/free-video-4090902.jpg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    url: "https://player.vimeo.com/external/468489703.sd.mp4?s=8e192aba01f1b645cd0363968aae3866a04f2961&profile_id=164&oauth2_token_id=57447761",
    poster: "https://images.pexels.com/videos/5273042/pexels-photo-5273042.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

export function getRandomBannerVideo() {
  const idx = Math.floor(Math.random() * bannerVideos.length);
  return bannerVideos[idx];
}
