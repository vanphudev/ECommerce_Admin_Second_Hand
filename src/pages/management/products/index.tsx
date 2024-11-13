import { DeleteOutlined, EditOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Modal, Popconfirm, Space, Table, Upload } from 'antd';
import { useState } from 'react';
import { PRODUCT_LIST } from '@/_mock/product';

import './styles/product.scss';

interface Product {
   id: string;
   productName: string;
   typeProduct: string;
   imageProduct: string;
   price: number;
   inventory: number;
   description: string;
   sold: number;
}

function Products() {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
   const [form] = Form.useForm();
   const [addForm] = Form.useForm(); // Form cho modal thêm sản phẩm mới
   const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

   // Mở modal chỉnh sửa
   const openModalEdit = (product: Product) => {
      setCurrentProduct(product);
      form.setFieldsValue(product);
      setIsModalOpen(true);
   };

   // Mở modal thêm sản phẩm mới
   const openModalAdd = () => {
      addForm.resetFields(); // Reset form khi mở modal
      setIsAddModalOpen(true);
   };

   // Hàm xử lý xóa sản phẩm
   const handleDelete = (productId: string) => {
      console.log('Delete product', productId);
   };

   // Hàm xử lý thêm sản phẩm mới
   const handleAddProduct = () => {
      addForm
         .validateFields()
         .then((values) => {
            console.log('Add new product:', values);
            // Thực hiện thêm sản phẩm mới vào danh sách hoặc API
            setIsAddModalOpen(false); // Đóng modal sau khi thêm
         })
         .catch((info) => {
            console.log('Validate Failed:', info);
         });
   };

   const columns = [
      {
         title: 'ID SẢN PHẨM',
         dataIndex: 'id',
         key: 'id',
         render: (text: string) => <span className="product-id">{text}</span>,
      },
      {
         title: 'TÊN SẢN PHẨM',
         dataIndex: 'productName',
         key: 'productName',
         render: (text: string | undefined) => text ?? 'Không có tên',
      },
      {
         title: 'LOẠI',
         dataIndex: 'typeProduct',
         key: 'typeProduct',
         render: (text: string | undefined) => text ?? 'Không có loại',
      },
      {
         title: 'ẢNH',
         dataIndex: 'imageProduct',
         key: 'imageProduct',
         render: (imageProduct: string | undefined) => (
            <img src={imageProduct || ''} alt="Product" className="product-image" />
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
         render: (inventory: number | undefined) => inventory ?? 0,
      },
      {
         title: 'MÔ TẢ',
         dataIndex: 'description',
         key: 'description',
         ellipsis: true,
         render: (description: string | undefined) => description ?? 'Không có mô tả',
      },
      {
         title: 'ĐÃ BÁN',
         dataIndex: 'sold',
         key: 'sold',
         render: (sold: number | undefined) => sold ?? 0,
      },
      {
         title: '',
         key: 'actions',
         render: (_: any, product: Product) => (
            <Space>
               <Button
                  icon={<EditOutlined />}
                  onClick={() => openModalEdit(product)}
                  className="action-button edit-button"
               />
               <Popconfirm
                  title="Xác nhận xóa sản phẩm?"
                  onConfirm={() => handleDelete(product.id)}
                  okText="Yes"
                  cancelText="No"
               >
                  <Button icon={<DeleteOutlined />} danger className="action-button delete-button" />
               </Popconfirm>
            </Space>
         ),
      },
   ];

   const handleOk = () => {
      setIsModalOpen(false);
   };

   const handleCancel = () => {
      setIsModalOpen(false);
   };

   const handleAddCancel = () => {
      setIsAddModalOpen(false);
   };

   return (
      <div>
         {/* Modal chỉnh sửa sản phẩm */}
         <Modal title="Chỉnh sửa thông tin sản phẩm" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form form={form} layout="vertical">
               <Form.Item label="ID Sản Phẩm" name="id">
                  <Input disabled />
               </Form.Item>
               <Form.Item
                  label="Tên Sản Phẩm"
                  name="productName"
                  rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
               >
                  <Input />
               </Form.Item>
               <Form.Item
                  label="Loại"
                  name="typeProduct"
                  rules={[{ required: true, message: 'Vui lòng nhập loại sản phẩm' }]}
               >
                  <Input />
               </Form.Item>
               <Form.Item label="Giá Tiền" name="price" rules={[{ required: true, message: 'Vui lòng nhập giá tiền' }]}>
                  <InputNumber min={50000} max={500000} style={{ width: '100%' }} />
               </Form.Item>
               <Form.Item
                  label="Tồn Kho"
                  name="inventory"
                  rules={[{ required: true, message: 'Vui lòng nhập số lượng tồn kho' }]}
               >
                  <InputNumber min={10} max={200} style={{ width: '100%' }} />
               </Form.Item>
               <Form.Item
                  label="Đã Bán"
                  name="sold"
                  rules={[{ required: true, message: 'Vui lòng nhập số lượng đã bán' }]}
               >
                  <InputNumber min={0} max={100} style={{ width: '100%' }} />
               </Form.Item>
               <Upload name="image" listType="picture" beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Tải lên ảnh sản phẩm</Button>
               </Upload>

               <Form.Item label="Mô Tả" name="description" rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}>
                  <Input.TextArea rows={4} />
               </Form.Item>
            </Form>
         </Modal>

         {/* Modal thêm sản phẩm mới */}
         <Modal title="Thêm sản phẩm mới" open={isAddModalOpen} onOk={handleAddProduct} onCancel={handleAddCancel}>
            <Form form={addForm} layout="vertical">
               <Form.Item
                  label="Tên Sản Phẩm"
                  name="productName"
                  rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
               >
                  <Input />
               </Form.Item>
               <Form.Item
                  label="Loại"
                  name="typeProduct"
                  rules={[{ required: true, message: 'Vui lòng nhập loại sản phẩm' }]}
               >
                  <Input />
               </Form.Item>
               <Form.Item label="Giá Tiền" name="price" rules={[{ required: true, message: 'Vui lòng nhập giá tiền' }]}>
                  <InputNumber min={50000} max={500000} style={{ width: '100%' }} />
               </Form.Item>
               <Form.Item
                  label="Tồn Kho"
                  name="inventory"
                  rules={[{ required: true, message: 'Vui lòng nhập số lượng tồn kho' }]}
               >
                  <InputNumber min={10} max={200} style={{ width: '100%' }} />
               </Form.Item>
               <Form.Item
                  label="Đã Bán"
                  name="sold"
                  rules={[{ required: true, message: 'Vui lòng nhập số lượng đã bán' }]}
               >
                  <InputNumber min={0} max={100} style={{ width: '100%' }} />
               </Form.Item>
               <Form.Item label="Ảnh" name="imageProduct">
                  <Upload name="image" listType="picture" beforeUpload={() => false}>
                     <Button icon={<UploadOutlined />}>Tải lên ảnh sản phẩm</Button>
                  </Upload>
               </Form.Item>
               <Form.Item label="Mô Tả" name="description" rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}>
                  <Input.TextArea rows={4} />
               </Form.Item>
            </Form>
         </Modal>

         <div className="orders-container">
            <Space className="orders-header" size="large">
               <Button type="primary" onClick={openModalAdd}>
                  <PlusOutlined /> Thêm sản phẩm
               </Button>
            </Space>
            <Table
               columns={columns}
               dataSource={PRODUCT_LIST.map((item) => ({ ...item, key: item.id }))}
               pagination={{ pageSize: 6 }}
               rowSelection={{ type: 'checkbox' }}
               className="orders-table"
            />
         </div>
      </div>
   );
}

export default Products;
