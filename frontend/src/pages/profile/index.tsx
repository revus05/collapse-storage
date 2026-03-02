import { getMeOnServer } from "entity/user/lib";
import { EditProfileForm } from "features/user/edit-profile";
import Image from "next/image";
import { notFound } from "next/navigation";
import { withHomeLayout } from "widgets/layouts/home";

const Profile = async () => {
  const user = await getMeOnServer();

  if (!user) {
    notFound();
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Профиль</h1>
        <EditProfileForm user={user} />
      </div>

      <section className="rounded-lg border p-4 flex flex-col gap-4">
        {user.image ? (
          <Image
            src={user.image}
            alt="avatar"
            width={120}
            height={120}
            className="size-24 rounded-full object-cover border"
          />
        ) : (
          <div className="size-24 rounded-full border flex items-center justify-center text-white/60">
            Нет фото
          </div>
        )}

        <div className="flex flex-col gap-2">
          <div className="text-white/70">Роль: {user.role}</div>
          <div>
            {user.firstName} {user.lastName}
          </div>
          <div className="text-white/70">{user.email}</div>
        </div>
      </section>
    </div>
  );
};

export default withHomeLayout(Profile);
