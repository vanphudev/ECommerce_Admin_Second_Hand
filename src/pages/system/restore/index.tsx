import { useState } from 'react';
import { Card, message, Modal, Space, Table } from 'antd';
import { BackupData } from '@/_mock/_mock_backup';
import { IconButton } from '@/components/icon';
import { Backup } from '#/entity';
import { ReloadOutlined } from '@ant-design/icons';
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

export default function RestorePage() {
   const { styles } = useStyle();
   const [restoreModalProps, setRestoreModalProps] = useState<RestoreModalProps>({
      show: false,
      fileName: '',
      onOk: () => setRestoreModalProps((prev) => ({ ...prev, show: false })),
      onCancel: () => setRestoreModalProps((prev) => ({ ...prev, show: false })),
   });

   const columns: ColumnsType<Backup> = [
      { title: 'Tên File', dataIndex: 'fileName', width: 200 },
      { title: 'Kích thước (MB)', dataIndex: 'fileSize', width: 130 },
      { title: 'Ngày tạo', dataIndex: 'backupDate', width: 150 },
      { title: 'Nơi lưu trữ', dataIndex: 'location', width: 180 },
      {
         title: 'Trạng thái sao lưu',
         dataIndex: 'status',
         width: 150,
         render: (status) => {
            return <ProTag color={status === 'Hoàn thành' ? 'success' : 'default'}>{status}</ProTag>;
         },
      },
      {
         title: 'Action',
         key: 'operation',
         align: 'center',
         width: 100,
         render: (_, record) => (
            <div className="flex w-full justify-center text-gray">
               <IconButton>
                  <ReloadOutlined style={{ fontSize: 18 }} className="text-success" onClick={() => onRestore(record)} />
               </IconButton>
            </div>
         ),
      },
   ];

   const rowSelection: TableRowSelection<Backup> = {
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

   const onRestore = (record: Backup) => {
      setRestoreModalProps({
         show: true,
         fileName: record.fileName,
         onOk: () => {
            message.success('Đang phục hồi dữ liệu từ ' + record.fileName);
            setRestoreModalProps((prev) => ({ ...prev, show: false }));
         },
         onCancel: () => setRestoreModalProps((prev) => ({ ...prev, show: false })),
      });
   };

   const completedBackupData = BackupData.filter((backup) => backup.status === 'Hoàn thành');
   return (
      <Space direction="vertical" size="large" className="w-full">
         <Card>
            <Table
               className={styles.customTable}
               rowKey="fileName"
               style={{ width: '100%', flex: 1 }}
               size="small"
               scroll={{ y: 'calc(100vh - 300px)' }}
               pagination={{
                  size: 'default',
                  total: completedBackupData?.length || 0,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total) => `Total ${total} items`,
               }}
               columns={columns}
               dataSource={completedBackupData}
               rowSelection={rowSelection}
            />
         </Card>
         <RestoreModal {...restoreModalProps} />
      </Space>
   );
}

type RestoreModalProps = {
   show: boolean;
   fileName: string;
   onOk: () => void;
   onCancel: () => void;
};

function RestoreModal({ show, fileName, onOk, onCancel }: RestoreModalProps) {
   return (
      <Modal title={`Khôi phục dữ liệu từ ${fileName}`} open={show} onOk={onOk} onCancel={onCancel} width={600}>
         <p>Bạn có chắc chắn muốn phục hồi dữ liệu từ file này?</p>
      </Modal>
   );
}
