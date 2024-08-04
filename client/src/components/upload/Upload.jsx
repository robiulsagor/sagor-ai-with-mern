import { IKContext, IKUpload } from "imagekitio-react";

const publicKey = import.meta.env.VITE_IMGKIT_PUBLIC_KEY;
const urlEndpoint = import.meta.env.VITE_URL_ENDPOINT;

const authenticator = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_URL_ENDPOINT}/upload`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

// eslint-disable-next-line react/prop-types
const Upload = ({ setImg, isLoading }) => {
  const onError = (err) => {
    console.log("Error", err);
  };

  const onSuccess = (res) => {
    console.log("Success", res);
    setImg((prev) => ({ ...prev, isLoading: false, dbData: res }));
  };

  const onUploadProgress = (progress) => {
    console.log("Progress", progress);
  };

  const onUploadStart = (evt) => {
    const file = evt.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      console.log("file, ", reader.result);
      setImg((prev) => ({
        ...prev,
        isLoading: true,
        aiData: {
          inlineData: {
            data: reader.result.split(",")[1],
            mimeType: file.type,
          },
        },
      }));
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <IKContext
        urlEndpoint={urlEndpoint}
        publicKey={publicKey}
        authenticator={authenticator}
      >
        <IKUpload
          fileName="test-upload.png"
          onError={onError}
          onSuccess={onSuccess}
          onUploadProgress={onUploadProgress}
          onUploadStart={onUploadStart}
          hidden
          useUniqueFileName={true}
          id="file"
          disabled={isLoading}
        ></IKUpload>
      </IKContext>
    </>
  );
};

export default Upload;
