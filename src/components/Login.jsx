import { useState } from "react";
import { Navbar } from "./utils/Navbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { redirect } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const notifySuccess = (message) => {
    return toast.success(`${message}`);
  };
  const notifyError = (message) => {
    return toast.error(`${message}`);
  };
  const [data, setData] = useState({
    private_key: "",
    public_key: "",
  });

  const initial = { public_key: "", public_key: "", error: true };
  const [error, setError] = useState(initial);

  const [response, setResponse] = useState("");

  const handleChange = (e) => {
    setError((prev) => {
      return { ...prev, [e.target.id]: "" };
    });
    setData((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const validateform = () => {
    if (data.public_key == "" && data.private_key == "") {
      return {
        public_key: "invalid public key",
        private_key: "invalid private key",
        error: true,
      };
    } else if (data.private_key == "") {
      return { private_key: "invalid private key", error: true };
    } else if (data.public_key == "" && data.private_key == "") {
      return { public_key: "invalid public key", error: true };
    }
    return { error: false };
  };
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validate = validateform();
    if (validate.error) {
      setError(validate);
      return;
    }
    const baseUrl = "http://34.125.194.30:9090/baby_chain/public/login";
    await axios
      .post(baseUrl, data)
      .then(async (response) => {
        console.log("response", response);
        notifySuccess(response.data.message);
        await sleep(3000).then(() => {
          navigate("/");
        });
      })
      .catch((error) => {
        console.log(error.response.data.error);
        notifyError(error.response.data.error);
      });
    console.log(data);
  };

  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      <div class="bg-white min-h-screen flex items-center justify-center font-poppins p-4">
        <div className=" w-full md:w-4/5 bg-blue-500 p-10 flex rounded-lg shadow-xl ">
          <div class="w-full h-full">
            <form
              class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={handleSubmit}
            >
              <div class="mb-8">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="username"
                >
                  Public key
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="public_key"
                  type="text"
                  placeholder="public key"
                  value={data.public_key}
                  onChange={handleChange}
                />
                <div className="text-sm text-red-500">{error.public_key}</div>
              </div>
              <div class="mb-8">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="password"
                >
                  Private key
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="private_key"
                  type="private_key"
                  placeholder="private key"
                  value={data.private_key}
                  onChange={handleChange}
                />
                <div className="text-sm text-red-500">{error.private_key}</div>
              </div>

              <div class="flex">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
