import { useEffect, useState } from 'react';
import { useRouter } from '@/router/hooks';
import { useLoginStateContext } from '@/pages/management/sys/login/providers/LoginStateProvider';
import { useUserActions } from '@/store/userStore';

function Logout() {
   const { replace } = useRouter();
   const { clearUserInfoAndToken } = useUserActions();
   const { backToLogin } = useLoginStateContext();
   const [showPopup, setShowPopup] = useState(false);

   useEffect(() => {
      // Hiển thị popup ngay khi component được render
      setShowPopup(true);
   }, []);

   const confirmLogout = async () => {
      try {
         clearUserInfoAndToken();
         backToLogin();
      } catch (error) {
         console.error(error);
      } finally {
         replace('/login'); // Chuyển hướng tới trang đăng nhập
      }
   };

   return (
      <>
         {showPopup && (
            <div style={overlayStyle as React.CSSProperties}>
               <div style={popupStyle as React.CSSProperties}>
                  <p style={textStyle}>Bạn có chắc chắn muốn đăng xuất không?</p>
                  <button onClick={confirmLogout} style={confirmButtonStyle}>
                     Có, Đăng xuất
                  </button>
                  <button onClick={() => replace('/')} style={cancelButtonStyle}>
                     Hủy
                  </button>
               </div>
            </div>
         )}
      </>
   );
}

const overlayStyle: React.CSSProperties = {
   position: 'fixed',
   top: 0,
   left: 0,
   width: '100vw',
   height: '100vh',
   backgroundColor: 'rgba(0, 0, 0, 0.5)',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   zIndex: 1000, // Đảm bảo popup luôn ở trên các thành phần khác
};

const popupStyle: React.CSSProperties = {
   backgroundColor: '#fff',
   padding: '30px',
   borderRadius: '8px',
   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
   textAlign: 'center' as 'center',
   maxWidth: '500px',
   width: '90%', // Để popup chiếm 90% chiều rộng màn hình trên thiết bị nhỏ
   maxHeight: '300px',
   overflow: 'auto',
};

const textStyle: React.CSSProperties = {
   fontSize: '18px',
   marginBottom: '20px',
};

const confirmButtonStyle: React.CSSProperties = {
   padding: '10px 20px',
   fontSize: '16px',
   backgroundColor: '#ff4d4f',
   color: '#fff',
   border: 'none',
   borderRadius: '4px',
   cursor: 'pointer',
   marginRight: '10px',
};

const cancelButtonStyle: React.CSSProperties = {
   padding: '10px 20px',
   fontSize: '16px',
   backgroundColor: '#ccc',
   color: '#000',
   border: 'none',
   borderRadius: '4px',
   cursor: 'pointer',
};

export default Logout;
