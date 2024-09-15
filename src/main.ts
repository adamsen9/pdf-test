import puppeteer from "puppeteer";
import { testHtml } from "./template";

const data = {
  title: "Test pdf",
  bodyText: "This is the body of the generated pdf",
};

//const fileName = `pdfTest.${new Date().toISOString()}.pdf`;
const fileName = "test.pdf";
const html = dataToHtml(testHtml());

const browser = await puppeteer.launch({ browser: "chrome" });
const page = await browser.newPage();

await page.setContent(html);

const pdfBuffer = await page.pdf({ format: "A4" });
await browser.close();

await Bun.write(fileName, pdfBuffer);

// write to local directory

function dataToHtml(data: HTMLElement): string {
  return data.outerHTML;
}
