import { Country } from 'country-state-city';
import { isEqual } from 'lodash';
import { createContext, useCallback, useContext, useState } from 'react';

type TypeSignUpContext = {
  preview: boolean;
  setPreview: React.Dispatch<React.SetStateAction<boolean>>;
  countryCode: any;
  setCountryCode: any;
  country: any;
  setCountry: any;
  city: any;
  setCity: any;
  cities: any;
  setCities: any;
  countries: {
    id: string;
    label: string;
    isoCode: string;
  }[];
  email: string;
  setEmail: any;
  password: string;
  setPassword: any;
  postcode: string;
  setPostcode: any;
  username: string;
  setUsername: any;
  user: any;
  setUser: any;
  idenFile: File[];
  passportFile: File[];
  setIdenFile: any;
  setPassportFile: any;
  removeIdenFile: any;
  removePassportFile: any;
  togglePreview: any;
};

export const SignUpContext = createContext<TypeSignUpContext>({
  preview: false,
  setPreview: () => {},
  cities: [],
  city: '',
  country: '',
  countryCode: null,
  setCities: () => {},
  setCity: () => {},
  setCountry: () => {},
  setCountryCode: () => {},
  countries: [],
  email: '',
  password: '',
  postcode: '',
  setEmail: () => {},
  setPassword: () => {},
  setPostcode: () => {},
  username: '',
  setUsername: () => {},
  user: null,
  setUser: () => {},
  idenFile: [],
  passportFile: [],
  setIdenFile: () => {},
  setPassportFile: () => {},
  removeIdenFile: () => {},
  removePassportFile: () => {},
  togglePreview: () => {},
});
export const useSignUp = () => useContext(SignUpContext);

type ProviderProps = {
  children: JSX.Element[] | JSX.Element;
};

export const SignUpProvider = ({ children }: ProviderProps) => {
  const [preview, setPreview] = useState(false);
  const [user, setUser] = useState(null);
  const [countryCode, setCountryCode]: [any, any] = useState(null);
  const [country, setCountry]: [any, any] = useState('');
  const [city, setCity]: [any, any] = useState('');
  const [cities, setCities]: [any, any] = useState([]);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [postcode, setPostcode] = useState('');
  const countries = Country.getAllCountries().map((item) => ({
    id: item.name,
    label: item.name,
    isoCode: item.isoCode,
  }));

  const [idenFile, setIdenFile] = useState([]);
  const [passportFile, setPassportFile] = useState([]);

  const removeIdenFile = useCallback(
    (file: File) => {
      const newFiles = filterFiles(idenFile, file);
      // @ts-ignore: Unreachable code error
      setIdenFile(newFiles);
    },
    [idenFile]
  );

  const removePassportFile = useCallback(
    (file: File) => {
      const newFiles = filterFiles(passportFile, file);
      // @ts-ignore: Unreachable code error
      setPassportFile(newFiles);
    },
    [passportFile]
  );
  const togglePreview = useCallback(() => {
    setPreview((prev) => !prev);
  }, [setPreview]);

  const value: TypeSignUpContext = {
    preview,
    setPreview,
    cities,
    city,
    country,
    countryCode,
    setCities,
    setCity,
    setCountry,
    setCountryCode,
    countries,
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
  };
  return (
    <SignUpContext.Provider value={value}>{children}</SignUpContext.Provider>
  );
};

const filterFiles = (files: File[], file: File): File[] => {
  return files.filter((item: any) => {
    return !isEqual(item?.lastModified, file?.lastModified);
  });
};
