import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CreateMemoryPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login"); // Giriş yapılmadıysa login sayfasına yönlendir
        }
    }, []);

    return (
        <div>
            {/* Anı oluşturma formu */}
        </div>
    );
};

export default CreateMemoryPage;
