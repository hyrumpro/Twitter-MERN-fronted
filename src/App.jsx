import { Route, Routes, Link, Outlet, Navigate } from "react-router-dom";
import { Login, Sidebar, Register } from './routes/LazyComponent';
import { Container, Menu } from 'semantic-ui-react';


const App = () => {

 const isLoggedin = false

  return (
      <>
          <Menu fixed='top' inverted>
              <Container>
                  <Menu.Item header>
                      <h1>Twitter</h1>
                  </Menu.Item>
                  <Menu.Item>
                      <Link to="/">Menu</Link>
                  </Menu.Item>
                  <Menu.Item>
                      <Link to="/sidebar">Sidebar</Link>
                  </Menu.Item>
                  <Menu.Item as='a'>Contact</Menu.Item>
              </Container>
          </Menu>


          <Container>
              <Routes>
                  <Route
                      path="/"
                      element={
                          isLoggedin ? (
                              <Outlet />
                          ) : (
                              <Navigate to="/login" replace />
                          )
                      }
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="/sidebar" element={<Sidebar />} />
                  <Route path="/register" element={<Register />} />
              </Routes>
          </Container>
     </>
  )
}

export default App
