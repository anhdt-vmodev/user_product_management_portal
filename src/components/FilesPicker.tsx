import clsx from 'clsx';
import { chain, isEmpty, isEqual } from 'lodash';
import React, { useCallback } from 'react';

interface FilePickersProps {
  children?: Element;
  setFiles: Function;
  name: string;
  images: File[];
  removeFile: any;
  multiple?: boolean;
}

export const FilePickers: React.FC<FilePickersProps> = ({
  name,
  setFiles,
  images,
  removeFile,
  multiple = true,
}) => {
  const [fileValue, setFileValue] = React.useState('');
  return (
    <div
      className="relative border-2 my-2 border-[#00669] border-dashed w-auto min-h-[200px] m-3 cursor-pointer
        bg-white hover:bg-slate-300 hover:bg-opacity-20 mx-auto
        flex items-center justify-center
        p-4
      "
    >
      {isEmpty(images) && (
        <div className="whitespace-nowrap text-center w-full">
          Chose files or drop
        </div>
      )}
      <input
        className="absolute inset-0 opacity-0 cursor-pointer"
        onClick={() => {
          setFileValue('');
        }}
        value={fileValue}
        onChange={(e) => {
          e.preventDefault();

          const filesData = e.target.files;
          if (!filesData) {
            return;
          }

          if (multiple) {
            setFiles((prev: any) => {
              const arr = [...prev, ...Array.from(filesData)];
              const newArr = chain(arr).compact().uniqWith(isEqual).value();
              return newArr;
            });
          } else {
            setFiles([e.target.files?.[0]]);
          }
        }}
        multiple={multiple}
        type="file"
        accept="image/jpeg, image/png"
        name={name}
        id=""
      />
      {!isEmpty(images) && (
        <ImagesPreview images={images} removeFile={removeFile} />
      )}
    </div>
  );
};

export const ImagesPreview = ({
  images,
  removeFile,
  className,
  showXIcon,
}: {
  images: any[];
  removeFile: any;
  className?: string;
  showXIcon?: boolean;
}) => {
  return (
    <div className="flex gap-2 w-full flex-wrap justify-center items-center ">
      {images.map((image) => {
        return (
          <ImagePreview
            showXIcon={showXIcon}
            key={JSON.stringify(image)}
            image={image}
            removeFile={removeFile}
            className={className}
          />
        );
      })}
    </div>
  );
};

const ImagePreview = ({
  removeFile,
  image,
  className = 'w-20 h-20',
  showXIcon = true,
}: {
  removeFile: any;
  image: File;
  className?: string;
  showXIcon?: boolean;
}) => {
  const handleClick = useCallback(() => {
    removeFile(image);
  }, [removeFile, image]);
  return (
    <div className={clsx(className, 'relative')}>
      {showXIcon && (
        <svg
          onClick={handleClick}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 bg-white rounded absolute top-1 right-1 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}

      <img
        alt=""
        src={URL.createObjectURL(image)}
        className="w-full h-full object-cover border rounded"
      />
    </div>
  );
};
