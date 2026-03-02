"use client";

import { useCloudinaryUpload } from "features/file/upload";
import { signIn, useUpdateMeMutation } from "entity/user";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { UserDTO } from "shared/api";
import { useAppDispatch } from "shared/lib/hooks";
import { Button } from "shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "shared/ui/dialog";
import { Field, FieldError, FieldLabel } from "shared/ui/field";
import { Input } from "shared/ui/input";

type EditProfileFormData = {
  firstName: string;
  lastName: string;
  image: string;
};

type EditProfileFormProps = {
  user: UserDTO;
};

export const EditProfileForm = ({ user }: EditProfileFormProps) => {
  const [open, setOpen] = useState(false);
  const [updateMe, { isLoading }] = useUpdateMeMutation();
  const { uploadFiles, isLoading: isUploading } = useCloudinaryUpload();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { register, handleSubmit, reset, setValue, watch, formState } =
    useForm<EditProfileFormData>({
      defaultValues: {
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image ?? "",
      },
    });

  const image = watch("image");

  const resetForm = () => {
    reset({
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image ?? "",
    });
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      resetForm();
    }
  };

  const handleUploadAvatar = async (files: FileList | null) => {
    const uploadedFiles = await uploadFiles(files);
    if (uploadedFiles.length > 0) {
      setValue("image", uploadedFiles[0], { shouldDirty: true });
    }
  };

  const onSubmit = async (data: EditProfileFormData) => {
    try {
      const response = await updateMe(data).unwrap();
      dispatch(signIn(response.data));
      handleOpenChange(false);
      router.refresh();
    } catch (e) {
      console.error("Ошибка обновления профиля", e);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pencil />
          Редактировать профиль
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Редактирование профиля</DialogTitle>
          <DialogDescription>
            Обновите личную информацию и аватар пользователя
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Field>
            <FieldLabel>Имя</FieldLabel>
            <Input {...register("firstName", { required: true })} />
            <FieldError>
              {formState.errors.firstName && "Имя обязательно"}
            </FieldError>
          </Field>

          <Field>
            <FieldLabel>Фамилия</FieldLabel>
            <Input {...register("lastName", { required: true })} />
            <FieldError>
              {formState.errors.lastName && "Фамилия обязательна"}
            </FieldError>
          </Field>

          <Field>
            <FieldLabel>Аватар</FieldLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleUploadAvatar(e.target.files)}
            />
          </Field>

          {image && (
            <Image
              src={image}
              alt="avatar preview"
              width={96}
              height={96}
              className="size-24 rounded-full object-cover border"
            />
          )}

          <Button type="submit" disabled={isLoading || isUploading}>
            Сохранить
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
