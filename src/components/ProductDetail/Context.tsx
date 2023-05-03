import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import { readFile } from 'utils';

const DetailContext = createContext({} as any);

export const useDetailContext = () => useContext(DetailContext);

const Context = ({ detail, categories, wp, children }) => {
  const router = useRouter();
  const { attachment, name, unitPrice, description, attachmentMore, _id } =
    detail;

  const moreImage = (attachmentMore || []).map(({ url }: { url: string }) =>
    readFile(url)
  );

  const [store, setStore] = useState({
    ...detail,
    categories,
    images: [readFile((attachment || {}).url), ...moreImage],
    wp,
  });

  useEffect(() => {
    setStore({
      ...detail,
      categories,
      images: [readFile((attachment || {}).url), ...moreImage],
      wp,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.id]);

  if (!name || !unitPrice || router.query.id !== store._id) {
    return null;
  }

  return (
    <>
      <NextSeo
        title={name}
        description={description}
        openGraph={{
          url: `https://www.technews.mn/products/${_id}`,
          images: [
            {
              url: readFile((attachment || {}).url),
              width: 800,
              height: 600,
              alt: name,
            },
          ],
        }}
      />
      <DetailContext.Provider value={store}>{children}</DetailContext.Provider>
    </>
  );
};

export default Context;
