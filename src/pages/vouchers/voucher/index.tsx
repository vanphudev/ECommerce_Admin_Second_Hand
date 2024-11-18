import { useState, useEffect } from 'react';
import { Table, Tag, Popconfirm, notification, Card, Button } from 'antd';
import { IconButton, Iconify } from '@/components/icon';
import { ColumnsType } from 'antd/es/table';
import { generateVoucherData } from '@/_mock/_mock_voucher';
import dayjs from 'dayjs';
import { Voucher } from './enity';
import { VoucherModal, VoucherModalProps } from './voucherModal';
const DEFAULE_VOUCHER_VALUE: Voucher = {
   voucher_id: '',
   voucher_name: '',
   description: '',
   discount_rate: 0,
   expired_at: new Date(),
   is_active: true,
};
export default function VoucherScreen() {
   const [vouchers, setVouchers] = useState<Voucher[]>([]);
   const [loading, setLoading] = useState(false);
   const [voucherModalPros, setVoucherModalProps] = useState<VoucherModalProps>({
      formValue: {
         ...DEFAULE_VOUCHER_VALUE,
      },
      title: 'New Create Voucher',
      show: false,
      isCreate: true,
      onOk: () => {
         setVoucherModalProps((prev) => ({ ...prev, show: false }));
      },
      onCancel: () => {
         setVoucherModalProps((prev) => ({ ...prev, show: false }));
      },
   });
   const onCreate = () => {
      setVoucherModalProps((prev) => ({ ...prev, show: true }));
   };
   const onEdit = (record: Voucher) => {
      setVoucherModalProps((prev) => ({ ...prev, show: true, formValue: record }));
   };
   const handleDelete = (voucherId: string) => {
      notification.success({
         message: 'Delete Voucher',
         description: `Delete Voucher Successfully ${voucherId}`,
      });
   };
   useEffect(() => {
      setLoading(true);
      setVouchers(generateVoucherData(105) as unknown as Voucher[]);
      setLoading(false);
   }, []);
   const columns: ColumnsType<Voucher> = [
      { title: 'Voucher ID', dataIndex: 'voucher_id', key: 'voucher_id' },
      {
         title: 'Voucher Name',
         dataIndex: 'voucher_name',
         key: 'voucher_name',
         sorter: (a, b) => a.voucher_name.localeCompare(b.voucher_name),
      },
      { title: 'Description', dataIndex: 'description', key: 'description' },
      { title: 'Discount Rate', dataIndex: 'discount_rate', key: 'discount_rate' },
      {
         title: 'Expired At',
         dataIndex: 'expired_at',
         key: 'expired_at',
         render: (expiredAt) => dayjs(expiredAt).format('DD/MM/YYYY'),
      },
      {
         title: 'Is Active',
         dataIndex: 'is_active',
         key: 'is_active',
         filters: [
            { text: 'Active', value: true },
            { text: 'Inactive', value: false },
         ],
         onFilter: (value, record) => record.is_active === value,
         align: 'center',
         render: (isActive) => (isActive ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>),
      },
      {
         title: 'Action',
         key: 'operation',
         align: 'center',
         width: 100,
         fixed: 'right',
         render: (_, record) => (
            <div className="flex w-full justify-center text-gray">
               <IconButton onClick={() => onEdit(record)}>
                  <Iconify icon="solar:pen-bold-duotone" size={18} />
               </IconButton>
               <Popconfirm
                  title="Delete the Voucher ?"
                  okText="Yes"
                  cancelText="No"
                  placement="left"
                  onCancel={() => {}}
                  onConfirm={() => handleDelete(record.voucher_id)}
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
         {' '}
         <Card
            style={{ maxHeight: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column' }}
            styles={{ body: { padding: '0', flex: 1, display: 'flex', flexDirection: 'column' } }}
            title="Office List"
            extra={
               <Button type="primary" onClick={onCreate}>
                  New
               </Button>
            }
         >
            <Table
               rowKey={(record) => record.voucher_id.toString()}
               style={{ width: '100%', flex: 1 }}
               size="small"
               scroll={{ y: 'calc(100vh - 300px)' }}
               pagination={{
                  size: 'default',
                  total: vouchers?.length || 0,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total) => `Total ${total} items`,
               }}
               columns={columns as ColumnsType<Voucher>}
               dataSource={vouchers}
               loading={loading}
            />
         </Card>
         <VoucherModal {...voucherModalPros} />
      </>
   );
}
