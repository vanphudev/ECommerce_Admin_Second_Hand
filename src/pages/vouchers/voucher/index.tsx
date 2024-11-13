import {
   Button,
   Card,
   Modal,
   Space,
   Table,
   Popconfirm,
   Form,
   Input,
   Select,
   Switch,
   InputNumber,
   Row,
   Col,
   message,
} from 'antd';
import { VoucherData } from '@/_mock/_mock_voucher';
import { IconButton, Iconify } from '@/components/icon';
import { Voucher } from '#/entity';
import { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { createStyles } from 'antd-style';
import { TableRowSelection } from 'antd/es/table/interface';
import ProTag from '@/theme/antd/components/tag';

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
export default function VoucherPage() {
   const { styles } = useStyle();
   const [voucherModalProps, setvoucherModalProps] = useState<VoucherModalProps>({
      title: 'New',
      show: false,
      formValue: {
         code: '',
         name: '',
         type: 'Giảm giá theo phần trăm',
         value: '',
         startDate: '',
         endDate: '',
         maxUsage: 0,
         conditions: '',
         status: 'Hoạt động',
         userType: 'Tất cả khách hàng',
         isSingleUse: false,
         description: '',
      },
      onOk: () => setvoucherModalProps((prev) => ({ ...prev, show: false })),
      onCancel: () => setvoucherModalProps((prev) => ({ ...prev, show: false })),
   });

   const columns: ColumnsType<Voucher> = [
      { title: 'Mã Voucher', dataIndex: 'voucherCode', width: 100 },
      { title: 'Tên voucher', dataIndex: 'voucherName', width: 200 },
      { title: 'Loại voucher', dataIndex: 'voucherType', width: 200 },
      { title: 'Ngày có hiệu lực', dataIndex: 'startDate', width: 120 },
      { title: 'Ngày hết hạn', dataIndex: 'endDate', width: 100 },
      { title: 'Số lượng', dataIndex: 'maxUsage', width: 90, align: 'center' },
      {
         title: 'Trạng thái',
         dataIndex: 'status',
         width: 110,
         render: (status) => {
            let color = '';
            if (status === 'Hoạt động') {
               color = 'success';
            } else if (status === 'Hết hạn') {
               color = 'error';
            }
            return <ProTag color={color}>{status}</ProTag>;
         },
      },
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
                  title="Bạn muốn xóa Voucher này?"
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

   const rowSelection: TableRowSelection<Voucher> = {
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
      setvoucherModalProps((prev) => ({ ...prev, show: true, title: 'Create New' }));
   };

   const onEdit = (formValue: Voucher) => {
      setvoucherModalProps((prev) => ({
         ...prev,
         show: true,
         title: 'Edit',
         formValue,
      }));
   };

   const handleDelete = () => {
      message.success('Đã xóa voucher!');
   };
   return (
      <Space direction="vertical" size="large" className="w-full">
         <Card
            style={{ maxHeight: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column' }}
            styles={{ body: { padding: '0', flex: 1, display: 'flex', flexDirection: 'column' } }}
            title="Voucher List"
            extra={
               <Button type="primary" onClick={onCreate}>
                  New
               </Button>
            }
         >
            <Table
               className={styles.customTable}
               rowKey="voucherCode"
               style={{ width: '100%', flex: 1 }}
               size="small"
               scroll={{ y: 'calc(100vh - 300px)' }}
               pagination={{
                  size: 'default',
                  total: VoucherData?.length || 0,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total) => `Total ${total} items`,
               }}
               columns={columns as ColumnsType<any>}
               dataSource={VoucherData}
               rowSelection={rowSelection}
            />
         </Card>
         <VoucherModal {...voucherModalProps} />
      </Space>
   );
}

type VoucherModalProps = {
   formValue: Voucher;
   title: string;
   show: boolean;
   onOk: () => void;
   onCancel: () => void;
};
function VoucherModal({ title, show, formValue, onOk, onCancel }: VoucherModalProps) {
   const [form] = Form.useForm();

   useEffect(() => {
      form.setFieldsValue({ ...formValue });
   }, [formValue, form]);

   return (
      <Modal title={title} open={show} onOk={onOk} onCancel={onCancel} width={600}>
         <Form
            form={form}
            layout="vertical"
            initialValues={formValue || {}}
            labelCol={{ span: 20 }}
            wrapperCol={{ span: 22 }}
            style={{ maxHeight: '60vh', overflowY: 'auto' }}
         >
            <Form.Item<Voucher> label="Tên voucher" name="name" required>
               <Input placeholder="Nhập tên voucher" />
            </Form.Item>

            <Form.Item<Voucher> label="Loại voucher" name="type" required>
               <Select>
                  <Select.Option value="Giảm giá theo phần trăm">Giảm giá theo phần trăm</Select.Option>
                  <Select.Option value="Giảm giá theo số tiền">Giảm giá theo số tiền</Select.Option>
                  <Select.Option value="Miễn phí vận chuyển">Miễn phí vận chuyển</Select.Option>
               </Select>
            </Form.Item>
            <Row gutter={40}>
               <Col span={8}>
                  <Form.Item<Voucher> label="Giá trị voucher" name="value" required>
                     <Input placeholder="Nhập giá trị voucher" />
                  </Form.Item>
               </Col>
               <Col span={8}>
                  <Form.Item<Voucher> label="Số lượt tối đa" name="maxUsage" required>
                     <InputNumber min={1} />
                  </Form.Item>
               </Col>
               <Col span={8}>
                  <Form.Item<Voucher> label="Chỉ sử dụng 1 lần" name="isSingleUse" valuePropName="checked">
                     <Switch />
                  </Form.Item>
               </Col>
            </Row>

            <Row gutter={20}>
               <Col span={11}>
                  <Form.Item<Voucher> label="Ngày bắt đầu" name="startDate" required>
                     <Input type="date" />
                  </Form.Item>
               </Col>
               <Col span={12}>
                  <Form.Item<Voucher> label="Ngày kết thúc" name="endDate" required>
                     <Input type="date" />
                  </Form.Item>
               </Col>
            </Row>

            <Form.Item<Voucher> label="Điều kiện sử dụng" name="conditions" required>
               <Input.TextArea placeholder="Nhập điều kiện sử dụng voucher" />
            </Form.Item>

            <Form.Item<Voucher> label="Trạng thái" name="status" required>
               <Select>
                  <Select.Option value="Hoạt động">Hoạt động</Select.Option>
                  <Select.Option value="Hết hạn">Hết hạn</Select.Option>
                  <Select.Option value="Chưa áp dụng">Chưa áp dụng</Select.Option>
               </Select>
            </Form.Item>

            <Form.Item<Voucher> label="Loại người dùng" name="userType" required>
               <Select>
                  <Select.Option value="Tất cả khách hàng">Tất cả khách hàng</Select.Option>
                  <Select.Option value="Khách hàng mới">Khách hàng mới</Select.Option>
                  <Select.Option value="Khách hàng cũ">Khách hàng cũ</Select.Option>
               </Select>
            </Form.Item>

            <Form.Item<Voucher> label="Mô tả" name="description">
               <Input.TextArea placeholder="Nhập mô tả voucher" />
            </Form.Item>
         </Form>
      </Modal>
   );
}
