import axios from 'axios';

const resolveRequest = ({ req }) => {
  if(typeof window === 'undefined') {
    // we are on the server
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers
    });
  } else {
    // we are on the browser
    return axios.create({
      baseURL: '/'
    });
  }
}

const requestFromServerSide = ({ req }) => {
  return axios.create({
    baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
    headers: req.headers
  });
}

//export default { resolveRequest, requestFromServerSide };
export { resolveRequest, requestFromServerSide };
//export default requestFromServerSide;