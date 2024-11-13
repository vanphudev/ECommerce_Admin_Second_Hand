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
   message,
   Upload,
} from 'antd';
import { BackupData } from '@/_mock/_mock_backup';
import { IconButton, Iconify } from '@/components/icon';
import { Backup } from '#/entity';
import { useEffect, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { createStyles } from 'antd-style';
import { TableRowSelection } from 'antd/es/table/interface';
import type { UploadFile } from 'antd/es/upload/interface';
import ProTag from '@/theme/antd/components/tag';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';

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

export default function BackupPage() {
   const { styles } = useStyle();
   const [downloading, setDownloading] = useState(false);
   const [upload, setUpload] = useState(false);
   const [backupModalProps, setBackupModalProps] = useState<BackupModalProps>({
      title: 'New',
      show: false,
      formValue: {
         fileName: '',
         fileSize: 0,
         location: 'Lưu trữ cục bộ',
         restoreAvailable: false,
      },
      onOk: () => setBackupModalProps((prev) => ({ ...prev, show: false })),
      onCancel: () => setBackupModalProps((prev) => ({ ...prev, show: false })),
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
            let color = '';
            if (status === 'Hoàn thành') {
               color = 'success';
            } else if (status === 'Thất bại') {
               color = 'error';
            }
            return <ProTag color={color}>{status}</ProTag>;
         },
      },
      {
         title: 'Khôi phục',
         dataIndex: 'restoreAvailable',
         width: 150,
         render: (text) => {
            const Text = text ? 'Yes' : 'No';
            const color = text ? 'success' : 'error';
            return <ProTag color={color}>{Text}</ProTag>;
         },
      },
      {
         title: 'Action',
         key: 'operation',
         align: 'center',
         width: 100,
         render: (record) => (
            <div className="flex w-full justify-center text-gray">
               <IconButton>
                  <Iconify
                     icon="solar:download-bold-duotone"
                     size={18}
                     onClick={() => onDownloadConfirm(record.fileName)}
                  />
               </IconButton>
               <Popconfirm
                  title="Bạn muốn xóa file Backup này?"
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

   const onCreate = () => {
      setBackupModalProps((prev) => ({ ...prev, show: true, title: 'Create New' }));
   };

   const onDownloadConfirm = (fileName: string) => {
      setDownloading(true);
      setBackupModalProps((prev) => ({
         ...prev,
         formValue: { ...prev.formValue, fileName },
      }));
   };
   const onUploadFileBackup = () => {
      setUpload(true);
   };
   const onDatabaseBackup = () => {
      message.success('Đang tiến hành sao lưu cơ sở dữ liệu!');
   };

   const handleCancel = () => {
      setDownloading(false);
      setUpload(false);
   };

   const handleDelete = () => {
      message.success('Đã xóa file backup!');
   };

   const handleBeforeUpload = (file: UploadFile) => {
      message.success(`${file.name} đã được tải lên thành công`);
      handleCancel();
      return false;
   };
   const handleDownload = (fileName: string) => {
      setDownloading(false);
      message.success(`${fileName} đã được tải xuống thành công`);
   };

   return (
      <Space direction="vertical" size="large" className="w-full">
         <Card
            style={{ maxHeight: '100%', minHeight: '100%', display: 'flex', flexDirection: 'column' }}
            title="Backup List"
            extra={
               <>
                  <Button type="primary" onClick={onCreate} style={{ marginRight: 8 }}>
                     New
                  </Button>
                  <Button type="primary" onClick={onUploadFileBackup} style={{ marginRight: 8 }}>
                     Upload File Backup
                  </Button>
                  <Button type="primary" onClick={onDatabaseBackup}>
                     Database Backup
                  </Button>
               </>
            }
         >
            <Table
               className={styles.customTable}
               rowKey="fileName"
               style={{ width: '100%', flex: 1 }}
               size="small"
               scroll={{ y: 'calc(100vh - 300px)' }}
               pagination={{
                  size: 'default',
                  total: BackupData?.length || 0,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total) => `Total ${total} items`,
               }}
               columns={columns}
               dataSource={BackupData}
               rowSelection={rowSelection}
            />
         </Card>
         <BackupModal {...backupModalProps} />
         <Modal title="Đang tải xuống..." open={downloading} footer={null} closable={false}>
            <p>Bạn muốn tải file này xuống</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: 20 }}>
               <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  onClick={() => handleDownload(backupModalProps.formValue.fileName)}
               >
                  Tải xuống
               </Button>

               <Button onClick={handleCancel}>Hủy</Button>
            </div>
         </Modal>
         <Modal title="Thực hiện tải file lên..." open={upload} footer={null} closable={false}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: 20 }}>
               <Upload name="file" multiple={false} beforeUpload={handleBeforeUpload}>
                  <Button type="primary" icon={<UploadOutlined />}>
                     Chọn file tải lên
                  </Button>
               </Upload>
               <Button onClick={handleCancel}>Hủy</Button>
            </div>
         </Modal>
      </Space>
   );
}

type BackupModalProps = {
   formValue: Backup;
   title: string;
   show: boolean;
   onOk: () => void;
   onCancel: () => void;
};

function BackupModal({ title, show, formValue, onOk, onCancel }: BackupModalProps) {
   const [form] = Form.useForm();

   useEffect(() => {
      form.setFieldsValue({ ...formValue });
   }, [formValue, form]);

   return (
      <Modal title={title} open={show} onOk={onOk} onCancel={onCancel} width={600}>
         <Form
            form={form}
            layout="horizontal"
            initialValues={formValue}
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 16 }}
         >
            <Form.Item label="Tên File" name="fileName" required>
               <Input placeholder="Tên file" />
            </Form.Item>
            <Form.Item label="Kích thước (MB)" name="fileSize" required>
               <InputNumber min={1} />
            </Form.Item>
            <Form.Item label="Nơi sao lưu" name="location" required>
               <Select>
                  <Select.Option value="Local Storage">Lưu trữ cục bộ</Select.Option>
                  <Select.Option value="Cloud Storage">Lưu trữ đám mây</Select.Option>
                  <Select.Option value="External Drive">Ổ cứng ngoài</Select.Option>
               </Select>
            </Form.Item>
            <Form.Item label="Cho phép khôi phục" name="restoreAvailable" valuePropName="checked" required>
               <Switch />
            </Form.Item>
         </Form>
      </Modal>
   );
}
