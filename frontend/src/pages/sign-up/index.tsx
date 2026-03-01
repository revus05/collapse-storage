import { SignUpForm } from "features/user/sign-up";
import { withAuthLayout } from "widgets/layouts/auth";

const SignUpPage = () => {
  return (
    <div className={"min-h-screen flex items-center justify-center"}>
      <SignUpForm />
    </div>
  );
};

export default withAuthLayout(SignUpPage);
