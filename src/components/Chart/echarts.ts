import * as echarts from "echarts/core"
import { LabelLayout, UniversalTransition } from "echarts/features"
import { SVGRenderer } from "echarts/renderers"
import type { ComposeOption } from "echarts/core"
import {
  BarChart,
  LineChart,
  PieChart,
  type BarSeriesOption,
  type LineSeriesOption,
  type PieSeriesOption,
} from "echarts/charts"
import {
  TitleComponent,
  LegendComponent,
  GridComponent,
  TooltipComponent,
  ToolboxComponent,
  DatasetComponent,
  TransformComponent,
  type TitleComponentOption,
  type LegendComponentOption,
  type GridComponentOption,
  type TooltipComponentOption,
  type ToolboxComponentOption,
  type DatasetComponentOption,
} from "echarts/components"

export type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | ToolboxComponentOption
  | GridComponentOption
  | LegendComponentOption
  | DatasetComponentOption
>

echarts.use([
  TitleComponent,
  TooltipComponent,
  ToolboxComponent,
  GridComponent,
  DatasetComponent,
  LegendComponent,
  TransformComponent,
  BarChart,
  LineChart,
  PieChart,
  LabelLayout,
  UniversalTransition,
  SVGRenderer,
])

export default echarts
echarts.registerTheme
