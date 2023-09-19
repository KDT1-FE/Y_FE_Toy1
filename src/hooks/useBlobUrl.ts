import { useEffect, useState } from 'react';
import { uploadImage } from '../utils/firebaseUtils';

const useBlobUrl = () => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setUrl(null);
      return;
    }

    const blobUrl = URL.createObjectURL(file);
    setUrl(blobUrl);

    return () => {
      URL.revokeObjectURL(blobUrl);
    };
  }, [file]);

  console.log(url);

  return { url, setFile };
};

export default useBlobUrl;
