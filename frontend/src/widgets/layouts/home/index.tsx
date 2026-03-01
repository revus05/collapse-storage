import { getMeOnServer } from "entity/user/lib";
import { redirect } from "next/navigation";
import type { ComponentType, FC, ReactNode } from "react";
import { paths } from "shared/navigation/paths";
import { Header } from "./header";
import { Navigation } from "./nav";

type HomeLayoutType = {
  children: ReactNode;
};

const HomeLayout: FC<HomeLayoutType> = async ({ children }) => {
  const user = await getMeOnServer();

  if (!user) {
    redirect(paths.signIn);
  }

  return (
    <main className={"flex flex-col gap-8 grow"}>
      <div className={"h-12.25 relative"}>
        <Header />
      </div>
      <div className={"2xl:w-360 w-full 2xl:px-0 px-2 mx-auto flex gap-8 grow"}>
        {children}
      </div>
      <div className={"h-19.25"}>
        <Navigation user={user} />
      </div>
    </main>
  );
};

export const withHomeLayout = <P extends object>(
  Component: ComponentType<P>,
) => {
  const WrappedComponent = async (props: P) => (
    <HomeLayout>
      <Component {...props} />
    </HomeLayout>
  );

  WrappedComponent.displayName = `withHomeLayout(${Component.displayName || Component.name || "Component"})`;

  return WrappedComponent;
};
