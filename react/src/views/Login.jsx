import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';
import ScrollToTop from '../components/ScrollToTop';

export default function Login() {

  const [errors, setErrors] = useState(null)
  const {setUser, setToken} = useStateContext()
  const params = useParams()
  const navigate = useNavigate()
  const from = params.from
  const emailRef = useRef()
  const mdpRef = useRef()

  const handleSubmit = (ev) => {
    ev.preventDefault()
    // alert('Implémenter la connexion ici ...')
    const payload = {
      from: from || '',
      email: emailRef.current.value,
      password: mdpRef.current.value,
    }
    setErrors(null)
    axiosClient.post('/login', payload)
    .then(({data})=>{
    //   console.log(data)
      if (data.redirect_to) {
        navigate(data.redirect_to)
      }
      setUser(data.user)
      setToken(data.token)
    })
    .catch((err)=>{
      const response = err.response
      if (response && response.status == 422) {
        // console.log(response.data.errors)
        if (response.data.errors) {
          setErrors(response.data.errors)
        } else {
          setErrors({
            email: [response.data.message]
          })
        }
        
      }
    })
  }
  useEffect(()=>{
    window.scrollTo(0,0)
  }, [])

  useEffect(()=>{
    // window.scrollTo(0,0)
    // window.scroll({ top: 0, behavior: 'smooth' })
    // window.location.reload()
    // alert('From = '+from)
  }, [])

  return (
    <div>
      {/* <ScrollToTop /> */}
      <div className="container" style={{ height:'550px', marginTop:'50px' }}>
        <div className="col-sm-12 col-md-8 col-lg-6 col-xl-4 mx-auto">
          <h1 className="text-center mb-5">
            Connexion
          </h1>
          {
            errors && <div style={{ color:'red' }}>
              {
                Object.keys(errors).map(key=>(
                  <div key={key}>
                    {errors[key][0]}
                  </div>
                ))
              }
            </div>
          }
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label>Adresse email :</Form.Label>
              <Form.Control ref={emailRef} type="email" placeholder="Entrer votre adresse email" />
              {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>

            <Form.Group className="mb-5" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control ref={mdpRef} type="password" placeholder="Password" />
            </Form.Group>
            
            <div className="text-center">
              <Button variant="primary" type="submit">
                Se connecter
              </Button>
            </div>
            <div className="text-left mt-3">
              <p>Vous n'avez pas encore de compte ? <Link to={'/signup'}>Cliquez ici pour vous inscrire.</Link></p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

