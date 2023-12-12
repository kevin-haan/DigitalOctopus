import { Link } from "react-router-dom";
import RegisterForm from "./components/Register/RegisterForm";

const Register = () => {
  return (
    <div className="container px-80 flex flex-col my-auto text-center">
      <h1 className="mx-auto text-5xl mb-10">Sign up.</h1>
      <div className="mx-auto mb-20">
        <div>Please choose your credentials below to sign up for Plants.</div>
        <div>
          Do you already have an account?
          <Link to="/login" className="ml-2 font-serif font-bold underline">
            Click here to login.
          </Link>
        </div>
      </div>
      <div className="p-5 ">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
