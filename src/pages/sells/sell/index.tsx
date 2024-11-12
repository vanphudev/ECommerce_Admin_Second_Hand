import React from 'react';
import { Card, Col, Row } from 'antd';

import { orderData } from '@/_mock/_mock_order';

function Sell() {
   const orders = orderData;
   return (
      <>
         {orders.map((order) => (
            <Row gutter={16}>
               <Col span={8}>
                  <Card title={order.order_id} bordered={false}>
                     {order.customer.name}
                  </Card>
               </Col>
            </Row>
         ))}
      </>
   );
}
export default Sell;
