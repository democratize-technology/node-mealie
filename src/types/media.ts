export type ImageType = 'original.webp' | 'min-original.webp' | 'tiny-original.webp';

// While the API documentation returns JSON for GET endpoints,
// they actually return binary image data or file content
export type MediaResponse = Blob;
export type MediaStreamResponse = ReadableStream<Uint8Array>;

export interface MediaParams {
  recipeId: string;
  fileName: string;
}

export interface TimelineMediaParams extends MediaParams {
  timelineEventId: string;
}

export interface AssetParams {
  recipeId: string;
  fileName: string;
}

export interface UserMediaParams {
  userId: string;
  fileName: string;
}

export interface ValidationText {
  validation: string;
}
