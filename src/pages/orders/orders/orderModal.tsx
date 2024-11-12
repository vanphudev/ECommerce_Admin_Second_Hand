import { Order } from './entity';

import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useEffect, useState } from 'react';
import { App, Form, Modal, Input, Radio, Space, Select, Typography, Upload, Spin } from 'antd';

export type OrderModalProps = {
   formValue: Order;
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

export function OrderModal({ formValue, title, show, onOk, onCancel, isCreate }: OrderModalProps) {
   const [form] = Form.useForm();
   const { notification } = App.useApp();
   const [fileList, setFileList] = useState<UploadFile[]>([]);
   const [previewOpen, setPreviewOpen] = useState(false);
   const [previewImage, setPreviewImage] = useState('');
   const [previewTitle, setPreviewTitle] = useState('');
   const [loading, setLoading] = useState(false);

   const handleCancelUpload = () => setPreviewOpen(false);
   const handlePreviewUpload = async (file: UploadFile) => {
      if (!file.url && !file.preview) {
         file.preview = await getBase64(file.originFileObj as RcFile);
      }
      setPreviewImage(file.url || (file.preview as string));
      setPreviewOpen(true);
      setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
   };

   const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

   useEffect(() => {
      const loadImages = async () => {
         if (show) {
            form.setFieldsValue(formValue);
         }
      };
      loadImages();
   }, [show, formValue, form, isCreate]);

   const handleOk = () => {
      form.validateFields();
      notification.success({
         message: 'Create Office Success !',
         duration: 3,
      });
      onOk();
   };

   const content = (
      <Form
         layout="horizontal"
         labelCol={{ span: 4 }}
         wrapperCol={{ span: 18 }}
         style={{ maxHeight: '70vh', overflowY: 'auto' }}
      >
         {/* Order ID */}
         <Form.Item label="Order ID" name="order_id" rules={[{ required: true, message: 'Please enter the Order ID' }]}>
            <Input size="large" />
         </Form.Item>

         {/* Contact Information */}
         <Form.Item label="Contact Information">
            <Space style={{ display: 'flex', gap: '10px' }}>
               <Form.Item
                  name="phone"
                  rules={[
                     { required: true, message: 'Please enter the phone number' },
                     { pattern: /^[0-9]+$/, message: 'Please enter a valid phone number' },
                  ]}
               >
                  <Input size="large" placeholder="Phone" />
               </Form.Item>
               <Form.Item name="fax" rules={[{ required: true, message: 'Please enter the fax number' }]}>
                  <Input size="large" placeholder="Fax" />
               </Form.Item>
            </Space>
         </Form.Item>

         {/* Location Information */}
         <Form.Item label="Location Information">
            <Space style={{ display: 'flex', gap: '10px' }}>
               <Form.Item>
                  <Input size="large" placeholder="Latitude" readOnly />
               </Form.Item>
               <Form.Item>
                  <Input size="large" placeholder="Longitude" readOnly />
               </Form.Item>
            </Space>
         </Form.Item>

         {/* Status */}
         <Form.Item label="Status">
            <Radio.Group size="large" optionType="button" buttonStyle="solid">
               <Radio value={1}>Enable</Radio>
               <Radio value={0}>Disable</Radio>
            </Radio.Group>
         </Form.Item>

         {/* Address */}
         <Form.Item label="Address" rules={[{ required: true, message: 'Please enter the address' }]}>
            <Space direction="vertical" style={{ width: '100%' }}>
               <Form.Item>
                  <Input size="large" placeholder="Enter Address" />
               </Form.Item>
               <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                     <Typography.Text>Province/City:</Typography.Text>
                     <Form.Item>
                        <Select size="large" showSearch placeholder="Select Province" style={{ width: '100%' }} />
                     </Form.Item>
                  </div>
                  <div style={{ flex: 1 }}>
                     <Typography.Text>District:</Typography.Text>
                     <Form.Item>
                        <Select size="large" showSearch placeholder="Select District" style={{ width: '100%' }} />
                     </Form.Item>
                  </div>
                  <div style={{ flex: 1 }}>
                     <Typography.Text>Ward:</Typography.Text>
                     <Form.Item>
                        <Select size="large" showSearch placeholder="Select Ward" style={{ width: '100%' }} />
                     </Form.Item>
                  </div>
               </div>
            </Space>
         </Form.Item>

         {/* Image Upload */}
         <Form.Item label="Image">
            <Upload
               listType="picture-card"
               fileList={fileList}
               multiple
               beforeUpload={() => false}
               onPreview={handlePreviewUpload}
               onChange={handleChange}
               maxCount={8}
               progress={{
                  strokeColor: {
                     '0%': '#108ee9',
                     '100%': '#87d068',
                  },
               }}
            >
               {fileList.length < 5 && '+ Upload'}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancelUpload}>
               <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
         </Form.Item>
      </Form>
   );

   return (
      <Modal
         title={title}
         open={show}
         onOk={handleOk}
         onCancel={() => {
            onCancel();
         }}
         destroyOnClose
         width="60%"
         centered
      >
         {loading && (
            <Spin size="large" fullscreen tip={isCreate ? 'Creating...' : 'Updating...'}>
               {content}
            </Spin>
         )}
         {content}
      </Modal>
   );
}
