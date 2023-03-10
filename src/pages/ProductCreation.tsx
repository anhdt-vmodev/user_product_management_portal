import { Button, TextField } from '@aws-amplify/ui-react';
import { useCreateProduct } from 'api/useCreateProduct';
import { Storage } from 'aws-amplify';
import { Container } from 'components/Container';
import { Navbar } from 'components/Navbar';
import { useCallback, useState } from 'react';
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
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);

  const { mutation: createProduct } = useCreateProduct();

  const updateName = useCallback(
    (e: any) => {
      setName(e.target.value);
    },
    [setName]
  );

  const updateDescription = useCallback(
    (e: any) => {
      setDescription(e.target.value);
    },
    [setDescription]
  );

  function onChange(e: any) {
    setFile(e.target.files[0]);
  }

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
      <Navbar type="loggedin" />
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
            <input type="file" onChange={onChange} />
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
