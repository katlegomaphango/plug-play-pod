import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabaseApi"
import { Box, Button, Typography, styled } from "@mui/material"
import {theme} from '../theme'

const StyledBox = styled(Box)({
    backgroundColor: theme.palette.primary.dark,
    padding: 15,
    borderRadius: '0.5rem'
})

const MainBox = styled(Box)({
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    flexDirection: 'column',
    gap: 5
})


const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        surname: '',
    })
    const navigate = useNavigate()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        const {error} = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    name: formData.name,
                    surname: formData.surname,
                }
            }
        })

        if(error) {
            navigate('/error')
        }
        alert('check email for confirmation link')
        navigate('/')
    }

    console.log(formData)


    return (
        <MainBox sx={{marginTop: {xs: 8, sm: 10}}}>
            <Typography variant="h3" sx={{fontWeight: 'bold'}} >Sign Up</Typography>
            <StyledBox>
                <form onSubmit={(e) => handleSignUp(e)} >
                    <div style={{marginBottom: 20}}>
                        <input 
                            type="text" 
                            placeholder='name'
                            name='name'
                            onChange={handleChange}
                            style={{background: 'transparent', border: '1px solid', borderColor: theme.palette.primary.contrastText, borderRadius: '0.3rem', padding: '1rem', fontSize: '1rem', color: "white"}}
                        />
                    </div>
                    <div style={{marginBottom: 20}}>
                        <input 
                            type="text" 
                            placeholder='surname'
                            name='surname'
                            onChange={handleChange}
                            style={{background: 'transparent', border: '1px solid', borderColor: theme.palette.primary.contrastText, borderRadius: '0.3rem', padding: '1rem', fontSize: '1rem', color: "white"}}
                        />
                    </div>
                    <div style={{marginBottom: 20}}>
                        <input 
                            type="email" 
                            placeholder='email'
                            name='email'
                            onChange={handleChange}
                            style={{background: 'transparent', border: '1px solid', borderColor: theme.palette.primary.contrastText, borderRadius: '0.3rem', padding: '1rem', fontSize: '1rem', color: "white"}}
                        />
                    </div>
                    <div style={{marginBottom: 20}}>
                        <input 
                            type="password" 
                            placeholder='password'
                            name='password'
                            onChange={handleChange}
                            style={{background: 'transparent', border: '1px solid', borderColor: theme.palette.primary.contrastText, borderRadius: '0.3rem', padding: '1rem', fontSize: '1rem', color: "white"}}
                        />
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Button type="submit" variant="contained" color="success">
                            Sign Up
                        </Button>
                    </div>
                </form>
            </StyledBox>
            <Typography variant="h6">
                Already have an account? <Link to={'/'}>Login</Link>
            </Typography>
        </MainBox>
    )
}

export default SignUp