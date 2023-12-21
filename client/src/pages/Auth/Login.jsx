import LoginForm from "./components/Login/LoginForm";

const Login = () => {
  return (
    <div className="container px-80 flex flex-col my-auto text-center">
      <h1 className="mx-auto text-5xl mb-10">Login.</h1>
      <div className="mx-auto mb-20">
        Please enter your credentials below to login.
      </div>
      <div className="p-5">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
