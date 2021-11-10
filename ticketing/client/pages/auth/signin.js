import { useState } from 'react' ;
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email, password
    },
    onSuccess: () => Router.push('/')
  })
  
  const onSubmit = async (event) => {
    event.preventDefault();
    
    await doRequest();
  };

  return (
    <div className="container mt-4">
      <form onSubmit={onSubmit}>
        <h1>Sign In</h1>
        <div className="form-group">
          <label>Email Address</label>
          <input className="form-control"
            value={email} 
            onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form-group mb-2">
          <label>Password</label>
          <input className="form-control"
            type="password"
            value={password} 
            onChange={e => setPassword(e.target.value)} />
        </div>
        {errors}
        <button className="btn btn-primary">Sign In</button>
      </form>
    </div>
  )
};

export default signup;