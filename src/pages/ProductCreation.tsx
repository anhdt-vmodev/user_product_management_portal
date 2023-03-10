import { Button, TextField } from '@aws-amplify/ui-react';
import { useCreateProduct } from 'api/useCreateProduct';
import { Storage } from 'aws-amplify';
import { Container } from 'components/Container';
import { FilePickers } from 'components/FilesPicker';
import { Navbar } from 'components/Navbar';
import { useCallback, useMemo, useState } from 'react';
import { toastError } from 'utils/toast';

export type TProduct = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export default function ProductCreation() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  const { mutation: createProduct } = useCreateProduct();

  const updateName = useCallback(
    (e: any) => {
      setName(e.target.value);
    },
    [setName]
  );

  const removeFile = useCallback(() => {
    setImages([]);
  }, [setImages]);

  const file = useMemo(() => {
    return images?.[0] || null;
  }, [images]);

  const updateDescription = useCallback(
    (e: any) => {
      setDescription(e.target.value);
    },
    [setDescription]
  );

  const onSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      if (!name) {
        toastError('Name is required');
        return;
      }

      setLoading(true);

      let image = '';
      if (file) {
        const uploadFile = async () => {
          try {
            const data = await Storage.put(file.name, file, {
              contentType: 'image/png',
            });
            return data.key;
          } catch (error) {
            toastError('Upload failed');
            return '';
          }
        };
        image = await uploadFile();
      }

      await createProduct({
        description,
        image,
        name,
      });
      setLoading(false);
    },
    [name, description, createProduct, file]
  );

  return (
    <>
      <Navbar />
      <Container>
        <form onSubmit={onSubmit}>
          <div className="border p-4 mx-auto my-4 w-[400px] ">
            <div className="text-2xl font-bold ">Create product</div>
            <TextField
              value={name}
              onChange={updateName}
              label="Product Name"
            />
            <TextField
              value={description}
              onChange={updateDescription}
              label="Product Description"
            />

            <FilePickers
              multiple={false}
              name="product-image"
              removeFile={removeFile}
              images={images}
              setFiles={setImages}
            />
            <div className="flex mt-8 justify-center ">
              <Button variation="primary" isLoading={loading} type="submit">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Container>
    </>
  );
}
