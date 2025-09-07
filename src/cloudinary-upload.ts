import cloudinary, {
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';

export function uploads(
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean
): Promise<UploadApiErrorResponse | UploadApiResponse | undefined> {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file,
      {
        resource_type: 'auto',
        public_id,
        overwrite,
        invalidate,
      },
      (error, result) => {
        if (error) {
          console.log('Error uploading to Cloudinary:', error);
          resolve(error);
        } else {
          resolve(result);
        }
      }
    );
  });
}

export function videos(
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean
): Promise<UploadApiErrorResponse | UploadApiResponse | undefined> {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file,
      {
        resource_type: 'video',
        public_id,
        overwrite,
        invalidate,
        chunk_size: 500000,
      },
      (error, result) => {
        if (error) {
          console.log('Error uploading to Cloudinary:', error);
          resolve(error);
        } else {
          resolve(result);
        }
      }
    );
  });
}
