import { GetServerSideProps } from 'next';
import axios from 'axios';



const ProtectedPage = () => {
  return (
    <div>
      <h1>Korunan Sayfa</h1>
      <p>Hoş geldiniz,!</p>
    </div>
  );
};

// getServerSideProps ile token kontrolü
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const token = req.cookies['accessToken']; // Tarayıcıdan gelen cookie

  if (!token) {
    return {
      redirect: {
        destination: '/login', // Eğer token yoksa login sayfasına yönlendir
        permanent: false,
      },
    };
  }

  try {
    // Backend API'den token doğrulaması yapıyoruz
    const response = await axios.get('http://localhost:4700/auth/verify-token', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Token geçerliyse, kullanıcı bilgilerini döndürüyoruz
    return {
      props: {
        user: response.data,
      },
    };
  } catch (error) {
    console.log(error)
    // Eğer token geçerli değilse login sayfasına yönlendir
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};

export default ProtectedPage;
