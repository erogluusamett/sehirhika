import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MotifDecor from '../../components/MotifDecor';
import './RegisterPage.css';
import logo from "../../assets/sehrin-hikayesi-logo.png";
import axios from 'axios';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const togglePassword = () => setShowPassword(!showPassword);

    const handleRegister = async () => {
        if (!username || !email || !password) {
            alert("Tüm alanları doldurmalısınız.");
            return;
        }

        try {
            const payload = {
                username,
                email,
                password
            };

            const response = await axios.post("http://localhost:8585/api/auth/register", payload);

            console.log("✅ Kayıt başarılı:", response.data);
            alert("Kayıt başarılı! Giriş ekranına yönlendiriliyorsunuz.");
            navigate("/login?role=user");

        } catch (error) {
            console.error("❌ Kayıt hatası:", error.response?.data || error.message);
            alert("Kayıt başarısız! Lütfen tekrar deneyin.");
        }
    };

    return (
        <>
            <MotifDecor />
            <div className="login-container">
                <img src={logo} alt="Şehrin Hikayesi Logo" className="entry-logo" />

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Kullanıcı adınızı giriniz"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="email"
                        placeholder="E-postanızı giriniz"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group password-group">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Şifrenizi giriniz"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <span onClick={togglePassword} className="eye-icon">👁</span>
                </div>

                <button className="login-button" onClick={handleRegister}>KAYIT OL</button>
                <button className="register-button" onClick={() => navigate("/")}>
                    GİRİŞ YAP
                </button>
            </div>
        </>
    );
};

export default RegisterPage;
