import './Navbar.css'
import logo from '../../assets/meta/logo.png'
import { AppBar, Avatar, Button, Toolbar, Typography, styled } from '@mui/material'
import { theme } from '../../theme'
import { Login, Logout } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const LogoText = styled(Typography)({
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: theme.palette.secondary.light,
    marginLeft: '0.5rem'
})

const LoginButton = styled(Button)({
    borderRadius: '0.3rem',
    border: '1px solid',
    color: theme.palette.primary.contrastText
})

const AppToolbar = styled(Toolbar)({
    backgroundColor: theme.palette.primary.dark, 
    display: 'flex', 
    justifyContent: 'space-between'
})

type PROPS = {
    token: {}
}

const Navbar = (props: PROPS) => {
    const { token } = props
    const navigate = useNavigate()

    const handleLogout = () => {
        sessionStorage.removeItem('token')
        navigate('/')
    }

    return (
        <>
            <AppBar position='sticky'>
                <AppToolbar>
                    <Toolbar>
                        <Avatar alt='logo' src={logo} />
                        <LogoText variant='h1' sx={{display: {xs: 'none', sm: 'block'}}}>
                            Plug 'n Play
                        </LogoText>
                    </Toolbar>
                    {
                        Object.keys(token).length === 0 ? (
                            <LoginButton variant="outlined" onClick={() => {navigate('/')}}>
                                <Login />
                                <Typography ml={1} sx={{display: {xs: 'none', sm: 'block'}}}>Login</Typography>
                            </LoginButton>
                        ) : (
                            <LoginButton variant="outlined" onClick={handleLogout}>
                                <Logout />
                                <Typography ml={1} sx={{display: {xs: 'none', sm: 'block'}}}>Logout</Typography>
                            </LoginButton>
                        )
                    }
                </AppToolbar>
            </AppBar>
        </>
    )
}

export default Navbar