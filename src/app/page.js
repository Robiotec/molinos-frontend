import LoginForm from "@/modules/authentication/components/LoginForm";
import AuthenticationRedirect from "@/modules/authentication/hooks/AuthenticationRedirect";

export default async function Home() {

  await AuthenticationRedirect();

  return (
    <div className="login-container">
      <main className="form-signin">
        <LoginForm />
      </main>
    </div>
  )
}
