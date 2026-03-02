"use client";

import { useUploadFileMutation } from "entity/file";

export const useCloudinaryUpload = () => {
  const [uploadFile, { isLoading }] = useUploadFileMutation();

  const uploadFiles = async (files: FileList | File[] | null) => {
    if (!files || files.length === 0) {
      return [];
    }

    const uploadPromises = Array.from(files).map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await uploadFile(formData).unwrap();
      return response.data.filepath;
    });

    return Promise.all(uploadPromises);
  };

  return { uploadFiles, isLoading };
};
