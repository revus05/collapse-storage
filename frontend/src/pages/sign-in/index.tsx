import { SignInForm } from "features/user/sign-in";
import { withAuthLayout } from "widgets/layouts/auth";

const SignInPage = () => {
  return (
    <div className={"min-h-screen flex items-center justify-center"}>
      <SignInForm />
    </div>
  );
};

export default withAuthLayout(SignInPage);
