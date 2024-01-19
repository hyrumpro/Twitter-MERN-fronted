import {lazy, Suspense} from 'react';

const LoginComponent = lazy(() => import('../components/Login/Login.jsx'));
const SidebarComponent = lazy(() => import('../components/SideBar'));
const RegisterComponent = lazy(() => import('../components/Register/Register.jsx'));
export const Login = () => (
    <Suspense fallback={<div className="waiting">Loading</div>}>
        <LoginComponent />
    </Suspense>
);

export const Sidebar = () => (
    <Suspense fallback={<div className="waiting">Loading</div>}>
        <SidebarComponent />
    </Suspense>
);

export const Register = () => (
    <Suspense fallback={<div className="waiting">Loading</div>}>
        <RegisterComponent />
    </Suspense>
);