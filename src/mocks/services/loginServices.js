const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

const loginServices = (bodyData) =>{
  let body = JSON.parse(bodyData);
  
  let errors = [];

  if(!body.username || body.username === ''){
    errors.push({email:'this field is required '})
  } 

  if(!body.password || body.password === ''){
    errors.push({password:'this field is required '})
  }

  if(body.username !== '' &&  body.password !== '' && (body.username !== 'admin' ||  body.password !== '1234')){
    errors.push({details:'login credentials is incorrect'})
  }

  console.log(body.username !== '' &&  body.password !== '' && (body.username !== 'admin' ||  body.password !== '1234'));
  console.log(body.password !== '1234');
  console.log(body.password);
  console.log(errors);
  
  let response = {
    data:errors.length === 0 ? {token:token} : {},
    status:errors.length === 0 ? 200 : 401,
    errors:errors
  };

    return response;
}

export default loginServices;