import { Injectable, ElementRef } from '@angular/core';
import { SVG }  from '@svgdotjs/svg.js';

@Injectable({
  providedIn: 'root'
})
export class SvgService {
  
  constructor() {}

  importSvg(svgJson: string, svgContainer: ElementRef): void {
    const svgData = JSON.parse(svgJson);
    const draw = SVG().addTo(svgContainer.nativeElement).size('100%', '100%');
    draw.rect(svgData.rect.width, svgData.rect.height).attr({ fill: svgData.rect.fill });
  }

  exportSvg(svgElement: SVGElement): string {
    const svgJson = {
      width: svgElement.getAttribute('width'),
      height: svgElement.getAttribute('height'),
      rect: {
        width: svgElement.querySelector('rect')?.getAttribute('width'),
        height: svgElement.querySelector('rect')?.getAttribute('height'),
        fill: svgElement.querySelector('rect')?.getAttribute('fill')
      }
    };
    return JSON.stringify(svgJson);
  }
}