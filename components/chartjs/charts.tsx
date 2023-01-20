import React, { use } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);
import { Line, Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useRouter } from "next/router";

const charts = () => {
  var [january, setJanuary] = useState([]);
  var [february, setFebruary] = useState([]);
  var [march, setMarch] = useState([]);
  var [april, setApril] = useState([]);
  var [may, setMay] = useState([]);
  var [june, setJune] = useState([]);
  var [july, setJuly] = useState([]);
  var [august, setAugust] = useState([]);
  var [september, setSeptember] = useState([]);
  var [october, setOctober] = useState([]);
  var [november, setNovember] = useState([]);
  var [december, setDecember] = useState([]);

  var [upper, setUpper] = useState([]);
  var [lower, setLower] = useState([]);

  var router = useRouter();
  var index = router.query.index;

  useEffect(() => {
    if (!router) return;
    if (!index) return;
    getCharts(index);
  }, [router, index]);

  const getCharts = async (index: any) => {
    try {
      await Axios.post("/api/get-chart-data", {
        index: index,
      }).then((response) => {
        console.log(response.data);
        // console.log(response.data[upperCount]);
        setJanuary(response.data[0]);

        setFebruary(response.data[1]);
        setMarch(response.data[2]);
        setApril(response.data[3]);
        setMay(response.data[4]);
        setJune(response.data[5]);
        setJuly(response.data[6]);
        setAugust(response.data[7]);
        setSeptember(response.data[8]);
        setOctober(response.data[9]);
        setNovember(response.data[10]);
        setDecember(response.data[11]);
        setUpper(response.data[12]);
        setLower(response.data[13]);
        // console.log(response.data);
      });
    } catch (error: any) {
      error;
    }
  };

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
                    january.length,
                    february.length,
                    march.length,
                    april.length,
                    may.length,
                    june.length,
                    july.length,
                    august.length,
                    september.length,
                    october.length,
                    november.length,
                    december.length,
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
                  backgroundColor: [
                    "rgba(0,122,255,0.5)",
                    "rgba(52,199,89,0.5)",
                  ],
                  borderColor: ["rgba(0,122,255)", "rgba(52,199,89)"],
                  borderWidth: 2,
                  data: [upper[0], lower[0]],
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
