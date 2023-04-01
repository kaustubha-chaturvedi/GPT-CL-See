import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import copy from "copy-to-clipboard";
import axios from "axios";
import { base64 } from "ethers/lib/utils.js";

function CoverLetter() {
  const { state } = useLocation();
  // const state = {
  //   resp: `Dear Hiring Manager,`,
  // };
  console.log(state);
  const [copyText, setCopyText] = useState<string | null>(null);
  //   setCopyText(desc);

  const handleCopyText = (e: any) => {
    setCopyText(e.target.value);
  };

  useEffect(() => {
    setCopyText(state.resp);
  }, []);

  const copyToClipboard = () => {
    if (copyText == null) {
      copy(state.resp);
      setCopyText(state.resp);
    } else {
      copy(copyText);
    }
  };

  const handleSave = async () => {
    await Moralis.start({
      apiKey:
        "fqsVW0qgF8uf28B3QZWleLIgTcfEGnrjmAlqd6MdAnYvfN2jP5Cqpk2gOCZ1Hutu",
    });
    const abi = [
      {
        path: "cover-letter.json",
        content: {
          name: `Cover Letter ${new Date()}}`,
          description: copyText!,
          image: "ipfs://QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE",
        },
      },
    ];
    const resp = await Moralis.EvmApi.ipfs.uploadFolder({ abi });
    console.log(resp.toJSON());
  };

  const [isCopyEnabled, setIsCopyEnabled] = useState(true);
  return (
    <div className="relative bg-white  mx-auto py-8 lg:px-8">
      <div className="flex mx-auto my-3 w-3/4 md:w-1/2 justify-center">
        <h1 className="text-2xl font-bold">Here's your cover letter!</h1>
      </div>
      <textarea
        name="company"
        id="company"
        rows={20}
        defaultValue={state.resp}
        onChange={handleCopyText}
        autoComplete="organization"
        className={`block w-3/4 md:w-1/2 rounded-md border-0 mx-auto py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
          isCopyEnabled ? "hover:" : "bg-white text-gray-800"
        }`}
      />
      <div className="flex mx-auto my-3 w-3/4 md:w-1/2 justify-end">
        <button
          type="button"
          onClick={copyToClipboard}
          className="w-fit text-white bg-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Copy to clipboard
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="w-fit text-white bg-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save Permanently
        </button>
      </div>
    </div>
  );
}

export default CoverLetter;
