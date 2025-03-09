import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface ChartProps {
  type: 'bar' | 'line' | 'pie' | 'doughnut';
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string[] | string;
      borderColor?: string[] | string;
      borderWidth?: number;
    }[];
  };
  options?: Chart.ChartOptions;
  width?: number;
  height?: number;
}

const ChartComponent: React.FC<ChartProps> = ({ type, data, options, width = 400, height = 300 }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type,
          data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            ...options,
          },
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [type, data, options]);

  return (
    <canvas
      ref={chartRef}
      width={width}
      height={height}
      style={{ width: '100%', maxWidth: `${width}px`, height: 'auto', maxHeight: `${height}px` }}
    />
  );
};

export default ChartComponent;