import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AnimatedLineChart = () => {
  const data = [
    { month: 'Jan', value1: 2500, value2: 4000 },
    { month: 'Feb', value1: 3000, value2: 1500 },
    { month: 'Mar', value1: 2000, value2: 10000 },
    { month: 'Apr', value1: 2700, value2: 3500 },
    { month: 'May', value1: 2000, value2: 5000 },
    { month: 'Jun', value1: 2500, value2: 3500 },
    { month: 'Jul', value1: 3500, value2: 4000 }
  ];

  return (
    <div style={{ width: '100%', height: '500px', padding: '20px', }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#ccc"
          />
          <XAxis 
            dataKey="month" 
            stroke="#ff9966"
            style={{ fontSize: '14px' }}
          />
          <YAxis 
            stroke="#ff9966"
            style={{ fontSize: '14px' }}
            domain={[0, 10000]}
          />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="value1" 
            stroke="#ff9966" 
            strokeWidth={3}
            dot={{ fill: '#ff9966', r: 5 }}
            isAnimationActive={true}
            animationDuration={2000}
            animationBegin={0}
          />
          <Line 
            type="monotone" 
            dataKey="value2" 
            stroke="#90EE90" 
            strokeWidth={3}
            dot={{ fill: '#90EE90', r: 5 }}
            isAnimationActive={true}
            animationDuration={2000}
            animationBegin={0}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnimatedLineChart;