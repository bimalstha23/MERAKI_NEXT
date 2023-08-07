import { useQuery } from "@tanstack/react-query"
import { getChartData } from "../../ApiHandle/statsAPi"
import { Chart } from 'react-chartjs-2'
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title);
import 'chart.js/auto'; // ADD THIS
import { useRef } from "react";

export const ChartComp = () => {
    const { data: salesData, isLoading } = useQuery({
        queryKey: ['products', 'orders'],
        queryFn: getChartData,
    })
    const ref = useRef();

    const lastWeekDates = salesData?.lastWeekSales?.map((sale: any) => new Date(sale.createdAt).toLocaleDateString());
    const lastWeekAmounts = salesData?.lastWeekSales?.map((sale: any) => sale.total_sales);

    const thisWeekDates = salesData?.thisWeeksales?.map((sale: any) => new Date(sale.createdAt).toLocaleDateString());
    const thisWeekAmounts = salesData?.thisWeeksales?.map((sale: any) => sale.total_sales);

    const chartData = {
        labels: [...lastWeekDates || [], ...thisWeekDates || []],
        datasets: [
            {
                label: 'Last Week Sales',
                data: lastWeekAmounts,
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1,
            },
            {
                label: 'This Week Sales',
                data: thisWeekAmounts,
                fill: false,
                borderColor: 'rgba(192,75,192,1)',
                tension: 0.1,
            },
        ],
    };


    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="flex flex-col justify-center items-center shadow-xl rounded-xl p-5">
            <h2>Weekly Sales Chart</h2>
            <Chart ref={ref} type="line" data={chartData} options={chartOptions} />
        </div>
    )
}
