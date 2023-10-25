import { Routes, Route, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Popup from './components/popup/Popup';
import AdminLogin from './pages/admin/Login';
import AdminLayout from './components/layout/admin/Layout';

import './css/default.css';


function App() {
    const user = useSelector((state)=>state.user);

    return(
        <div>
            <Routes>

                {/* 관리자단---------------------------------------------- */}
                {/* 로그인 */}
                <Route path="/console/login" element={<AdminLogin />} />

                {/* 모든페이지 */}
                <Route path="/console" element={<AdminLayout />} />


                    
                {/* //관리자단---------------------------------------------- */}


                

            </Routes>

            {/* 팝업 */}
            <Popup />
        </div>
    );
}

export default App;
