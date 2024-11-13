import { Button, Card, Modal, Space, Table, Popconfirm, Form, Input, Row, Col, Select, message } from 'antd';
import { SaleChannelData } from '@/_mock/_mock_sale-channel';
import { IconButton, Iconify } from '@/components/icon';
import { SalesChannel } from '#/entity';
import { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { createStyles } from 'antd-style';
import { TableRowSelection } from 'antd/es/table/interface';

const useStyle = createStyles(({ css }) => ({
   customTable: css`
      .ant-table {
         .ant-table-container {
            .ant-table-body,
            .ant-table-content {
               scrollbar-width: thin;
               scrollbar-color: #939393 transparent;
               scrollbar-gutter: stable;
            }
         }
      }
   `,
}));
export default function SalesChannelPage() {
   const { styles } = useStyle();
   const [salesChannelModalProps, setSalesChannelModalProps] = useState<SalesChannelModalProps>({
      title: 'New',
      show: false,
      formValue: {
         id: '',
         name: '',
         street: '',
         ward: '',
         city: '',
         phone: '',
         email: '',
         company: '',
         supplierGroup: '',
         creator_name: '',
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
               <Popconfirm
                  title="Bạn muốn xóa nhà cung cấp này?"
                  okText="Yes"
                  cancelText="No"
                  placement="left"
                  onConfirm={handleDelete}
               >
                  <IconButton>
                     <Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
                  </IconButton>
               </Popconfirm>
            </div>
         ),
      },
   ];

   const rowSelection: TableRowSelection<SalesChannel> = {
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

   const onEdit = (formValue: SalesChannel) => {
      setSalesChannelModalProps((prev) => ({
         ...prev,
         show: true,
         title: 'Edit',
         formValue,
      }));
   };
   const handleDelete = () => {
      message.success('Đã xóa kênh bán bàng!');
   };
   return (
      <Space direction="vertical" size="large" className="w-full">
         <Card
            style={{ maxHeight: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column' }}
            styles={{ body: { padding: '0', flex: 1, display: 'flex', flexDirection: 'column' } }}
            title="Supplier List"
            extra={
               <Button type="primary" onClick={onCreate}>
                  New
               </Button>
            }
         >
            <Table
               className={styles.customTable}
               rowKey="SaleChannel_id"
               style={{ width: '100%', flex: 1 }}
               size="small"
               scroll={{ y: 'calc(100vh - 300px)' }}
               pagination={{
                  size: 'default',
                  total: SaleChannelData?.length || 0,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total) => `Total ${total} items`,
               }}
               columns={columns as ColumnsType<any>}
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
      <Modal title={title} open={show} onOk={onOk} onCancel={onCancel} width={700} style={{ maxWidth: '100%' }}>
         <Form
            form={form}
            layout="vertical"
            initialValues={formValue || {}}
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 22 }}
            style={{ maxHeight: '60vh', overflowY: 'auto' }}
         >
            <Form.Item<SalesChannel> label="Tên nhà cung cấp" name="name" required>
               <Input placeholder="Nhập tên nhà cung cấp" />
            </Form.Item>

            <Form.Item<SalesChannel> label="Địa chỉ" name="street" required>
               <Input placeholder="Nhập địa chỉ" />
            </Form.Item>

            <Row gutter={30}>
               <Col span={10}>
                  <Form.Item<SalesChannel> label="Phường/Xã" name="ward" required>
                     <Select placeholder="Chọn phường/xã">
                        <Select.Option value="1">Phường 11</Select.Option>
                        <Select.Option value="2">Phường 12</Select.Option>
                     </Select>
                  </Form.Item>
               </Col>
               <Col span={13}>
                  <Form.Item<SalesChannel> label="Khu vực giao hàng" name="city" required>
                     <Select placeholder="Chọn khu vực giao hàng">
                        <Select.Option value="1">TP.HCM</Select.Option>
                        <Select.Option value="2">Hà Nội</Select.Option>
                     </Select>
                  </Form.Item>
               </Col>
            </Row>

            <Form.Item<SalesChannel>
               label="Điện thoại"
               name="phone"
               rules={[{ pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ' }]}
               required
            >
               <Input placeholder="Nhập số điện thoại" />
            </Form.Item>

            <Form.Item<SalesChannel>
               label="Email"
               name="email"
               rules={[{ type: 'email', message: 'Email không hợp lệ' }]}
               required
            >
               <Input placeholder="Nhập địa chỉ email" />
            </Form.Item>

            <Form.Item<SalesChannel> label="Công ty" name="company" required>
               <Input placeholder="Nhập tên công ty" />
            </Form.Item>

            <Form.Item<SalesChannel> label="Nhóm nhà cung cấp" name="supplierGroup" required>
               <Input placeholder="Nhập nhóm nhà cung cấp" />
            </Form.Item>

            <Form.Item<SalesChannel> label="Người tạo" name="creator_name" required>
               <Input placeholder="Nhập tên người tạo" />
            </Form.Item>

            <Form.Item<SalesChannel> label="Ghi chú" name="notes">
               <Input.TextArea placeholder="Ghi chú thêm" rows={5} />
            </Form.Item>
         </Form>
      </Modal>
   );
}
