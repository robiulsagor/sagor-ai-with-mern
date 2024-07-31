import { SignIn } from "@clerk/clerk-react";
import "./signin.css";

function SignInPage() {
  return (
    <div className="auth-container">
      <SignIn signUpUrl="/sign-up" signInForceRedirectUrl={"/dashboard"} />
    </div>
  );
}

export default SignInPage;
