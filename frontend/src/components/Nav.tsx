import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { useAuthApi } from '../api/Auth.api';
import { Fragment, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Navigation() {
    const { signout } = useAuthApi();
    const { token } = useContext(AuthContext)
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>Task Manager</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {token ?
                            <Fragment>
                                <Nav.Item><Link to="/" style={{ textDecoration: "none", marginInline: "1rem" }}>Home</Link></Nav.Item>
                                <Nav.Item>
                                    <Button onClick={signout}>LogOut</Button>
                                </Nav.Item>
                            </Fragment>
                            :
                            <Fragment>
                                <Nav.Item><Link to="/signup" style={{ textDecoration: "none", marginInline: "1rem" }}>SignUp</Link></Nav.Item>
                                <Nav.Item><Link to="/signin" style={{ textDecoration: "none", marginInline: "1rem" }}>SignIn</Link></Nav.Item>
                            </Fragment>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
