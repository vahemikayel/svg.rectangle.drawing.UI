import { Component, OnInit, ElementRef, ViewChild, HostListener, ChangeDetectorRef  } from '@angular/core';
import { SvgService } from '../svg-service.service';
import { ApiService } from '../api.service';
import { SvgModel } from '../models/svg.model';
import '@svgdotjs/svg.draggable.js';
import { SVG } from '@svgdotjs/svg.js';
import interact from 'interactjs';
// import '@svgdotjs/svg.resize.js';

declare var svgResize: any;

@Component({
  selector: 'app-svg-drawing',
  templateUrl: './svg-drawing.component.html',
  styleUrls: ['./svg-drawing.component.css'],
  standalone: true
})
export class SvgDrawingComponent implements OnInit {
  @ViewChild('svgContainer', { static: true }) svgContainer!: ElementRef;

  perimeter: number = 0;
  private isResizing: boolean = false;
  private draw: any;
  svgData!: SvgModel;

  constructor(private svgService: SvgService, private apiService: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.apiService.getSVG().subscribe({
      next: data => {
        this.svgData = data;
        this.updatePerimeter();
      },
      error: err => {
        console.error('Error fetching initial dimensions', err);
      }
    });
  }

  ngAfterViewInit() {
    this.initSvg();
  }

  initSvg() {
    this.draw = SVG().addTo(this.svgContainer.nativeElement).size('100%', '100%');
    const rect = this.draw.rect(this.svgData.width, this.svgData.height).attr({ fill: '#f06' });

    rect.draggable();
    interact(rect.node)
      .draggable({
        onmove: event => {
          const target = event.target;
          const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
          const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
          target.style.transform = `translate(${x}px, ${y}px)`;
          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);

          this.updatePerimeter();
        },
        onend: () => {
          this.updateDimensionsFromElement(rect);
        }
      })
      .resizable({
        edges: { left: true, right: true, bottom: true, top: true },
        listeners: {
          move: event => {
            const target = event.target;
            let x = (parseFloat(target.getAttribute('data-x')) || 0);
            let y = (parseFloat(target.getAttribute('data-y')) || 0);

            target.style.width = event.rect.width + 'px';
            target.style.height = event.rect.height + 'px';

            x += event.deltaRect.left;
            y += event.deltaRect.top;

            target.style.transform = `translate(${x}px, ${y}px)`;
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);

            rect.size(event.rect.width, event.rect.height);

            this.updatePerimeter();
          },
          end: () => {
            this.updateDimensionsFromElement(rect);
          }
        }
      });

    this.updateDimensionsFromElement(rect);

  }

  updateDimensionsFromElement(rect: any) {
    this.svgData.width = rect.width();
    this.svgData.height = rect.height();
    this.updatePerimeter();
    this.apiService.saveDimensions(this.svgData).subscribe({
      next: () => {
        console.log('Dimensions updated successfully');
      },
      error: err => {
        console.error('Error updating dimensions', err);
      }
    });
  }

  updatePerimeter() {
    this.perimeter = 2 * (this.svgData.width + this.svgData.height);
    this.cdr.detectChanges();
  }

  exportSvg() {
    const svgJson = this.svgService.exportSvg(this.svgContainer.nativeElement.querySelector('svg'));
    console.log(svgJson);
  }

  importSvg(svgJson: string) {
    this.svgService.importSvg(svgJson, this.svgContainer);
    this.updatePerimeter();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const svgJson = e.target.result;
        this.importSvg(svgJson);
      };
      reader.readAsText(input.files[0]);
    }
  }
}