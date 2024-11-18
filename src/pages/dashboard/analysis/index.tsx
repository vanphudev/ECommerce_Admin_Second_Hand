import { Card, Col, Row, Typography } from 'antd';
import Color from 'color';

import glass_bag from '@/assets/images/glass/ic_glass_bag.png';
import glass_buy from '@/assets/images/glass/ic_glass_buy.png';
import glass_message from '@/assets/images/glass/ic_glass_message.png';
import glass_users from '@/assets/images/glass/ic_glass_users.png';
import { Iconify } from '@/components/icon';
import ChartBar from '@/pages/components/chart/view/chart-bar';
import ChartMixed from '@/pages/components/chart/view/chart-mixed';
import ChartPie from '@/pages/components/chart/view/chart-pie';
import ChartRadar from '@/pages/components/chart/view/chart-radar';
import { useThemeToken } from '@/theme/hooks';

import AnalysisCard from './analysis-card';
import AnalysisNews from './analysis-news';
import AnalysisOrderTimeline from './analysis-order-timeline';
import AnalysisTasks from './analysis-tasks';
import AnalysisTrafficCard from './analysis-traffic-card';

function Analysis() {
   const theme = useThemeToken();
   return (
      <div className="p-2">
         <Typography.Title level={2}>Hi, Chào bạn đã quay trở lại !</Typography.Title>
         <Row gutter={[16, 16]} justify="center">
            <Col lg={6} md={12} span={24}>
               <AnalysisCard
                  cover={glass_bag}
                  title="714k"
                  subtitle="Total Orders"
                  style={{
                     color: theme.colorPrimaryTextActive,
                     background: `linear-gradient(135deg, ${Color(theme.colorPrimaryActive)
                        .alpha(0.2)
                        .toString()}, ${Color(theme.colorPrimary).alpha(0.2).toString()}) rgb(255, 255, 255)`,
                  }}
               />
            </Col>
            <Col lg={6} md={12} span={24}>
               <AnalysisCard
                  cover={glass_users}
                  title="100"
                  subtitle="Total Users"
                  style={{
                     color: theme.colorInfoTextActive,
                     background: `linear-gradient(135deg, ${Color(theme.colorInfoActive)
                        .alpha(0.2)
                        .toString()}, ${Color(theme.colorInfo).alpha(0.2).toString()}) rgb(255, 255, 255)`,
                  }}
               />
            </Col>
            <Col lg={6} md={12} span={24}>
               <AnalysisCard
                  cover={glass_buy}
                  title="1.72m"
                  subtitle="Total Saler Chanels"
                  style={{
                     color: theme.colorWarningTextActive,
                     background: `linear-gradient(135deg, ${Color(theme.colorWarningActive)
                        .alpha(0.2)
                        .toString()}, ${Color(theme.colorWarning).alpha(0.2).toString()}) rgb(255, 255, 255)`,
                  }}
               />
            </Col>
            <Col lg={6} md={12} span={24}>
               <AnalysisCard
                  cover={glass_message}
                  title="234k"
                  subtitle="Total Products"
                  style={{
                     color: theme.colorErrorTextActive,
                     background: `linear-gradient(135deg, ${Color(theme.colorErrorActive)
                        .alpha(0.2)
                        .toString()}, ${Color(theme.colorError).alpha(0.2).toString()}) rgb(255, 255, 255)`,
                  }}
               />
            </Col>
         </Row>

         <Row gutter={[16, 16]} className="mt-8" justify="center">
            <Col span={24} lg={12} xl={16}>
               <Card title="Website Visits">
                  <ChartMixed />
               </Card>
            </Col>
            <Col span={24} lg={12} xl={8}>
               <Card title="Current Visits">
                  <ChartPie />
               </Card>
            </Col>
         </Row>
         <Row gutter={[16, 16]} className="mt-8" justify="center">
            <Col span={24}>
               <Card title="Conversion Rates">
                  <ChartBar />
               </Card>
            </Col>
         </Row>
      </div>
   );
}

export default Analysis;
