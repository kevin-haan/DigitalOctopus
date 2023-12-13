import Form from "../../../../utils/Forms/classes/Form";
import { useForm } from "../../../../utils/Forms/hooks/useForm";
import { useAuth } from "../../../../context/AuthContext";
import { toast } from "react-toastify";
import { PiEyeClosed } from "react-icons/pi";
import { PiEye } from "react-icons/pi";
import { PiSignature } from "react-icons/pi";
import { useState } from "react";

const RegisterForm = () => {
  const registerForm = new Form({
    first_name: ["", ["required", "minLength:3"]],
    last_name: ["", ["required"]],
    email: ["", ["required", "minLength:3"]],
    password: ["", ["required", "minLength:8"]],
    passwordConfirm: ["", ["required", "minLength:8", "sameAs:password"]],
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const { register, isAuthenticated } = useAuth();

  const onSuccess = async (response) => {
    toast("You have signed in", {
      icon: PiSignature,
    });
  };

  const onError = (error) => {
    toast.error(error);
  };

  const onFormSubmit = async (inputs) => {
    if (isAuthenticated) {
      toast("Bereits angemeldet.");
    } else {
      const response = await register(inputs);
      if (response && response.success) {
        onSuccess();
      } else if (response && response.errors) {
        // Gehe jeden Fehler durch und zeige eine Toast-Nachricht an
        Object.keys(response.errors).forEach((key) => {
          toast.error(response.errors[key]);
        });
      }
    }
  };

  const { inputs, errors, handleInputChange, handleSubmit } = useForm(
    registerForm,
    onFormSubmit,
    onSuccess,
    onError
  );

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="mb-5 relative">
          <label>
            <div className="text-sm px-3 mb-3 font-bold">First Name</div>
            <input
              type="text"
              name="first_name"
              value={inputs.first_name}
              onChange={handleInputChange}
              className="w-full p-3 rounded"
            />
          </label>
          {errors.first_name && (
            <div className="text-red-800 font-serif text-xs p-3 absolute right-5 top-0.5  mt-8 mr-2">
              {errors.first_name}
            </div>
          )}
        </div>{" "}
        <div className="mb-5 relative">
          <label>
            <div className="text-sm px-3 mb-3 font-bold">Last Name</div>
            <input
              type="text"
              name="last_name"
              value={inputs.last_name}
              onChange={handleInputChange}
              className="w-full p-3 rounded"
            />
          </label>
          {errors.last_name && (
            <div className="text-red-800 font-serif text-xs p-3 absolute right-5 top-0.5  mt-8 mr-2">
              {errors.last_name}
            </div>
          )}
        </div>
        <div className="mb-5 relative">
          <label>
            <div className="text-sm px-3 mb-3 font-bold">Email</div>
            <input
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleInputChange}
              className="w-full p-3 rounded"
            />
          </label>
          {errors.email && (
            <div className="text-red-800 font-serif text-xs p-3 absolute right-5 top-0.5  mt-8 mr-2">
              {errors.email}
            </div>
          )}
        </div>
        <div className="mb-5 relative">
          <label className="">
            <div className="text-sm px-3 mb-3 font-bold">Password</div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={inputs.password}
                onChange={handleInputChange}
                className="w-full p-3 rounded"
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
            <div className="text-red-800 font-serif text-xs p-3 absolute right-5 top-0.5 mt-8 mr-2">
              {errors.password}
            </div>
          )}
        </div>
        <div className="mb-5 relative">
          <label>
            <div className="text-sm px-3 mb-3 font-bold">Confirm Password</div>
            <label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="passwordConfirm"
                  value={inputs.passwordConfirm}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded"
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
          </label>
          {errors.passwordConfirm && (
            <div className="text-red-800 font-serif text-xs p-3 absolute right-5 top-0.5 mt-8 mr-2">
              {errors.passwordConfirm}
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="group mt-5 font-serif font-bold text-gray-800 py-2 px-4 rounded text-center"
      >
        <PiSignature className="mx-auto bg-gray-800 p-3 text-white rounded-full w-fit h-fit mb-3 group-hover:scale-110 transition-transform" />
        <span className="group-hover:underline">Sign up</span>
      </button>
    </form>
  );
};

export default RegisterForm;
