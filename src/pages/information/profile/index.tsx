import React, { useState } from 'react';
import { BasicAdminProfile } from '../../../_mock/_mock_account'; // Import mock dữ liệu admin

function Profile() {
   const [isEditing, setIsEditing] = useState(false);
   const [profile, setProfile] = useState(BasicAdminProfile);

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setProfile({ ...profile, [name]: value });
   };

   const handleEditToggle = () => setIsEditing(!isEditing);

   const handleSave = () => {
      console.log('Saved profile:', profile);
      setIsEditing(false);
   };

   const handleCancel = () => {
      setProfile(BasicAdminProfile); // Khôi phục dữ liệu gốc
      setIsEditing(false);
   };

   return (
      <div style={profileContainerStyle}>
         {/* Ảnh đại diện và thông tin người dùng */}
         <div style={profileHeaderStyle}>
            <img src={profile.avatar} alt={`${profile.username}'s avatar`} style={avatarStyle} />
            {isEditing ? (
               <input
                  type="text"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleInputChange}
                  style={inputStyle}
               />
            ) : (
               <h2 style={nameStyle}>{profile.fullName}</h2>
            )}
            <p style={usernameStyle}>@{profile.username}</p>
         </div>

         {/* Thông tin chi tiết */}
         <div style={infoContainerStyle}>
            <label>ID:</label>
            <p>{profile.id}</p>

            <label>Email:</label>
            {isEditing ? (
               <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  style={inputStyle}
               />
            ) : (
               <p>{profile.email}</p>
            )}

            <label>Phone:</label>
            {isEditing ? (
               <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                  style={inputStyle}
               />
            ) : (
               <p>{profile.phone}</p>
            )}
         </div>

         {/* Nút chỉnh sửa */}
         {isEditing ? (
            <div style={buttonContainerStyle}>
               <button onClick={handleSave} style={saveButtonStyle}>Lưu</button>
               <button onClick={handleCancel} style={cancelButtonStyle}>Hủy</button>
            </div>
         ) : (
            <button onClick={handleEditToggle} style={editButtonStyle}>Chỉnh sửa</button>
         )}
      </div>
   );
}

// Các style cho giao diện

const profileContainerStyle: React.CSSProperties = {
   width: '400px',
   margin: '20px auto',
   padding: '20px',
   backgroundColor: '#f9f9f9',
   borderRadius: '8px',
   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
   fontFamily: 'Arial, sans-serif',
};

const profileHeaderStyle: React.CSSProperties = {
   textAlign: 'center' as const,
   marginBottom: '20px',
};

const avatarStyle: React.CSSProperties = {
   width: '100px',
   height: '100px',
   borderRadius: '50%',
   marginBottom: '10px',
};

const nameStyle: React.CSSProperties = {
   fontSize: '24px',
   fontWeight: 'bold',
};

const usernameStyle: React.CSSProperties = {
   fontSize: '16px',
   color: '#888',
};

const infoContainerStyle: React.CSSProperties = {
   fontSize: '16px',
   lineHeight: '1.6',
};

const inputStyle: React.CSSProperties = {
   width: '100%',
   padding: '8px',
   fontSize: '16px',
   marginBottom: '10px',
   borderRadius: '4px',
   border: '1px solid #ddd',
};

const buttonContainerStyle: React.CSSProperties = {
   display: 'flex',
   justifyContent: 'space-between',
   marginTop: '20px',
};

const editButtonStyle: React.CSSProperties = {
   width: '100%',
   padding: '10px',
   fontSize: '16px',
   backgroundColor: '#007bff',
   color: '#fff',
   border: 'none',
   borderRadius: '4px',
   cursor: 'pointer',
};

const saveButtonStyle: React.CSSProperties = {
   padding: '10px 20px',
   fontSize: '16px',
   backgroundColor: '#28a745',
   color: '#fff',
   border: 'none',
   borderRadius: '4px',
   cursor: 'pointer',
};

const cancelButtonStyle: React.CSSProperties = {
   padding: '10px 20px',
   fontSize: '16px',
   backgroundColor: '#dc3545',
   color: '#fff',
   border: 'none',
   borderRadius: '4px',
   cursor: 'pointer',
};

export default Profile;
