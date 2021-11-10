import 'bootstrap/dist/css/bootstrap.css';
import { resolveRequest } from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  )
};

AppComponent.getInitialProps = async appContext => {
  const path = '/api/users/currentuser';
  const client = resolveRequest(appContext.ctx);
  const { data } = await client.get(path);

  return {
    ...data
  };
}

/*
export const getServerSideProps = async (appContext) => {
  const path = '/api/users/currentuser';
  const client = await requestFromServerSide(appContext.ctx);
  const data = client.get(path)
    .then(response => response.data)
    .catch(err => {
      return err;
    });
  console.log(data);
  console.log('_APP');
  return { props: data }
  //return {};
  // { Component, ctx: { req, res } }
};
*/

export default AppComponent;