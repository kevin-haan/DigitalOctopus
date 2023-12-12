import Form from "../../../../utils/Forms/classes/Form";
import { useForm } from "../../../../utils/Forms/hooks/useForm";
import { useAuth } from "../../../../context/AuthContext";
import { toast } from "react-toastify";
import { PiEyeClosed } from "react-icons/pi";
import { PiEye } from "react-icons/pi";
import { FiKey } from "react-icons/fi";
import { useState } from "react";

const LoginForm = () => {
  const loginForm = new Form({
    email: ["", ["required", "minLength:3"]],
    password: ["", ["required", "minLength:8"]],
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const { login, isAuthenticated } = useAuth();

  const onSuccess = async (response) => {
    toast("You have signed in", {
      icon: FiKey,
    });
  };

  const onError = (error) => {
    toast.error("Anmeldefehler!");
  };

  const onFormSubmit = async (inputs) => {
    if (isAuthenticated) {
      toast("Bereits angemeldet.");
    } else {
      try {
        const response = await login(inputs);
        if (response) {
          onSuccess();
        } else {
          onError();
        }
      } catch (error) {
        onError(error);
      }
    }
  };

  const { inputs, errors, handleInputChange, handleSubmit } = useForm(
    loginForm,
    onFormSubmit,
    onSuccess,
    onError
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5 relative">
        <label>
          <div className="text-sm px-3 mb-3 font-bold">Email</div>
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
        </label>
        {errors.email && (
          <div className="text-red-800 font-serif text-xs p-3 absolute right-0 top-0 mt-8 mr-2">
            {errors.email}
          </div>
        )}
      </div>
      <div className="mb-5 relative">
        <label>
          <div className="text-sm px-3 mb-3 font-bold">Password</div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={inputs.password}
              onChange={handleInputChange}
              placeholder="Password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 "
              onClick={togglePasswordVisibility}
            >
              {showPassword && <PiEye />}
              {!showPassword && <PiEyeClosed />}
            </button>
          </div>
        </label>
        {errors.password && (
          <div className="text-red-800 font-serif text-xs p-3 absolute right-0 top-0 mt-8 mr-2">
            {errors.password}
          </div>
        )}
      </div>
      <button
        type="submit"
        className="group mt-5 font-serif font-bold text-gray-800 py-2 px-4 rounded text-center"
      >
        <FiKey className="mx-auto bg-gray-800 p-3 text-white rounded-full w-fit h-fit mb-3 group-hover:rotate-45 transition-transform" />
        <span className="group-hover:underline">Login</span>
      </button>
    </form>
  );
};

export default LoginForm;
