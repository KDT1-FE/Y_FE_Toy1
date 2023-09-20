import React from 'react';

import '../../scss/chart.scss';
import chartImage from '../../assets/conpanyChart.png';

const Chart = () => {
  return (
    <div className="chart">
      <div className="chart__top">
        <h1>조직도</h1>
      </div>
      <div className="chart__img" style={{ backgroundImage: `url(${chartImage})` }}></div>
    </div>
  );
};

export default Chart;
