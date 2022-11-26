import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios"
import _ from 'lodash'
import {BaseUrl} from "../../helpers/baseUrl" 

let chartData = [];
const Chart = ({ aspect, title }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${BaseUrl}/order`)
        .then(results => {
          results.data.data.forEach((val, index) => {
            const d = new Date(val.NgayDat);

            //tìm kiếm trong mảng nếu không có tháng thì add vô

            //log tháng của hóa đơn ra
            //nếu tháng hóa đơn trùng với tháng trong chart data (pos > 0) thì cộng vô
            const pos = _.findIndex(chartData, function (val) {
              if(val === undefined){
                return false;
              }else{
                return String(val.name).match(`Tháng ${d.getMonth() + 1}`)
              }
            });
            if (pos < 0) {
              chartData[d.getMonth() + 1] = ({ name: `Tháng ${d.getMonth() + 1}`, Total: Number(val.ThanhTien) });
            } 
            else {
              const newTotal = Number(val.ThanhTien + chartData[d.getMonth() + 1].Total);
              chartData[d.getMonth() + 1] = { name: `Tháng ${d.getMonth() + 1}`, Total: newTotal };
            }
          })
          console.log(Array(chartData));
          for(let i = 1; i < 13; i++){
            if(chartData[i] === undefined){
              chartData[i] = {name: `Tháng ${i}`, Total: 0};
            }
          }
          setData([...chartData]);
        })
      }
    fetchData();
  }, [])
  return (
    <div className="chart">
      <div className="title">{title}</div>
      {data ? <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer> : null}
    </div>
  );
};

export default Chart;
