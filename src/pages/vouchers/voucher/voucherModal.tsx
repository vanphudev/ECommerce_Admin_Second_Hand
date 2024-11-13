import { Voucher } from './enity';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useEffect, useState } from 'react';
import { App, Form, Modal, Input, Radio, Space, Select, Typography, Upload, Spin } from 'antd';

export type VoucherModalProps = {
   formValue: Voucher;
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

export function VoucherModal({ formValue, title, show, onOk, onCancel, isCreate }: VoucherModalProps) {
   const [form] = Form.useForm<Voucher>();
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
         console.log(formValue as Voucher);
         form.setFieldsValue(formValue as Voucher);
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
      <Form<Voucher>
         layout="horizontal"
         labelCol={{ span: 4 }}
         wrapperCol={{ span: 18 }}
         style={{ maxHeight: '70vh', overflowY: 'auto' }}
      >
         <Form.Item<Voucher>
            label="Voucher ID"
            name="voucher_id"
            rules={[{ required: true, message: 'Please enter the Voucher ID' }]}
         >
            <Input size="large" />
         </Form.Item>
         <Form.Item<Voucher> label="Voucher Name">
            <Space style={{ display: 'flex', gap: '10px' }}>
               <Form.Item name="voucher_name" rules={[{ required: true, message: 'Please enter the Voucher Name' }]}>
                  <Input size="large" placeholder="Voucher Name" />
               </Form.Item>
               <Form.Item name="description" rules={[{ required: true, message: 'Please enter the Description' }]}>
                  <Input size="large" placeholder="Description" />
               </Form.Item>
            </Space>
         </Form.Item>
         <Form.Item<Voucher>
            label="Discount Rate"
            name="discount_rate"
            rules={[{ required: true, message: 'Please enter the Discount Rate' }]}
         >
            <Input size="large" placeholder="Discount Rate" />
         </Form.Item>
         <Form.Item<Voucher>
            label="Expired At"
            name="expired_at"
            rules={[{ required: true, message: 'Please enter the Expired At' }]}
         >
            <Input size="large" placeholder="Expired At" />
         </Form.Item>
         <Form.Item<Voucher>
            label="Is Active"
            name="is_active"
            rules={[{ required: true, message: 'Please enter the Is Active' }]}
         >
            <Input size="large" placeholder="Is Active" />
         </Form.Item>
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
      <Modal title={title} open={show} onCancel={onCancel} onOk={handleOk} destroyOnClose width="60%" centered>
         {content}
      </Modal>
   );
}
