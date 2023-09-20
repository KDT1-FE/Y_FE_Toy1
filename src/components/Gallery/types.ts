export interface ImageUploadPayload {
  readonly url: string;
  readonly timestamp: string;
  readonly title: string;
  readonly content: string;
  readonly username: string;
  readonly like: number;
}

export interface UploadedImage extends ImageUploadPayload {
  readonly id: string;
}
