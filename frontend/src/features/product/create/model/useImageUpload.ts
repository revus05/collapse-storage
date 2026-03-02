"use client";

import { useUploadFileMutation } from "entity/file";
import type { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import type { ProductFormData } from "./schema";

export const useImageUpload = (
  setValue: UseFormSetValue<ProductFormData>,
  getValues: UseFormGetValues<ProductFormData>,
) => {
  const [uploadImage, { isLoading }] = useUploadFileMutation();

  const upload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await uploadImage(formData).unwrap();
        return response.data.filepath;
      });

      const newImagePaths = await Promise.all(uploadPromises);

      setValue("images", [...getValues("images"), ...newImagePaths], {
        shouldValidate: true,
      });
    } catch (error) {
      console.error("Ошибка при загрузке изображений:", error);
    }
  };

  const remove = (url: string) => {
    setValue(
      "images",
      getValues("images").filter((i) => i !== url),
      {
        shouldValidate: true,
      },
    );
  };

  return { upload, remove, isLoading };
};
