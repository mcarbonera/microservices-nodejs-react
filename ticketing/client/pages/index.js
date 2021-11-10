import { requestFromServerSide } from '../api/build-client';

const Index = ({ currentUser }) => {
  return (
    <div className="container mt-4">
      {currentUser ? (
        <h1>You are signed in</h1>
      ) : (
        <h1>You are not signed in</h1>
      )}
    </div>
  )
};

export const getServerSideProps = async (context) => {
  const path = '/api/users/currentuser';
  const client = await requestFromServerSide(context);
  const data = client.get(path)
    .then(response => response.data)
    .catch(err => {
      return err;
    });
  return { props: data }
}

export default Index;

/*
Index.getInitialProps = async ({ req }) => { 
  let baseUrl = '';
  let headerObject = req.headers;
  const path = '/api/users/currentuser';
  if (typeof window === 'undefined') {
    // we are on the server!
    baseUrl = 'http://ingress-nginx-controller.ingress-nginx.srv.cluster.local';
    headerObject = req.headers;

    console.log(req.headers);
  } else {
    // we are on the browser!
    console.log(req.headers);
  }
  console.log('EXECUTED');

  console.log(baseUrl + path);
  return await axios.get(baseUrl + path, { headers: headerObject })
    .then(response => response.data)
    .catch(err => {
      //console.log(err);
      return err;
    });
  //return {};
}
*/