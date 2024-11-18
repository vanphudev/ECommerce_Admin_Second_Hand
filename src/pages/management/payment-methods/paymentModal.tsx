import { Payment } from './enity';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useEffect, useState } from 'react';
import { App, Form, Modal, Input, Radio, Space, Select, Typography, Upload, Spin } from 'antd';

export type PaymentModalProps = {
   formValue: Payment;
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

export function PaymentModal({ formValue, title, show, onOk, onCancel, isCreate }: PaymentModalProps) {
   const [form] = Form.useForm<Payment>();
   const { notification } = App.useApp();
   const [fileList, setFileList] = useState<UploadFile[]>([]);
   const [previewOpen, setPreviewOpen] = useState(false);
   const [previewImage, setPreviewImage] = useState('');
   const [previewTitle, setPreviewTitle] = useState('');

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
      if (show) {
         console.log(formValue as Payment);
         form.setFieldsValue(formValue as Payment);
      }
   }, [show, formValue, form]);

   const handleOk = () => {
      form.validateFields();
      notification.success({
         message: 'Create Office Success !',
         duration: 3,
      });
      onOk();
   };

   const content = (
      <Form<Payment>
         layout="horizontal"
         labelCol={{ span: 4 }}
         wrapperCol={{ span: 18 }}
         style={{ maxHeight: '70vh', overflowY: 'auto' }}
      >
         <Form.Item<Payment>
            label="Payment ID"
            name="payment_id"
            rules={[{ required: true, message: 'Please enter the Payment ID' }]}
         >
            <Input size="large" />
         </Form.Item>

         <Form.Item<Payment> label="Order ID">
            <Space style={{ display: 'flex', gap: '10px' }}>
               <Form.Item name="order_id" rules={[{ required: true, message: 'Please enter the Order ID' }]}>
                  <Input size="large" placeholder="Order ID" />
               </Form.Item>
            </Space>
         </Form.Item>
         
         <Form.Item<Payment>
            label="Amount"
            name="amount"
            rules={[{ required: true, message: 'Please enter the Amount' }]}
         >
            <Input size="large" placeholder="Amount" />
         </Form.Item>
         <Form.Item<Payment>
            label="Method"
            name="method"
            rules={[{ required: true, message: 'Please enter the Method' }]}
         >
            <Input size="large" placeholder="Method" />
         </Form.Item>
         <Form.Item<Payment>
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please enter the Status ' }]}
         >
            <Input size="large" placeholder="Status" />
         </Form.Item>
      </Form>
   );

   return (
      <Modal title={title} open={show} onCancel={onCancel} onOk={handleOk} destroyOnClose width="60%" centered>
         {content}
      </Modal>
   );
}
