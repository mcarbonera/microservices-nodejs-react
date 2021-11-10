import { useEffect } from 'react';
import Router from 'next/router';
import { resolveRequest } from '../../api/build-client';

export default () => {
  const { doRequest } = resolveRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/')
  });

  useEffect(() => {
    doRequest();
  }, []);

  return (
    <div>
      Signing you out...
    </div>
  );
};