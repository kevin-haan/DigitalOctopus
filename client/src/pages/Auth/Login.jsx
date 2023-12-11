import Form from "../../utils/Forms/classes/Form";
import { useForm } from "../../utils/Forms/hooks/useForm";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const loginForm = new Form({
    email: ["", ["required", "minLength:3"]],
    password: ["", ["required", "minLength:8"]],
  });

  const { login, isAuthenticated } = useAuth();

  const onSuccess = async (response) => {
    toast("Du bist angemeldet!");
  };

  const onError = (error) => {
    toast.error("Anmeldefehler!");
  };

  const onFormSubmit = !isAuthenticated ? login : toast("Bereits angemeldet.");

  const { inputs, errors, handleInputChange, handleSubmit } = useForm(
    loginForm,
    onFormSubmit,
    onSuccess,
    onError
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <label>
          <div className="text-sm px-3 mb-3">Benutzername</div>
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleInputChange}
            className="w-full p-3 rounded"
          />
        </label>
        {errors.email && (
          <div className="text-white font-bold text-xs p-3">{errors.email}</div>
        )}
      </div>
      <div className="mb-5">
        <label>
          <div className="text-sm px-3 mb-3">Passwort</div>
          <input
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleInputChange}
            className="w-full p-3 rounded"
          />
        </label>
        {errors.password && (
          <div className="text-white font-bold text-xs p-3">
            {errors.password}
          </div>
        )}
      </div>
      <button
        type="submit"
        className="mt-5 w-full bg-white hover:bg-black text-black hover:text-white py-2 px-4 rounded"
      >
        Anmelden
      </button>
    </form>
  );
};

export default Login;
