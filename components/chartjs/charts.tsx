import React from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);
import { Line, Bar } from "react-chartjs-2";

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
                  backgroundColor: "#007dff",
                  borderColor: "rgba(0,122,255,0.5)",
                  pointHoverRadius: 5,
                  data: [
                    65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40,
                  ],
                  cubicInterpolationMode: "monotone",
                },
              ],
            }}
            width={400}
            height={400}
          />
        </div>
        <div className="m-3">
          <h2>Welche Übungen</h2>
          <Bar
            data={{
              labels: ["Obere Gesichtshälfte", "Untere Gesichtshälfte"],
              datasets: [
                {
                  label: "Lernintensität",
                  backgroundColor: [
                    "rgba(0,122,255,0.5)",
                    "rgba(52,199,89,0.5)",
                  ],
                  borderColor: ["rgba(0,122,255)", "rgba(52,199,89)"],
                  borderWidth: 2,
                  data: [65, 59],
                },
              ],
            }}
            width={400}
            height={400}
          />
        </div>
      </div>
    </div>
  );
};

export default charts;
