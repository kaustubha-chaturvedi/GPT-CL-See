import { useState } from "react";
import CoverLetterGenerator from "../components/CoverLetterGenerator";
import FileUploader from "../components/FileUploader";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  profileId: string;
  setProfileId: (profileId: string) => void;
};

const HomePage = ({ profileId, setProfileId }: Props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isAutoGenerating, setIsAutoGenerating] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isCreative, setIsCreative] = useState(false);
  const [isWitty, setIsWitty] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (profileId == null) {
      alert("Please Login with Metamask first!");
      return;
    }
    window.console.log(selectedFile);
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("name", firstName + " " + lastName);
    formData.append("job_title", jobTitle);
    formData.append("job_description", jobDescription);
    formData.append("resume", selectedFile!);
    formData.append("creative", isCreative ? "Yes" : "No");
    formData.append("witty", isWitty ? "Yes" : "No");
    console.log(...formData.keys(), ...formData.values());
    fetch("https://think-3rba.onrender.com/upload_resume", {
      method: "POST",
      body: formData,
    })
      .then(async (response) => {
        let data = await response.json();
        window.console.log(data.content);
        setIsLoading(false);
        navigate("/cover-letter", {
          state: {
            resp: data.content,
          },
        });
      })
      .catch((error) => {
        window.console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <div className="relative bg-white px-6 pt-16 py-24 lg:px-8">
      <div className="mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Cover Letter Generator
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Generate a cover letter for your next job application.
        </p>
      </div>
      <form
        action="#"
        method="POST"
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              First name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="first-name"
                id="first-name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Last name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="last-name"
                id="last-name"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2 mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <FileUploader
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />
          </div>
          <div className="sm:col-span-2 items-center mt-2.5 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <CoverLetterGenerator
              isAutoGenerating={isAutoGenerating}
              setIsAutoGenerating={setIsAutoGenerating}
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="company"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Job Title
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="company"
                id="company"
                onChange={(e) => {
                  setJobTitle(e.target.value);
                }}
                disabled={!isAutoGenerating}
                autoComplete="organization"
                className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  !isAutoGenerating
                    ? "bg-gray-200 text-gray-500"
                    : "bg-white text-gray-800"
                }`}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Job Description
            </label>
            <div className="mt-2.5">
              <textarea
                name="message"
                id="message"
                rows={4}
                onChange={(e) => setJobDescription(e.target.value)}
                disabled={!isAutoGenerating}
                className={`block w-full min-h-[10rem] rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  !isAutoGenerating
                    ? "bg-gray-200 text-gray-500"
                    : "bg-white text-gray-800"
                }`}
                defaultValue={""}
              />
            </div>
          </div>
          <div className="flex items-center mb-4">
            <input
              checked
              id="checked-checkbox"
              type="checkbox"
              onChange={(e) => {
                setIsWitty(e.target.checked);
              }}
              className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label
              htmlFor="checked-checkbox"
              className="ml-2 text-sm font-semibold text-gray-900"
            >
              Include a witty comment at the end.
            </label>
          </div>
        </div>
        <div className="mt-10">
          {!isLoading && (
            <button
              type="submit"
              onClick={handleSubmit}
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
            >
              Generate cover letter
            </button>
          )}{" "}
          {isLoading && (
            <button
              disabled={isLoading}
              type="button"
              className="w-full text-white bg-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline mr-3 w-4 h-4 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                ></path>
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                ></path>
              </svg>
              Generating...
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default HomePage;
