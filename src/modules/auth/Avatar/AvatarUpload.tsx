/* eslint-disable @next/next/no-img-element */
import ImageIcon from 'icons/ImageIcon';
import React, { useState } from 'react';
import Button from 'ui/Button';

const AvatarUpload = () => {
  // const imageUrl= `${REACT_APP_API_URL}/upload-file`
  const imageSrc = 'https://erxes.techstore.mn/gateway/upload-file?key=';
  const [changeImg, setChangeImg] = useState('');

  const onClose = () => {};

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setChangeImg('');
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSave = () => {};

  return (
    <div className="flex justify-center mt-8">
      <div className="rounded-lg  lg:w-1/2">
        <div className="m-4">
          <label className="inline-block text-md mb-2 text-gray-500">
            Зураг оруулах (jpg, png, svg, jpeg)
          </label>
          <div className="flex flex-col border-dashed border rounded items-center justify-center w-full  py-7 relative">
            <ImageIcon className="text-6xl text-gray-400" />
            <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
              Зураг сонгох
            </p>
            <img
              src={changeImg || '/images/users.png'}
              alt=""
              id="imageprev"
              className={changeImg ? '' : 'hidden'}
            />

            <input
              type="file"
              className="opacity-0 absolute inset-0"
              onChange={handleFileChange}
            />
          </div>

          <div className="flex p-2 space-x-4">
            <Button
              className="px-4 py-2 text-white bg-red-500 rounded "
              onClick={onClose}
            >
              Гарах
            </Button>
            <Button
              className="px-4 py-2 text-white bg-green-500 rounded "
              onClick={handleSave}
            >
              Хадгалах
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarUpload;