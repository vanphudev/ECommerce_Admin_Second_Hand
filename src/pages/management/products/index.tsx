import { DeleteOutlined, SearchOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Pagination, Space, Table } from 'antd';

import { PRODUCT_LIST } from '@/_mock/product';

import './styles/product.scss';

function Products() {
   const columns = [
      {
         title: 'ID SẢN PHẨM',
         dataIndex: 'id',
         key: 'id',
         render: (text: string | undefined) => <span className="product-id">{text}</span>,
      },
      {
         title: 'TÊN SẢN PHẨM',
         dataIndex: 'productName',
         key: 'productName',
      },
      {
         title: 'LOẠI',
         dataIndex: 'typeProduct',
         key: 'typeProduct',
      },
      {
         title: 'ẢNH',
         dataIndex: 'imageProduct',
         key: 'imageProduct',
         render: (imageProduct: string | undefined) => (
            <img src={imageProduct} alt="Product" className="product-image" />
         ),
      },
      {
         title: 'GIÁ TIỀN',
         dataIndex: 'price',
         key: 'price',
         render: (price: number | undefined) => <span>{(price ?? 0).toLocaleString()} VND</span>,
      },
      {
         title: 'TỒN KHO',
         dataIndex: 'inventory',
         key: 'inventory',
      },
      {
         title: 'MÔ TẢ',
         dataIndex: 'description',
         key: 'description',
         ellipsis: true,
      },
      {
         title: 'ĐÃ BÁN',
         dataIndex: 'sold',
         key: 'sold',
      },
      {
         title: '',
         key: 'actions',
         render: () => (
            <Space>
               <Button icon={<EditOutlined />} className="action-button edit-button" />
               <Button icon={<DeleteOutlined />} danger className="action-button delete-button" />
            </Space>
         ),
      },
   ];

   return (
      <div>
         <div className="orders-container">
            <Space className="orders-header" size="large">
               <Button danger>Xóa</Button>
               <Button type="primary">
                  <PlusOutlined /> Thêm sản phẩm
               </Button>
            </Space>
            <Table
               columns={columns}
               dataSource={PRODUCT_LIST.map((item) => ({ ...item, key: item.id }))}
               pagination={{ pageSize: 7 }}
               rowSelection={{ type: 'checkbox' }}
               className="orders-table"
            />
         </div>
      </div>
   );
}

export default Products;
