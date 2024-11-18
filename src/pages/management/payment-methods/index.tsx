import { useState, useEffect } from 'react';
import { generatePaymentData } from '@/_mock/_mock_payment';
import { Payment} from './enity';
import { Table, Tag, Popconfirm, notification, Card, Button } from 'antd';
import { IconButton, Iconify } from '@/components/icon';
import { ColumnsType } from 'antd/es/table';
import { PaymentModal, PaymentModalProps } from './paymentModal';

const DEFAULE_PAYMENT_VALUE: Payment = {
   payment_id: '',
   order_id: '',
   amount: 0,
   method: 'COD',
   status: 'Pending',
};

export default function PaymentScreen() {
   const [payments, setPayments] = useState<Payment[]>([]);
   const [loading, setLoading] = useState(false);
   const [paymentModalPros, setPaymentModalProps] = useState<PaymentModalProps>({
      formValue: {
         ...DEFAULE_PAYMENT_VALUE,
      },
      title: 'New Create Voucher',
      show: false,
      isCreate: true,
      onOk: () => {
         setPaymentModalProps((prev) => ({ ...prev, show: false }));
      },
      onCancel: () => {
         setPaymentModalProps((prev) => ({ ...prev, show: false }));
      },
   });


   const onEdit = (record: Payment) => {
      setPaymentModalProps((prev) => ({ ...prev, show: true, formValue: record }));

   };

   const handleDelete = (paymentId: string) => {
      notification.success({
         message: 'Delete Payment',
         description: `Delete Payment Successfully ${paymentId}`,
      });
   };

   useEffect(() => {
      setLoading(true);
      setPayments(generatePaymentData(105) as unknown as Payment[]);
      setLoading(false);
   }, []);

   const onCreate = () => {
      setPaymentModalProps((prev) => ({ ...prev, show: true }));
   };

   const columns: ColumnsType<Payment> = [
      { title: 'Payment ID', dataIndex: 'payment_id', key: 'payment_id' },
      { title: 'Order ID', dataIndex: 'order_id', key: 'order_id' },
      { title: 'Amount', dataIndex: 'amount', key: 'amount', align: 'center'},
      { title: 'Method', dataIndex: 'method', key: 'method', sorter: (a, b) => a.method.localeCompare(b.method),},
      { title: 'Status', dataIndex: 'status', key: 'status',
         filters: [
            { text: 'Pending', value: 'Pending' },
            { text: 'Completed', value: 'Completed' },
            { text: 'Failed', value: 'Failed' },
         ],
         onFilter: (value, record) => record.status.includes(value as string),
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
                  onConfirm={() => handleDelete(record.payment_id)}
               >
                  <IconButton>
                     <Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
                  </IconButton>
               </Popconfirm>
            </div>
         ),
      },
   ];


   return <>
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
         rowKey={(record) => record.payment_id.toString()}
         style={{ width: '100%', flex: 1 }}
         size="small"
         scroll={{ y: 'calc(100vh - 300px)' }}
         pagination={{
            size: 'default',
            total: payments?.length || 0,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Total ${total} items`,
         }}
         columns={columns as ColumnsType<Payment>}
         dataSource={payments}
         loading={loading}
      />
      </Card>
      <PaymentModal {...paymentModalPros} />
      </>
}



