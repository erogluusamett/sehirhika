//
//
// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import './LoginPage.css';
// import MotifDecor from '../../components/MotifDecor';
// import axios from 'axios';
//
// const LoginPage = () => {
//     const [showPassword, setShowPassword] = useState(false);
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();
//     const location = useLocation();
//
//     const togglePassword = () => setShowPassword(!showPassword);
//
//     const handleLogin = async () => {
//         try {
//             const response = await axios.post('http://localhost:8585/api/auth/login', {
//                 username,
//                 password
//             });
//
//             // ✅ Gelen veriler
//             const { token, role, userId } = response.data;
//             console.log("Gelen response:", response.data);
//
//             // Rol kontrolü (adres parametresinden alınır)
//             const roleParam = new URLSearchParams(location.search).get("role")?.toUpperCase();
//
//             if (roleParam === "ADMIN" && role !== "ADMIN") {
//                 alert("Bu sayfadan sadece admin girişi yapılabilir.");
//                 return;
//             }
//
//             if (roleParam === "USER" && role !== "USER") {
//                 alert("Bu sayfadan sadece kullanıcı girişi yapılabilir.");
//                 return;
//             }
//
//             // ✅ Token, rol ve kullanıcı ID’sini kaydet
//             localStorage.setItem("token", token);
//             localStorage.setItem("role", role);
//             localStorage.setItem("userId", userId);  // ✅ Bu çok kritik!
//
//             // ✅ Yönlendirme sadece bu satır değişti
//             if (role === "ADMIN") {
//                 navigate("/admin");
//             } else {
//                 navigate("/map");
//             }
//
//         } catch (error) {
//             alert("Giriş başarısız! Bilgilerinizi kontrol edin.");
//             console.error("❌ Login hatası:", error);
//         }
//     };
//
//     const roleParam = new URLSearchParams(location.search).get("role");
//
//     return (
//         <>
//             <MotifDecor />
//             <div className="login-container">
//                 <img
//                     src={require('../../assets/sehrin-hikayesi-logo.png')}
//                     alt="Şehrin Hikayesi Logo"
//                     className="entry-logo"
//                 />
//
//                 <div className="form-group">
//                     <input
//                         type="text"
//                         placeholder="Kullanıcı adınızı giriniz"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                     />
//                 </div>
//
//                 <div className="form-group password-group">
//                     <input
//                         type={showPassword ? "text" : "password"}
//                         placeholder="Şifrenizi giriniz"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                     <span onClick={togglePassword} className="eye-icon">👁</span>
//                 </div>
//
//                 <button className="login-button" onClick={handleLogin}>GİRİŞ YAP</button>
//
//                 {roleParam !== "admin" && (
//                     <button className="register-button" onClick={() => navigate("/register")}>
//                         KAYIT OL
//                     </button>
//                 )}
//             </div>
//         </>
//     );
// };
//
// export default LoginPage;
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LoginPage.css';
import MotifDecor from '../../components/MotifDecor';
import axios from 'axios';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const togglePassword = () => setShowPassword(!showPassword);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8585/api/auth/login', {
                username,
                password
            });

            // ✅ Gelen veriler
            const { token, role, userId } = response.data;
            console.log("Gelen response:", response.data);

            const roleParam = new URLSearchParams(location.search).get("role")?.toUpperCase();

            if (roleParam === "ADMIN" && role !== "ADMIN") {
                alert("Bu sayfadan sadece admin girişi yapılabilir.");
                return;
            }

            if (roleParam === "USER" && role !== "USER") {
                alert("Bu sayfadan sadece kullanıcı girişi yapılabilir.");
                return;
            }

            // ✅ Giriş başarılı → localStorage'a her şeyi kaydet
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            localStorage.setItem("userId", userId);
            localStorage.setItem("username", username); // ✅ KULLANICI ADI DA EKLENDİ

            // ✅ Yönlendirme
            if (role === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/map");
            }

        } catch (error) {
            alert("Giriş başarısız! Bilgilerinizi kontrol edin.");
            console.error("❌ Login hatası:", error);
        }
    };

    const roleParam = new URLSearchParams(location.search).get("role");

    return (
        <>
            <MotifDecor />
            <div className="login-container">
                <img
                    src={require('../../assets/sehrin-hikayesi-logo.png')}
                    alt="Şehrin Hikayesi Logo"
                    className="entry-logo"
                />

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Kullanıcı adınızı giriniz"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="form-group password-group">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Şifrenizi giriniz"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span onClick={togglePassword} className="eye-icon">👁</span>
                </div>

                <button className="login-button" onClick={handleLogin}>GİRİŞ YAP</button>

                {roleParam !== "admin" && (
                    <button className="register-button" onClick={() => navigate("/register")}>
                        KAYIT OL
                    </button>
                )}
            </div>
        </>
    );
};

export default LoginPage;
