import { Autocomplete, Button, TextField } from '@aws-amplify/ui-react';
import { signUp } from 'api/authen/signUp';
import { Auth } from 'aws-amplify';
import { FilePickers, ImagesPreview } from 'components/FilesPicker';
import { Label } from 'components/Label';
import { Navbar } from 'components/Navbar';
import { useSignUp } from 'contexts/SignUpContext';
import { City } from 'country-state-city';
import { useGuestOnly } from 'hooks/useGuestOnly';
import { ROUTES } from 'myConstants';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { toastError, toastSuccess } from 'utils/toast';

function Signup() {
  useGuestOnly();
  const {
    cities,
    city,
    countries,
    country,
    countryCode,
    setCities,
    setCity,
    setCountry,
    setCountryCode,
    email,
    password,
    postcode,
    setEmail,
    setPassword,
    setPostcode,
    setUsername,
    username,
    setUser,
    user,
    idenFile,
    passportFile,
    setIdenFile,
    setPassportFile,
    removeIdenFile,
    removePassportFile,
    togglePreview,
    preview,
  } = useSignUp();

  const onChangeCountry = (event: any) => {
    setCountry(event.target.value);
  };

  const onSelectCountry = (option: any) => {
    const { id, isoCode } = option;
    setCountry(id);
    setCountryCode(isoCode);
  };

  const onClearCountry = () => {
    setCountry('');
    setCity('');
  };
  const onChangeCity = (event: any) => {
    setCity(event.target.value);
  };

  const onSelectCity = (option: any) => {
    const { id } = option;
    setCity(id);
  };

  const onClearCity = () => {
    setCity('');
  };

  useEffect(() => {
    setCities(
      City.getCitiesOfCountry(countryCode)?.map((item) => ({
        id: item.name,
        label: item.name,
      }))
    );
  }, [countryCode, setCities]);

  const handleSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      const { error, user: userData } = await signUp({
        city,
        country,
        email,
        password,
        postcode,
        username,
      });
      if (!userData) {
        toastError(error as any);
        return;
      }
      toastSuccess('Sign up success');
      setUser(userData);
    },
    [setUser, city, country, email, password, postcode, username]
  );

  if (preview) {
    return <PreviewData />;
  }

  if (user) {
    return (
      <div className="border p-4 mx-auto my-4 w-[400px]  ">
        <ConfirmSignUp email={email} username={user?.username || ''} />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <div className="border p-4 mx-auto my-4 w-[400px]">
          <h2 data-testid="title_signup" className="font-bold mb-6 text-2xl">
            Signup
          </h2>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
          />
          <br />
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <br />
          <TextField
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
          <br />

          <TextField
            label="Postcode"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="Postcode"
          />

          <br />

          <Autocomplete
            label="Country"
            options={countries}
            name="custom:country"
            placeholder="Country"
            labelHidden={false}
            value={country}
            onChange={onChangeCountry}
            onClear={onClearCountry}
            onSelect={onSelectCountry}
          />
          <br />

          <Autocomplete
            label="City"
            options={cities}
            name="custom:city"
            placeholder="City"
            labelHidden={false}
            value={city}
            onChange={onChangeCity}
            onClear={onClearCity}
            onSelect={onSelectCity}
          />

          <Label htmlFor="custom:iden" text="Identity" />
          <FilePickers
            images={idenFile}
            name="custom:iden"
            setFiles={setIdenFile}
            removeFile={removeIdenFile}
          />

          <Label htmlFor="custom:passport" text="Internation passport" />
          <FilePickers
            images={passportFile}
            name="custom:passport"
            setFiles={setPassportFile}
            removeFile={removePassportFile}
          />

          <br />
          <div className="flex justify-center gap-2 ">
            <Button onClick={togglePreview}>Preview</Button>
            <Button
              data-testid="btn_submit_signup"
              variation="primary"
              type="submit"
            >
              Submit
            </Button>
          </div>

          <div className=" text-center my-5">
            Already has an account?{' '}
            <Link to={ROUTES.login}>
              <span className="text-blue-500">Login</span>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}

export default Signup;

const ConfirmSignUp = ({
  email,
  username,
}: {
  email: string;
  username: string;
}) => {
  const [confirming, setConfirming] = useState(false);
  const [code, setCode] = useState('');
  const encodedEmail = useMemo(() => {
    const firstChar = email[0];
    const firstChar2 = email[email.indexOf('@') + 1];

    return `${firstChar}***@${firstChar2}***`;
  }, [email]);

  const handleConfirm = useCallback(async () => {
    setConfirming(true);
    try {
      await Auth.confirmSignUp(username, code);
    } catch (error) {
      toastError('Confirm failed');
    } finally {
      setConfirming(false);
    }
  }, [username, code]);

  return (
    <div className=" " data-testid="confirm_signup_container">
      <div className="font-bold text-xl mb-4">We Emailed you</div>
      <div className=" ">
        Your code is on the way. To log in, enter the code we emailed to &nbsp;
        {encodedEmail}. It may take a minute to arrive.
      </div>
      <div className=" ">Confirmation Code</div>
      <TextField
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
        }}
        label="Enter your code"
      />
      <div className="flex justify-center gap-2 mt-5">
        <Button
          isLoading={confirming}
          onClick={handleConfirm}
          variation="primary"
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

const PreviewData = () => {
  const {
    city,
    country,
    email,
    username,
    idenFile,
    passportFile,
    removeIdenFile,
    removePassportFile,
    togglePreview,
  } = useSignUp();
  return (
    <div className="border p-4 mx-auto my-4 w-[400px] ">
      <h2 className="font-bold mb-6 text-2xl">Preview your data</h2>
      <div className=" ">
        <div className=" ">Email: {email}</div>
        <div className=" ">Username: {username}</div>
        <div className=" ">Country: {country}</div>
        <div className=" ">City: {city}</div>
        <div className=" ">
          <div className=" ">Identfify image</div>
          <ImagesPreview
            showXIcon={false}
            className="w-40 h-40"
            images={idenFile}
            removeFile={removeIdenFile}
          />
        </div>
        <div className=" ">
          <div className=" ">International passport image</div>
          <ImagesPreview
            showXIcon={false}
            className="w-40 h-40"
            images={passportFile}
            removeFile={removePassportFile}
          />
        </div>
      </div>
      <div className="flex justify-center gap-2">
        <Button onClick={togglePreview}>Back</Button>
      </div>
    </div>
  );
};
