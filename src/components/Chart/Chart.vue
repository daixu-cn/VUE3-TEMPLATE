<template>
  <v-chart
    id="Chart"
    ref="ChartRef"
    :theme="theme.dark ? 'dark' : 'light'"
    :option="$props.option"
    :loading="$props.loading"
    :init-options="initOptions"
    :loading-options="loadingOptions"
    autoresize
  />
</template>

<script setup lang="ts">
import { useTemplateRef } from "vue"
import useStore from "@/store"
import VChart from "vue-echarts"
import echarts from "@/components/Chart/echarts"
import { getStyleVariable } from "@/tools/style"
import root from "@/assets/styles/scss/theme/root.module.scss"
import type { EChartsInitOpts } from "echarts"
import type { ChartProps } from "@/components/Chart/types"
import "@/components/Chart/theme"

defineProps<ChartProps>()
const { theme } = useStore()
const chart = ref<echarts.ECharts>()
const instance = useTemplateRef("ChartRef")
const initOptions: EChartsInitOpts = { renderer: "svg", locale: "ZH" }
const loadingOptions = {
  text: "",
  spinnerRadius: parseFloat(getStyleVariable("spinner-size")) / 2,
  lineWidth: 2,
  color: `var(${root["prefix"]}-primary-color)`,
  maskColor: `var(${root["prefix"]}-mask-color)`,
}

defineExpose({ chart, instance })
</script>

<style lang="scss">
#Chart {
  width: 100%;
  height: 100%;
}
</style>
