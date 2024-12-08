import axios from 'axios';
import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react'

const login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()
    const handlersubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            // Axios ile POST isteği
            const response = await axios.post('http://localhost:4700/auth/login', {
                name,
                password
            }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true // Tarayıcıda cookie'leri almak için
            });

            const data = response.data; // Yanıt verisini al
            console.log(data);
            console.log('Login başarılı');

            const { token } = response.data;

            // Eğer token varsa, token'ı localStorage'a kaydedebiliriz (veya cookie).
            localStorage.setItem('authToken', token);

            // Yönlendirme işlemi
            router.push('/protected'); // Korunan sayfaya yönlendirme
        } catch (error) {
            console.error('Login başarısız:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handlersubmit}>
                <input type="text" onChange={(e) => { setName(e.target.value) }} />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} />
                <button type='submit'>GONDER</button>
            </form>

        </div>
    )
}

export default login
