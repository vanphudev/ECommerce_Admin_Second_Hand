import { useEffect, useState } from 'react';
import { App, Form, Modal, Input, Select, Upload, Button } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { User } from './entity';

export type UserModalProps = {
   formValue: User;
   title: string;
   show: boolean;
   onOk: VoidFunction;
   onCancel: VoidFunction;
   isCreate: boolean;
};

const getBase64 = (file: RcFile): Promise<string> =>
   new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
   });

export function UserModal({ formValue, title, show, onOk, onCancel, isCreate }: UserModalProps) {
   const [form] = Form.useForm<User>();
   const { notification } = App.useApp();
   const [fileList, setFileList] = useState<UploadFile[]>([]);
   const [previewOpen, setPreviewOpen] = useState(false);
   const [previewImage, setPreviewImage] = useState('');
   const [previewTitle, setPreviewTitle] = useState('');

   const handlePreviewUpload = async (file: UploadFile) => {
      if (!file.url && !file.preview) {
         file.preview = await getBase64(file.originFileObj as RcFile);
      }
      setPreviewImage(file.url || (file.preview as string));
      setPreviewOpen(true);
      setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
   };

   const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

   const handleCancelPreview = () => setPreviewOpen(false);

   useEffect(() => {
      if (show) {
         form.setFieldsValue(formValue);
      }
   }, [show, formValue, form]);

   const handleOk = () => {
      form.validateFields()
         .then(() => {
            notification.success({
               message: isCreate ? 'Create User Success!' : 'Update User Success!',
               duration: 3,
            });
            onOk();
         })
         .catch((errorInfo) => {
            console.error('Failed to submit form:', errorInfo);
         });
   };

   return (
      <Modal
         title={title}
         open={show}
         onCancel={onCancel}
         onOk={handleOk}
         destroyOnClose
         width="50%"
         centered
         bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
      >
         <Form form={form} layout="vertical">
            <Form.Item name="userId" label="User ID" hidden={!isCreate}>
               <Input />
            </Form.Item>
            <Form.Item name="fullName" label="Full Name" rules={[{ required: true, message: 'Please enter full name' }]}>
               <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter email' }]}>
               <Input type="email" />
            </Form.Item>
            <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Please enter phone number' }]}>
               <Input />
            </Form.Item>
            <Form.Item name="gender" label="Gender" rules={[{ required: true, message: 'Please select gender' }]}>
               <Select
                  options={[
                     { label: 'Male', value: 'male' },
                     { label: 'Female', value: 'female' },
                     { label: 'Other', value: 'other' },
                  ]}
               />
            </Form.Item>
            <Form.Item name="birthday" label="Birthday">
               <Input type="date" />
            </Form.Item>
            <Form.Item label="Profile Image">
               <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreviewUpload}
                  onChange={handleChange}
                  beforeUpload={() => false}
                  maxCount={1}
               >
                  {fileList.length < 1 && '+ Upload'}
               </Upload>
               <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancelPreview}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
               </Modal>
            </Form.Item>
         </Form>
      </Modal>
   );
}
