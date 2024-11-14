import { useState, useEffect } from 'react';
import { Table, Tag, Popconfirm, Card } from 'antd';
import { IconButton, Iconify } from '@/components/icon';
import { ColumnsType } from 'antd/es/table';
import { generateReviewsData } from '@/_mock/_mock_reviews';
import dayjs from 'dayjs';
import { Reviews } from './entity';

const DEFAULT_REVIEW_VALUE: Reviews = {
    reviewId: '',
    productId: '',
    userId: '',
    rating: 0,
    comment: '',
    createdAt: '',
    updatedAt: '',
    isVerifiedPurchase: true,
};

export default function ReviewsScreen() {
    const [reviews, setReviews] = useState<Reviews[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setReviews(generateReviewsData(105));
        setLoading(false);
    }, []);

    const columns: ColumnsType<Reviews> = [
      { title: 'Mã Đánh Giá', dataIndex: 'reviewId', key: 'reviewId' },
      { title: 'Mã Sản Phẩm', dataIndex: ['product', 'productId'], key: 'productId' },
      { title: 'Tên Sản Phẩm', dataIndex: ['product', 'productName'], key: 'productName' },
      { title: 'Mã Người Dùng', dataIndex: ['user', 'userId'], key: 'userId' },
      { title: 'Tên Người Dùng', dataIndex: ['user', 'fullName'], key: 'userName' },
      {
          title: 'Đánh Giá',
          dataIndex: 'rating',
          key: 'rating',
          sorter: (a, b) => a.rating - b.rating,
      },
      { title: 'Nhận Xét', dataIndex: 'comment', key: 'comment' },
      {
          title: 'Ngày Tạo',
          dataIndex: 'createdAt',
          key: 'createdAt',
          render: (createdAt) => dayjs(createdAt).format('DD/MM/YYYY'),
      },
      {
          title: 'Mua Hàng Đã Xác Minh',
          dataIndex: 'isVerifiedPurchase',
          key: 'isVerifiedPurchase',
          align: 'center',
          render: (isVerified) => (isVerified ? <Tag color="green">Có</Tag> : <Tag color="red">Không</Tag>),
      },
      {
          title: 'Hành Động',
          key: 'operation',
          align: 'center',
          width: 100,
          fixed: 'right',
          render: (_, record) => (
              <div className="flex w-full justify-center text-gray">
                  <Popconfirm
                      title="Xóa Đánh Giá?"
                      okText="Có"
                      cancelText="Không"
                      placement="left"
                      onCancel={() => {}}
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
            <Card
                style={{ maxHeight: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column' }}
                title="Reviews List"
            >
                <Table
                    rowKey={(record) => record.reviewId}
                    style={{ width: '100%', flex: 1 }}
                    size="small"
                    scroll={{ y: 'calc(100vh - 300px)' }}
                    pagination={{
                        size: 'default',
                        total: reviews.length || 0,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total) => `Total ${total} items`,
                    }}
                    columns={columns as ColumnsType<Reviews>}
                    dataSource={reviews}
                    loading={loading}
                />
            </Card>
        </>
    );
}
