/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Printer,
  Image,
  Alignment,
  FontFamily,
  StyleString,
} from '@node-escpos/core';
// install escpos-usb adapter module manually
import { default as USB } from '@node-escpos/usb-adapter';
import fs from 'fs';

interface TextOptions {
  font: string;
  align: string;
  style: string;
  size: [number, number];
}

interface ItemLine {
  name: string;
  price: number;
  qty: number;
}

export class TicketPrinter {
  private defaultTextOptions: TextOptions = {
    font: 'a',
    align: 'lt',
    style: 'normal',
    size: [1, 1],
  };
  private printer: Printer<[]>;
  private vendorID: number;
  private productID: number;
  private paperWidth: number = 32;
  private device: USB;

  constructor(vendorID: number, productID: number, paperWidth: number = 32) {
    this.vendorID = vendorID;
    this.productID = productID;
    this.paperWidth = paperWidth;

    this.device = new USB(this.vendorID, this.productID);
  }
  async open() {
    return new Promise((resolve, reject) => {
      this.device.open((err) => {
        if (err) {
          if (err instanceof Error) {
            reject(err);
          } else {
            reject(new Error('Unknown error'));
          }
        } else {
          const options = {
            // encoding: "GB18030" /* default */,
            encoding: 'utf8' /* default */,
            width: this.paperWidth, // default 32
          };
          this.printer = new Printer(this.device, options);
          this.printer.setCharset(1);
          resolve(this);
        }
      });
    });
  }

  close() {
    this.printer.cut().close();
  }

  async printImage(imagePath: string) {
    if (!fs.existsSync(imagePath)) {
      throw new Error('Image file does not exist');
    }
    const image = await Image.load(imagePath, 'image/png');
    this.printer = await this.printer.image(
      image,
      'd8', // changing with image
    );
    return this;
  }

  printText(text: string, options: Partial<TextOptions> = {}) {
    this.setTextStyle(options);
    this.printer.text(text);
    return this;
  }
  setTextStyle(options: Partial<TextOptions>) {
    const textOptions: TextOptions = { ...this.defaultTextOptions, ...options };
    this.printer
      .font(textOptions.font as FontFamily)
      .align(textOptions.align as Alignment)
      .style(textOptions.style as StyleString)
      .size(textOptions.size[0], textOptions.size[1]);
    return this;
  }
  drawLine(char: string, options: Partial<TextOptions>) {
    this.setTextStyle(options);
    this.printer.drawLine(char);
    return this;
  }

  emptyLine(count: number = 1) {
    this.printer.newLine(count);
    return this;
  }

  async printQR(url: string) {
    this.printer = await this.printer.qrimage(url);
    return this;
  }

  printItemsHeader() {
    this.printer.tableCustom([
      { text: `Article`, align: 'LEFT', width: 0.5 },
      { text: `Qte`, align: 'RIGHT', width: 0.15 },
      { text: `Px`, align: 'RIGHT', width: 0.15 },

      { text: `total`, align: 'RIGHT', width: 0.18 },
    ]);
    return this;
  }
  printItemsLine(item: ItemLine) {
    this.printer.tableCustom([
      { text: `${item.name}`, align: 'LEFT', width: 0.49 },
      { text: `${item.qty}`, align: 'RIGHT', width: 0.1 },
      { text: `${item.price} €`, align: 'RIGHT', width: 0.2 },

      { text: `${item.price * item.qty} €`, align: 'RIGHT', width: 0.2 },
    ]);
    return this;
  }

  printItemsTotal(total: number) {
    this.printer.tableCustom([
      { text: `Total`, align: 'LEFT', width: 0.5 },

      { text: `${total} €`, align: 'RIGHT', width: 0.5 },
    ]);
    return this;
  }
}
