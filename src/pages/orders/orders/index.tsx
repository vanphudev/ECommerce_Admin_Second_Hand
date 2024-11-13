import { App, Button, Card, Popconfirm, Avatar, Tooltip, Table, Input, Typography, Empty, Spin } from 'antd';
import { createStyles } from 'antd-style';
import { useState, useEffect } from 'react';
import { IconButton, Iconify } from '@/components/icon';
import { Order, OrderDetails } from '@/pages/orders/orders/entity';
import ProTag from '@/theme/antd/components/tag';
import { OrderModal, OrderModalProps } from './orderModal';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useCopyToClipboard } from '@/hooks/event/use-copy-to-clipboard';
import { orderData } from '@/_mock/_mock_order';
const { Text } = Typography;

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

const DEFAULE_ORDER_VALUE: Order = {
   order_id: '',
   store: {
      store_id: '',
      store_name: '',
      store_address: {
         street: '',
         city: '',
         district: '',
         ward: '',
      },
      store_phone: '',
      store_email: '',
      store_image: '',
   },
   customer: {
      customer_id: '',
      customer_image: '',
      name: '',
      phone: '',
      gender: 'Nam',
      email: '',
      address: {
         street: '',
         city: '',
         district: '',
         ward: '',
      },
   },
   items: [],
   order_details: {
      total_items: 0,
      total_price: '',
      order_date: '',
      order_note: '',
      payment_method: 'COD',
      order_status: '',
      voucher: null,
      discount_rate: '',
      discount_amount: '',
      final_price: '',
   },
   shipping: {
      shipping_address: {
         street: '',
         city: '',
         district: '',
         ward: '',
      },
      shipping_fee: 0,
      shipping_method: 'Standard',
      estimated_delivery_date: '',
   },
   device: {
      device_type: 'Mobile',
      operating_system: 'iOS',
      browser: '',
      ip_address: '',
   },
};

function CopyButton({ value }: { value: string }) {
   const { copyFn } = useCopyToClipboard();
   return (
      <Tooltip title="Copy">
         <IconButton className="text-gray" onClick={() => copyFn(value)}>
            <Iconify icon="eva:copy-fill" size={20} />
         </IconButton>
      </Tooltip>
   );
}

export default function Orders() {
   const { notification } = App.useApp();
   const { styles } = useStyle();
   const [loading, setLoading] = useState(true);
   const [loadingDelete, setLoadingDelete] = useState(false);
   const [error, setError] = useState(null);
   const [orders, setOrders] = useState<Order[]>([]);

   const handleDelete = (id: number) => {
      notification.success({
         message: `Delete Order Success by Id ${id} !`,
         duration: 3,
      });
   };

   useEffect(() => {
      setLoading(true);
      setOrders(orderData as Order[]);
      setLoading(false);
   }, []);

   const [orderModalPros, setOrderModalProps] = useState<OrderModalProps>({
      formValue: {
         ...DEFAULE_ORDER_VALUE,
      },
      title: 'New Create Order',
      show: false,
      isCreate: true,
      onOk: () => {
         setOrderModalProps((prev) => ({ ...prev, show: false }));
      },
      onCancel: () => {
         setOrderModalProps((prev) => ({ ...prev, show: false }));
      },
   });

   const columns: ColumnsType<Order> = [
      Table.EXPAND_COLUMN,
      {
         title: 'Order ID',
         dataIndex: 'order_id',
         fixed: 'left',
         sorter: (a, b) => a.order_id.localeCompare(b.order_id),
         ellipsis: {
            showTitle: false,
         },
         render: (order_id) => (
            <Tooltip placement="topLeft" title={order_id}>
               {order_id}
            </Tooltip>
         ),
      },
      {
         title: 'Store',
         dataIndex: 'store',
         align: 'center',
         render: (store) => {
            if (!store || !store.store_image) {
               return <Empty style={{ margin: 0 }} imageStyle={{ height: 30 }} image={Empty.PRESENTED_IMAGE_SIMPLE} />;
            }
            return (
               <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <Avatar.Group maxCount={3} size="large">
                     {store.store_image.split(',').map((image: string, index: number) => (
                        <Avatar key={index} src={image} alt={`Store Image ${index + 1}`} />
                     ))}
                  </Avatar.Group>
                  <div style={{ marginTop: 8, fontWeight: 'bold' }}>{store.store_name}</div>
               </div>
            );
         },
         fixed: 'left',
      },
      {
         title: 'Customer',
         dataIndex: 'customer',
         align: 'center',
         render: (customer) => (
            <Input
               suffix={<CopyButton value={customer.name} />}
               value={customer.name}
               readOnly
               style={{ width: '100%', textAlign: 'center' }}
            />
         ),
      },
      {
         title: 'Order Status',
         align: 'center',
         dataIndex: 'order_details',
         filters: [
            { text: 'Chờ xác nhận', value: 'Chờ xác nhận' },
            { text: 'Đã tiếp nhận đơn', value: 'Đã tiếp nhận đơn' },
            { text: 'Đang xử lý', value: 'Đang xử lý' },
            { text: 'Đang đóng gói', value: 'Đang đóng gói' },
            { text: 'Đã bàn giao vận chuyển', value: 'Đã bàn giao vận chuyển' },
            { text: 'Đang vận chuyển', value: 'Đang vận chuyển' },
            { text: 'Đã giao', value: 'Đã giao' },
            { text: 'Đã hủy', value: 'Đã hủy' },
         ],
         onFilter: (value, record) => record.order_details.order_status.includes(value as string),
         render: (orderDetails: OrderDetails) => {
            const { order_status } = orderDetails;
            let color;
            switch (order_status) {
               case 'Chờ xác nhận':
                  color = 'gray';
                  break;
               case 'Đã tiếp nhận đơn':
                  color = 'blue';
                  break;
               case 'Đang xử lý':
                  color = 'orange';
                  break;
               case 'Đang đóng gói':
                  color = 'purple';
                  break;
               case 'Đã bàn giao vận chuyển':
                  color = 'geekblue';
                  break;
               case 'Đang vận chuyển':
                  color = 'cyan';
                  break;
               case 'Đã giao':
                  color = 'green';
                  break;
               case 'Đã hủy':
                  color = 'red';
                  break;
               default:
                  color = 'default';
                  break;
            }
            return <ProTag color={color}>{order_status}</ProTag>;
         },
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
                  title="Delete the Order ?"
                  okText="Yes"
                  cancelText="No"
                  placement="left"
                  onCancel={() => {}}
                  onConfirm={() => handleDelete(Number(record.order_id))}
               >
                  <IconButton>
                     <Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
                  </IconButton>
               </Popconfirm>
            </div>
         ),
      },
   ];

   const onCreate = () => {
      setOrderModalProps((prev) => ({
         ...prev,
         show: true,
         title: 'Create New Order',
         isCreate: true,
         formValue: {
            ...prev.formValue,
            ...DEFAULE_ORDER_VALUE,
         },
      }));
   };

   const onEdit = (formValue: Order) => {
      setOrderModalProps((prev) => ({
         ...prev,
         show: true,
         title: 'Edit Order',
         isCreate: false,
         formValue,
      }));
   };

   const expandColumns: ColumnsType<Order> = [
      {
         title: 'Shipping',
         key: 'shipping',
         fixed: 'left',
         width: 300,
         render: (_, record) => {
            const { street, city, district, ward } = record.shipping.shipping_address;
            const { shipping_fee, shipping_method, estimated_delivery_date } = record.shipping;
            return (
               <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ fontWeight: 'bold' }}>Address:</div>
                  <div>{street}</div>
                  <div>{`${ward}, ${district}, ${city}`}</div>
                  <div style={{ fontWeight: 'bold', marginTop: 8 }}>Shipping Details:</div>
                  <div>
                     <strong>Fee:</strong> {shipping_fee} VND
                  </div>
                  <div>
                     <strong>Method:</strong> {shipping_method}
                  </div>
                  <div>
                     <strong>Estimated Delivery:</strong> {dayjs(estimated_delivery_date).format('DD/MM/YYYY')}
                  </div>
               </div>
            );
         },
      },
      {
         title: 'Order Details',
         align: 'center',
         key: 'order_details',
         render: (_, record) => {
            const {
               total_items,
               total_price,
               order_date,
               order_note,
               payment_method,
               order_status,
               voucher,
               discount_rate,
               discount_amount,
               final_price,
            } = record.order_details as OrderDetails;
            return (
               <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 8 }}>
                  {record.order_details ? (
                     <div style={{ textAlign: 'left', marginTop: 8 }}>
                        <p>
                           <strong>Total Items:</strong> {total_items}
                        </p>
                        <p>
                           <strong>Total Price:</strong> {total_price}
                        </p>
                        <p>
                           <strong>Order Note:</strong> {order_note}
                        </p>
                        <p>
                           <strong>Payment Method:</strong> {payment_method}
                        </p>
                        <p>
                           <strong>Voucher:</strong> {voucher || 'N/A'}
                        </p>
                        <p>
                           <strong>Discount Rate:</strong> {discount_rate}
                        </p>
                        <p className="flex items-center gap-3">
                           <strong>Order Status:</strong>
                           {order_status === 'Chờ xác nhận' && (
                              <span style={{ color: 'gray', display: 'flex', alignItems: 'center' }}>
                                 <Iconify icon="mdi:clock-outline" /> &nbsp; {order_status}
                              </span>
                           )}
                           {order_status === 'Đã tiếp nhận đơn' && (
                              <span style={{ color: 'blue', display: 'flex', alignItems: 'center' }}>
                                 <Iconify icon="mdi:account-check-outline" /> &nbsp; {order_status}
                              </span>
                           )}
                           {order_status === 'Đang xử lý' && (
                              <span style={{ color: 'orange', display: 'flex', alignItems: 'center' }}>
                                 <Iconify icon="mdi:progress-wrench" /> &nbsp; {order_status}
                              </span>
                           )}
                           {order_status === 'Đang đóng gói' && (
                              <span style={{ color: 'purple', display: 'flex', alignItems: 'center' }}>
                                 <Iconify icon="mdi:package-variant-closed" /> &nbsp; {order_status}
                              </span>
                           )}
                           {order_status === 'Đã bàn giao vận chuyển' && (
                              <span style={{ color: 'geekblue', display: 'flex', alignItems: 'center' }}>
                                 <Iconify icon="mdi:truck-outline" /> &nbsp; {order_status}
                              </span>
                           )}
                           {order_status === 'Đang vận chuyển' && (
                              <span style={{ color: 'cyan', display: 'flex', alignItems: 'center' }}>
                                 <Iconify icon="mdi:truck-fast-outline" /> &nbsp; {order_status}
                              </span>
                           )}
                           {order_status === 'Đã giao' && (
                              <span style={{ color: 'green', display: 'flex', alignItems: 'center' }}>
                                 <Iconify icon="mdi:check-circle-outline" /> &nbsp; {order_status}
                              </span>
                           )}
                           {order_status === 'Đã hủy' && (
                              <span style={{ color: 'red', display: 'flex', alignItems: 'center' }}>
                                 <Iconify icon="mdi:close-circle-outline" /> &nbsp; {order_status}
                              </span>
                           )}
                        </p>
                        <p>
                           <strong>Discount Amount:</strong> {discount_amount}
                        </p>
                        <p>
                           <strong>Final Price:</strong> {final_price}
                        </p>
                     </div>
                  ) : (
                     <Empty style={{ margin: 0 }} imageStyle={{ height: 30 }} image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  )}
               </div>
            );
         },
      },
      {
         title: 'Store',
         dataIndex: 'store',
         align: 'center',
         render: (store) => {
            if (!store) {
               return <Empty style={{ margin: 0 }} imageStyle={{ height: 30 }} image={Empty.PRESENTED_IMAGE_SIMPLE} />;
            }
            const { store_id, store_name, store_address, store_phone, store_email, store_image } = store;
            return (
               <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 8 }}>
                  <Avatar.Group maxCount={3} size="large">
                     {store_image &&
                        store_image
                           .split(',')
                           .map((image: string, index: number) => (
                              <Avatar key={index} src={image} alt={`Store Image ${index + 1}`} />
                           ))}
                  </Avatar.Group>
                  <div>
                     <strong>Store ID:</strong> {store_id}
                  </div>
                  <div>
                     <strong>Name:</strong> {store_name}
                  </div>
                  <div>
                     <strong>Phone:</strong> {store_phone}
                  </div>
                  <div>
                     <strong>Email:</strong> {store_email}
                  </div>
                  <div>
                     <strong>Address:</strong>{' '}
                     {`${store_address.street}, ${store_address.ward}, ${store_address.district}, ${store_address.city}`}
                  </div>
               </div>
            );
         },
         fixed: 'left',
      },
   ];

   const renderExpandedRow = (record: Order) => (
      <div>
         <Table<Order> columns={expandColumns} dataSource={[record]} pagination={false} />
      </div>
   );

   const content = (
      <Table
         className={styles.customTable}
         rowKey={(record) => record.order_id.toString()}
         style={{ width: '100%', flex: 1 }}
         size="small"
         scroll={{ y: 'calc(100vh - 300px)' }}
         pagination={{
            size: 'default',
            total: orders?.length || 0,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Total ${total} items`,
         }}
         columns={columns as ColumnsType<Order>}
         expandable={{ expandedRowRender: renderExpandedRow, defaultExpandedRowKeys: ['0'] }}
         dataSource={error ? [] : orders || []}
         loading={loading}
      />
   );

   return (
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
         <Spin spinning={loadingDelete} tip="Deleting..." size="large" fullscreen>
            {loadingDelete && content}
         </Spin>
         {content}
         <OrderModal {...orderModalPros} />
      </Card>
   );
}
