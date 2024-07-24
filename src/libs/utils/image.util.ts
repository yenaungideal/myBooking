export const urlToBase64 = async (url: string): Promise<string | undefined> => {
    if (!url) return undefined;
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result?.toString());
      reader.readAsDataURL(blob);
    });
  };
  
  export const urlToBlob = async (url: string): Promise<Blob | undefined> => {
    if (!url) return undefined;
    const data = await fetch(url);
    const blob = await data.blob();
    return blob;
  };