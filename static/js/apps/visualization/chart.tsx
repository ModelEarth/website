/**
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Component that draws a chart based off the state of the visualization tool.
 */
import _ from "lodash";
import React, { useContext } from "react";

import { isSelectionComplete } from "../../utils/app/visualization_utils";
import { AppContext } from "./app_context";
import { StatVarSelector } from "./stat_var_selector";
import { VIS_TYPE_CONFIG } from "./vis_type_configs";

export function Chart(): JSX.Element {
  const appContext = useContext(AppContext);
  const { visType, places, statVars, enclosedPlaceType } = appContext;

  if (!isSelectionComplete(visType, places, enclosedPlaceType, statVars)) {
    return null;
  }
  const chartHeight = window.innerHeight * 0.45;
  return (
    <div className="chart-section">
      <div className="stat-var-selector-area">
        <div className="title">Variables</div>
        <StatVarSelector />
      </div>
      <div className="chart-area">
        {VIS_TYPE_CONFIG[visType].getChartArea(appContext, chartHeight)}
      </div>
    </div>
  );
}