import { Button, Card, Modal, Space, Table, Popconfirm, Form, Input, Row, Col, Select } from 'antd';
import { SaleChannelData } from '../../../_mock/_mock_sale-channel.js';
import { IconButton, Iconify } from '@/components/icon';
import { SalesChannel } from '#/entity';
import { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/es/table';

type SearchFormFieldType = Pick<SalesChannel, 'name', 'phone'>;

export default function SalesChannelPage() {
   const [searchForm] = Form.useForm();
   const [salesChannelModalProps, setSalesChannelModalProps] = useState<SalesChannelModalProps>({
      title: 'New',
      show: false,
      formValue: {
         id: '',
         name: '',
         street: '',
         ward: '',
         deliveryArea: '',
         phone: '',
         email: '',
         company: '',
         supplierGroup: '',
         creator: '',
         notes: '',
      },
      onOk: () => setSalesChannelModalProps((prev) => ({ ...prev, show: false })),
      onCancel: () => setSalesChannelModalProps((prev) => ({ ...prev, show: false })),
   });
   const columns: ColumnsType<SalesChannel> = [
      { title: 'ID NCC', dataIndex: 'SaleChannel_id', width: 70 },
      { title: 'Tên NCC', dataIndex: 'SaleChannel_name', width: 200 },
      { title: 'ĐIỆN THOẠI', dataIndex: ['SaleChannel_contact', 'phone'], width: 100 },
      { title: 'EMAIL', dataIndex: ['SaleChannel_contact', 'email'], width: 200 },
      { title: 'NỢ CẦN TRẢ HIỆN TẠI', dataIndex: 'outstanding_balance', align: 'center', width: 150 },
      { title: 'TỔNG MUA', dataIndex: 'total_purchase', align: 'center', width: 150 },
      {
         title: 'Action',
         key: 'operation',
         align: 'center',
         width: 100,
         render: (_, record) => (
            <div className="flex w-full justify-center text-gray">
               <IconButton onClick={() => onEdit(record)}>
                  <Iconify icon="solar:pen-bold-duotone" size={18} />
               </IconButton>
               <Popconfirm title="Bạn muốn xóa nhà cung cấp này?" okText="Yes" cancelText="No" placement="left">
                  <IconButton>
                     <Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
                  </IconButton>
               </Popconfirm>
            </div>
         ),
      },
   ];

   const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
         console.log('selectedRowKeys: ', selectedRowKeys);
         console.log('selectedRows: ', selectedRows);
      },
      onSelect: (record, selected, selectedRows) => {
         console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
         console.log(selected, selectedRows, changeRows);
      },
   };

   const onCreate = () => {
      setSalesChannelModalProps((prev) => ({ ...prev, show: true, title: 'Create New' }));
   };
   const onSearchFormReset = () => {
      searchForm.resetFields();
   };
   const onEdit = (formValue: SalesChannel) => {
      setSalesChannelModalProps((prev) => ({
         ...prev,
         show: true,
         title: 'Edit',
         formValue,
      }));
   };

   return (
      <Space direction="vertical" size="large" className="w-full">
         <Card>
            <Form form={searchForm}>
               <Row gutter={[16, 16]}>
                  <Col span={24} lg={6}>
                     <Form.Item<SearchFormFieldType> label="Tên NCC" name="name" className="!mb-0">
                        <Input />
                     </Form.Item>
                  </Col>
                  <Col span={24} lg={6}>
                     <Form.Item<SearchFormFieldType> label="Điện thoại" name="phone" className="!mb-0">
                        <Input />
                     </Form.Item>
                  </Col>
                  <Col span={24} lg={12}>
                     <div className="flex justify-end">
                        <Button onClick={onSearchFormReset}>Reset</Button>
                        <Button type="primary" className="ml-4">
                           Search
                        </Button>
                     </div>
                  </Col>
               </Row>
            </Form>
         </Card>
         <Card
            title="Supplier List"
            extra={
               <Button type="primary" onClick={onCreate}>
                  New
               </Button>
            }
         >
            <Table
               rowKey="SaleChannel_id"
               size="small"
               scroll={{ x: 'max-content' }}
               pagination={false}
               columns={columns}
               dataSource={SaleChannelData}
               rowSelection={rowSelection}
            />
         </Card>

         <SalesChannelModal {...salesChannelModalProps} />
      </Space>
   );
}

type SalesChannelModalProps = {
   formValue: SalesChannel;
   title: string;
   show: boolean;
   onOk: () => void;
   onCancel: () => void;
};
function SalesChannelModal({ title, show, formValue, onOk, onCancel }: SalesChannelModalProps) {
   const [form] = Form.useForm();

   useEffect(() => {
      form.setFieldsValue({ ...formValue });
   }, [formValue, form]);

   return (
      <Modal title={title} open={show} onOk={onOk} onCancel={onCancel}>
         <Form
            form={form}
            layout="horizontal"
            initialValues={formValue || {}}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
         >
            <Form.Item<SalesChannel> label="Tên NCC" name="name" required>
               <Input />
            </Form.Item>
            <Form.Item<SalesChannel> label="Địa chỉ" name="address" required>
               <Input />
            </Form.Item>
            <Form.Item<SalesChannel> label="Phường/Xã" name="ward" required>
               <Select></Select>
            </Form.Item>
            <Form.Item<SalesChannel> label="Khu vực GH" name="deliveryArea" required>
               <Select></Select>
            </Form.Item>
            <Form.Item<SalesChannel> label="Điện thoại" name="phone" required>
               <Input />
            </Form.Item>
            <Form.Item<SalesChannel> label="Email" name="email" required>
               <Input />
            </Form.Item>
            <Form.Item<SalesChannel> label="Công ty" name="company" required>
               <Input />
            </Form.Item>
            <Form.Item<SalesChannel> label="Nhóm NCC" name="supplierGroup" required>
               <Input />
            </Form.Item>
            <Form.Item<SalesChannel> label="Người tạo" name="creator" required>
               <Input />
            </Form.Item>
            <Form.Item<SalesChannel> label="Ghi chú" name="notes">
               <Input.TextArea />
            </Form.Item>
         </Form>
      </Modal>
   );
}
