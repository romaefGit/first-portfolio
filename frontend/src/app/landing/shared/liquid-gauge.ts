/*!
 * Basado en Liquid Fill Gauge v1.1 — BSD 2-clause, Copyright (c) 2015, Curtis Bratton.
 * Portado de d3 v3 (client/landing/commons/liquidFillGauge.js) a d3 v7.
 */
import { Component, DestroyRef, ElementRef, afterNextRender, inject, input, viewChild } from '@angular/core';
import { area, arc, easeLinear, interpolate, scaleLinear, select } from 'd3';

export interface GaugeColors {
  circleColor: string;
  waveColor: string;
  textColor: string;
  waveTextColor: string;
}

/** Configuración que usaba inicioCtrl sobre liquidFillGaugeDefaultSettings(). */
const CONFIG = {
  minValue: 0,
  maxValue: 120,
  circleThickness: 0.05,
  circleFillGap: 0.05,
  waveHeight: 0.07,
  waveCount: 1,
  waveRiseTime: 1000,
  waveAnimateTime: 2000,
  waveRise: true,
  waveHeightScaling: true,
  waveAnimate: true,
  waveOffset: 0,
  textVertPosition: 0.2,
  textSize: 1,
  valueCountUp: true,
  displayPercent: true,
};

let nextId = 0;

@Component({
  selector: 'app-liquid-gauge',
  template: `<svg #svg width="100%" height="100"></svg>`,
})
export class LiquidGauge {
  readonly value = input.required<number>();
  readonly colors = input.required<GaugeColors>();

  private readonly svg = viewChild.required<ElementRef<SVGSVGElement>>('svg');
  private readonly clipId = `clipWave-${nextId++}`;

  constructor() {
    afterNextRender(() => {
      draw(this.svg().nativeElement, this.value(), this.colors(), this.clipId);
    });
    // el loop de la ola sigue en d3 aunque el nodo ya no esté en el DOM
    inject(DestroyRef).onDestroy(() => {
      select(this.svg().nativeElement).selectAll('*').interrupt();
    });
  }
}

function draw(element: SVGSVGElement, value: number, colors: GaugeColors, clipId: string): void {
  const config = { ...CONFIG, ...colors };
  const gauge = select(element);
  // El original medía el estilo del svg aún oculto ("100%" -> 100), así que el gauge
  // queda de 100x100 alineado a la izquierda; se mantiene igual.
  const size = 100;
  const radius = size / 2;
  const fillPercent = Math.max(config.minValue, Math.min(config.maxValue, value)) / config.maxValue;

  const waveHeightScale = config.waveHeightScaling
    ? scaleLinear().range([0, config.waveHeight, 0]).domain([0, 50, 100])
    : scaleLinear().range([config.waveHeight, config.waveHeight]).domain([0, 100]);

  const textPixels = (config.textSize * radius) / 2;
  const textFinalValue = value;
  const textStartValue = config.valueCountUp ? config.minValue : textFinalValue;
  const percentText = config.displayPercent ? '%' : '';
  const circleThickness = config.circleThickness * radius;
  const circleFillGap = config.circleFillGap * radius;
  const fillCircleMargin = circleThickness + circleFillGap;
  const fillCircleRadius = radius - fillCircleMargin;
  const waveHeight = fillCircleRadius * waveHeightScale(fillPercent * 100);

  const waveLength = (fillCircleRadius * 2) / config.waveCount;
  const waveClipCount = 1 + config.waveCount;
  const waveClipWidth = waveLength * waveClipCount;

  const textRounder = Number.isInteger(textFinalValue)
    ? (v: number) => String(Math.round(v))
    : (v: number) => v.toFixed(Number.isInteger(textFinalValue * 10) ? 1 : 2);

  const data: { x: number; y: number }[] = [];
  for (let i = 0; i <= 40 * waveClipCount; i++) {
    data.push({ x: i / (40 * waveClipCount), y: i / 40 });
  }

  const waveScaleX = scaleLinear().range([0, waveClipWidth]).domain([0, 1]);
  const waveScaleY = scaleLinear().range([0, waveHeight]).domain([0, 1]);
  const waveRiseScale = scaleLinear()
    .range([fillCircleMargin + fillCircleRadius * 2 + waveHeight, fillCircleMargin - waveHeight])
    .domain([0, 1]);
  const waveAnimateScale = scaleLinear()
    .range([0, waveClipWidth - fillCircleRadius * 2])
    .domain([0, 1]);
  const textRiseScaleY = scaleLinear()
    .range([fillCircleMargin + fillCircleRadius * 2, fillCircleMargin + textPixels * 0.7])
    .domain([0, 1]);

  const gaugeGroup = gauge.append('g');

  const gaugeCircleArc = arc<unknown>()
    .startAngle(0)
    .endAngle(2 * Math.PI)
    .outerRadius(radius)
    .innerRadius(radius - circleThickness);
  gaugeGroup
    .append('path')
    .attr('d', gaugeCircleArc(null) ?? '')
    .style('fill', config.circleColor)
    .attr('transform', `translate(${radius},${radius})`);

  const textY = textRiseScaleY(config.textVertPosition);
  const text1 = gaugeGroup
    .append('text')
    .text(textRounder(textStartValue) + percentText)
    .attr('class', 'liquidFillGaugeText')
    .attr('text-anchor', 'middle')
    .attr('font-size', `${textPixels}px`)
    .style('fill', config.textColor)
    .attr('transform', `translate(${radius},${textY})`);

  const clipArea = area<{ x: number; y: number }>()
    .x((d) => waveScaleX(d.x))
    .y0((d) =>
      waveScaleY(
        Math.sin(Math.PI * 2 * config.waveOffset * -1 + Math.PI * 2 * (1 - config.waveCount) + d.y * 2 * Math.PI),
      ),
    )
    .y1(() => fillCircleRadius * 2 + waveHeight);

  const waveGroup = gaugeGroup.append('defs').append('clipPath').attr('id', clipId);
  const wave = waveGroup.append('path').datum(data).attr('d', clipArea);

  const fillCircleGroup = gaugeGroup.append('g').attr('clip-path', `url(#${clipId})`);
  fillCircleGroup
    .append('circle')
    .attr('cx', radius)
    .attr('cy', radius)
    .attr('r', fillCircleRadius)
    .style('fill', config.waveColor);

  const text2 = fillCircleGroup
    .append('text')
    .text(textRounder(textStartValue) + percentText)
    .attr('class', 'liquidFillGaugeText')
    .attr('text-anchor', 'middle')
    .attr('font-size', `${textPixels}px`)
    .style('fill', config.waveTextColor)
    .attr('transform', `translate(${radius},${textY})`);

  if (config.valueCountUp) {
    for (const text of [text1, text2]) {
      text
        .transition()
        .duration(config.waveRiseTime)
        .tween('text', function () {
          const i = interpolate(textStartValue, textFinalValue);
          return (t: number) => {
            this.textContent = textRounder(i(t)) + percentText;
          };
        });
    }
  }

  const waveGroupXPosition = fillCircleMargin + fillCircleRadius * 2 - waveClipWidth;
  if (config.waveRise) {
    wave.attr('transform', 'translate(1,0)');
    waveGroup
      .attr('transform', `translate(${waveGroupXPosition},${waveRiseScale(0)})`)
      .transition()
      .duration(config.waveRiseTime)
      .attr('transform', `translate(${waveGroupXPosition},${waveRiseScale(fillPercent)})`);
  } else {
    waveGroup.attr('transform', `translate(${waveGroupXPosition},${waveRiseScale(fillPercent)})`);
  }

  if (config.waveAnimate) {
    const animateWave = () => {
      wave
        .attr('transform', `translate(${waveAnimateScale(0)},0)`)
        .transition()
        .duration(config.waveAnimateTime)
        .ease(easeLinear)
        .attr('transform', `translate(${waveAnimateScale(1)},0)`)
        .on('end', animateWave);
    };
    animateWave();
  }
}
