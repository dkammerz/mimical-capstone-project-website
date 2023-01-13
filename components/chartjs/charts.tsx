import React from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);
import { Line, Pie } from "react-chartjs-2";

const charts = () => {
  return (
    <div className="overflow-x-scroll">
      <div className="flex justify-around">
        <div className="m-3">
          <h2>Wie oft werden übungen gemacht</h2>
          <Line
            data={{
              labels: [
                "Januar",
                "Februar",
                "März",
                "April",
                "Mai",
                "Juni",
                "Juli",
                "August",
                "September",
                "Oktober",
                "November",
                "Dezember",
              ],
              datasets: [
                {
                  label: "Lernintensität",
                  fill: false,
                  // lineTension: 0.1,
                  backgroundColor: "rgba(75,192,192,0.4)",
                  borderColor: "rgba(75,192,192,1)",
                  borderCapStyle: "butt",
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: "miter",
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  //   maintainAspectRatio: false,
                  pointHitRadius: 10,
                  data: [
                    65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40,
                  ],
                },
              ],
            }}
            width={400}
            height={400}
          />
        </div>
        <div className="m-3">
          <h2>Welche Übungen</h2>
          <Pie
            data={{
              labels: [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
              ],
              datasets: [
                {
                  label: "Lernintensität",
                  backgroundColor: [
                    "#ff0000",
                    "#ff8000",
                    "#ffff00",
                    "#80ff00",
                    "#36A2EB",
                    "#00ff00",
                    "#00ff80",
                    "#00ffff",
                    "#0080ff",
                    "#0000ff",
                    "#8000ff",
                    "#ff00ff",
                    "#ff0080",
                  ],
                  //   hoverBackgroundColor: [
                  //     "#FF6384",
                  //     "#36A2EB",
                  //     "#FFCE56",
                  //     "#FF6384",
                  //     "#36A2EB",
                  //     "#FFCE56",
                  //     "#FF6384",
                  //     "#36A2EB",
                  //     "#FFCE56",
                  //     "#FF6384",
                  //     "#36A2EB",
                  //     "#FFCE56",
                  //     "#FF6384",
                  //     "#36A2EB",
                  //     "#FFCE56",
                  //   ],
                  borderColor: "rgba(75,192,192,1)",
                  borderJoinStyle: "miter",
                  data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 40],
                },
              ],
            }}
            width={400}
            height={400}
          />
        </div>
      </div>
      <div className="flex">
        <div className="m-3">Test</div>
      </div>
    </div>
  );
};

export default charts;
