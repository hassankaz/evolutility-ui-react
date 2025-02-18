/* eslint-disable react-hooks/exhaustive-deps */
// Evolutility-UI-React :: /views/charts/Charts.js

// Dashboard style set of charts (bars or pies).

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2023 Olivier Giulieri

//#region Imports ----------------------------
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import classnames from "classnames";
import { i18n_charts } from "../../../i18n/i18n";
import { getModel } from "../../../utils/moMa";
import { fieldInCharts } from "../../../utils/dico";
import { lcRead } from "../../../utils/localStorage";
import { capitalize } from "../../../utils/format";
import PageTitle from "../../shell/PageTitle";
import Alert from "../../widgets/Alert";
import Chart from "./Chart";

import "./Charts.scss";
//#endregion

const Charts = () => {
  const [expandedChart, setExpandedChart] = useState(null);
  const toggleExpandedChart = (fid, expanded) => {
    if (fid === expandedChart) {
      setExpandedChart(expanded ? fid : null);
    } else {
      setExpandedChart(fid);
    }
  };
  const { entity } = useParams();
  const m = getModel(entity);
  useEffect(() => {
    document.title = m?.label + " Charts";
    window.scrollTo(0, 0);
  }, [entity]);

  if (m) {
    const title = i18n_charts.dash.replace("{0}", capitalize(m.namePlural));
    const chartFields = m.fields.filter(fieldInCharts);
    const nbCharts = chartFields.length;
    const css = classnames("evol-many-charts", {
      "single-chart": nbCharts === 1,
    });

    const chartTitle = (f) =>
      i18n_charts.objectByField
        .replace("{0}", capitalize(m.namePlural))
        .replace("{1}", f.labelCharts || f.label);
    let charts;

    const cssChart = (f) =>
      classnames("panel", {
        "hidden-chart": expandedChart && expandedChart !== f.id,
      });

    if (nbCharts === 0) {
      charts = (
        <Alert title="No data" message={i18n_charts.nocharts} type="info" />
      );
    } else {
      const chartFieldProps = (f) => ({
        entity: entity,
        key: f.id,
        field: f,
        title: chartTitle(f),
        chartType: lcRead(`${m.id}-charts-${f.id}`) || f.chartType,
      });
      if (nbCharts === 1) {
        const f = chartFields[0];
        charts = (
          <Chart
            {...chartFieldProps(f)}
            size="large"
            isExpanded={true}
            className="panel single-chart"
          />
        );
      } else {
        charts = chartFields.map((f) => (
          <Chart
            {...chartFieldProps(f)}
            size={f?.id === expandedChart ? "large" : "small"}
            setExpanded={toggleExpandedChart}
            isExpanded={f?.id === expandedChart}
            hidden={expandedChart && expandedChart !== f?.id}
            className={cssChart(f)}
          />
        ));
      }
    }

    return (
      <div className={"evol-charts model_" + entity}>
        <PageTitle
          entity={entity}
          model={m}
          title={title}
          count={null}
          cardinality="n"
          view="charts"
        />
        <div className={css}>{charts}</div>
      </div>
    );
  }
  return (
    <Alert title="Error" message={`Invalid input parameter "${entity}".`} />
  );
};

export default Charts;
