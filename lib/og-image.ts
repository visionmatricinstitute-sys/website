// Social-preview (Open Graph / Twitter) images are 1200x630 JPEG copies of the page images, kept in /public/og/.
// The originals have mixed sizes (some portrait or over 700 KB), which social apps crop badly or skip.
export function ogImagePath(src: string): string {
  return src.replace(/^\/(?!og\/)([A-Za-z0-9_-]+)\.(jpg|jpeg|png|webp)$/, "/og/$1.jpg")
}
