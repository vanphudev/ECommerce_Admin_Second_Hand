import { Col, Row, Space } from 'antd';
import BannerCard from './banner-card';
import { Applications, Conversion } from './conversion_applications';
import NewInvoice from './new-invoice';
import TotalCard from './total-card';

function Workbench() {
   return (
      <div className="p-2">
         <Row gutter={[16, 16]} justify="center">
            <Col span={24} lg={16}>
               <BannerCard />
            </Col>
            <Col span={24} lg={8}>
               <Space direction="vertical" size="large" className="h-full w-full justify-center">
                  <Conversion />
                  <Applications />
               </Space>
            </Col>
         </Row>
         <Row gutter={[16, 16]} className="mt-4" justify="center">
            <Col span={24} md={8}>
               <TotalCard
                  title="Tổng doanh thu"
                  increase
                  count="18,765 $"
                  percent="2.6%"
                  chartData={[22, 8, 35, 50, 82, 84, 77, 12, 87, 43]}
               />
            </Col>
            <Col span={24} md={8}>
               <TotalCard
                  title="Tổng sản phẩm bán ra"
                  increase
                  count="4,876 sản phẩm"
                  percent="0.2%"
                  chartData={[45, 52, 38, 24, 33, 26, 21, 20, 6]}
               />
            </Col>
            <Col span={24} md={8}>
               <TotalCard
                  title="Tổng số người dùng"
                  increase={false}
                  count="678 người/User"
                  percent="0.1%"
                  chartData={[35, 41, 62, 42, 13, 18, 29, 37, 36]}
               />
            </Col>
         </Row>
         <Row gutter={[16, 16]} className="mt-4" justify="center">
            <Col span={24}>
               <NewInvoice />
            </Col>
         </Row>
      </div>
   );
}

export default Workbench;
