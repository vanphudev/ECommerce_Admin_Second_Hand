import { useState, useEffect } from 'react';
import { Table, Tag, Popconfirm, notification, Card, Button } from 'antd';
import { IconButton, Iconify } from '@/components/icon';
import { ColumnsType } from 'antd/es/table';
import { generateUserData } from '@/_mock/_mock_user'; // Assume you have this for mock data
import { User } from './entity';
import { UserModal, UserModalProps } from './UserModal';

const DEFAULT_USER_VALUE: User = {
   userId: '',
   email: '',
   phone: '',
   fullName: '',
   gender: 'other',
   birthday: '',
   username: '',
   profileImage: '',
};

export default function UserScreen() {
   const [users, setUsers] = useState<User[]>([]);
   const [loading, setLoading] = useState(false);
   const [userModalProps, setUserModalProps] = useState<UserModalProps>({
      formValue: { ...DEFAULT_USER_VALUE },
      title: 'New Create User',
      show: false,
      isCreate: true,
      onOk: () => {
         setUserModalProps((prev) => ({ ...prev, show: false }));
      },
      onCancel: () => {
         setUserModalProps((prev) => ({ ...prev, show: false }));
      },
   });

   const onCreate = () => {
      setUserModalProps({
         ...userModalProps,
         show: true,
         isCreate: true,
         formValue: { ...DEFAULT_USER_VALUE }, 
      });
   };

   const onEdit = (record: User) => {
      setUserModalProps({
         ...userModalProps,
         show: true,
         isCreate: false,
         formValue: record, 
      });
   };

   const handleDelete = (userId: string) => {
      setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== userId));
      notification.success({
         message: 'Delete User',
         description: `User ${userId} deleted successfully`,
      });
   };

   useEffect(() => {
      setLoading(true);
      setUsers(generateUserData(50) as unknown as User[]); 
      setLoading(false);
   }, []);

   const columns: ColumnsType<User> = [
      { title: 'User ID', dataIndex: 'userId', key: 'userId' },
      { title: 'Full Name', dataIndex: 'fullName', key: 'fullName' },
      { title: 'Email', dataIndex: 'email', key: 'email' },
      { title: 'Phone', dataIndex: 'phone', key: 'phone' },
      { title: 'Gender', dataIndex: 'gender', key: 'gender' },
      { title: 'Birthday', dataIndex: 'birthday', key: 'birthday' },
      {
         title: 'Action',
         key: 'operation',
         align: 'center',
         render: (_, record) => (
            <div className="flex w-full justify-center text-gray">
               <IconButton onClick={() => onEdit(record)}>
                  <Iconify icon="solar:pen-bold-duotone" size={18} />
               </IconButton>
               <Popconfirm
                  title="Delete the user?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => handleDelete(record.userId)}
               >
                  <IconButton>
                     <Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
                  </IconButton>
               </Popconfirm>
            </div>
         ),
      },
   ];

   return (
      <>
         <Card
            title="User List"
            extra={<Button type="primary" onClick={onCreate}>New</Button>}
         >
            <Table
               rowKey={(record) => record.userId}
               columns={columns}
               dataSource={users}
               loading={loading}
               pagination={{
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total) => `Total ${total} items`,
               }}
            />
         </Card>
         <UserModal {...userModalProps} />
      </>
   );
}
