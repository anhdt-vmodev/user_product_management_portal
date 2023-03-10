import {
  Authenticator,
  Autocomplete,
  // useAuthenticator,
} from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { Country, City } from 'country-state-city';
import { useEffect, useState } from 'react';

const services: any = {
  async handleSignUp(formData: any) {
    let { username, password, attributes } = formData;
    console.log(attributes);
    return Auth.signUp({
      username,
      password,
      attributes,
      autoSignIn: {
        enabled: true,
      },
    });
  },
};

const Home = () => {
  return (
    <Authenticator
      initialState="signUp"
      components={{
        SignUp: {
          FormFields() {
            // const { validationErrors } = useAuthenticator();
            const [countryCode, setCountryCode]: [any, any] = useState(null);
            const [country, setCountry]: [any, any] = useState('');
            const [city, setCity]: [any, any] = useState('');
            const [cities, setCities]: [any, any] = useState([]);
            const countries = Country.getAllCountries().map((item) => ({
              id: item.name,
              label: item.name,
              isoCode: item.isoCode,
            }));
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
            }, [countryCode]);
            return (
              <>
                {/* Re-use default `Authenticator.SignUp.FormFields` */}
                <Authenticator.SignUp.FormFields />
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
              </>
            );
          },
        },
      }}
      services={services}
    >
      {({ signOut, user }) => (
        <main>
          <h1>Hello {JSON.stringify(user)}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
};
export default Home;
