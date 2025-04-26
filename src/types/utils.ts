/**
 * Parameters for downloading a file
 */
export interface DownloadParams {
  /** Token for authentication if required */
  token?: string | null;
}

/**
 * Response type for file downloads
 */
export type DownloadResponse = Blob;
