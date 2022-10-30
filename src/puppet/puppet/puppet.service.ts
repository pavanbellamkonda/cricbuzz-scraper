import { Injectable } from '@nestjs/common';
import { Browser, ElementHandle, launch, Page } from 'puppeteer';

@Injectable()
export class PuppetService {

  private browser: Browser;
  constructor() {
    launch({
      headless: false,
      args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
    }).then(browser => {
      this.browser = browser;
    });
  }

  async openPage(url: string): Promise<Page> {
    const page = await this.browser.newPage();

    await page.goto(url);
    return page;
  }

  async waitForPageLoad(page: Page) {
    await page.waitForNavigation({
      waitUntil: 'networkidle0'
    });
  }

  async getElement (page: Page, selector: string): Promise<ElementHandle>{
    const ele = await page.$(selector);
    if (ele) return ele;

    await page.waitForSelector(selector);
    return page.$(selector);
  }

  async getChildrenElements (ele: ElementHandle, selector: string): Promise<ElementHandle[]>{
    return ele.$$(selector);
  }
}
