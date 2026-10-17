export interface UploadPhotoInterface {
  status: boolean;
  code: number;
  payload: {
    diploma: {
      createdAt: string;
      description: string | null;
      id: string;
      image: string | null;
      immutable: boolean;
      title: string;
      updatedAt: string;
    };
  };
}

export interface SendPhoto {
  image: globalThis.File;
}

interface File {
  name: string;
  lastModified: number;
  size: number;
  type: string;
  webkitRelativePath: string;
}