import { SignUp } from "@clerk/clerk-react";
import "./signup.css";

function SignUpPage() {
  return (
    <div className="auth-container">
      <SignUp signInUrl="/sign-in" signInForceRedirectUrl={"/dashboard"} />
    </div>
  );
}

export default SignUpPage;
