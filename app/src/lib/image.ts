/* Client-side image compression — progress photos are stored as JPEG data URLs
   inside Firestore docs (1MB limit), so shots are resized + recompressed. */

const MAX_DIM = 900;
const DOC_BUDGET = 750_000; // leave headroom under Firestore's 1MB doc limit

export async function compressImage(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_DIM / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('canvas unavailable');
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();

  for (const quality of [0.8, 0.6, 0.4, 0.25]) {
    const url = canvas.toDataURL('image/jpeg', quality);
    if (url.length <= DOC_BUDGET) return url;
  }
  throw new Error('Photo too large even after compression');
}
