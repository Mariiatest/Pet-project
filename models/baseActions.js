export class BaseActions {
 constructor(page) {
  this.page = page
 }
 visit = async () => await this.page.goto('https://rozetka.com.ua/')

 async clickOnElement(selector) {
  await this.page.click(selector)
 }

 async isInputElement(page, selector) {
  return await page.$eval(selector, (el) => {
   const tagName = el.tagName.toLowerCase()
   return tagName === 'input' || tagName === 'textarea'
  })
 }
async isElementVisible(selector) {
    return await this.page.isVisible(selector);
  }
  async sortItems(optionText) {
    const optionLocator = 
   
    await optionLocator.click();
  
  
}
 async fillInput(selector, data) {
  const isInput = await this.isInputElement(this.page, selector)
  if (isInput) {
   await this.page.locator(selector).fill(data)
  } else {
   const inputSelector = `${selector} input`
   await this.page.waitForSelector(
    inputSelector,
    { timeout: 30000 },
    {
     async fillInput(selector, data) {
      const isInput = await this.isInputElement(this.page, selector)
      if (isInput) {
       await this.page.fill(selector, data)
      } else {
       const inputSelector = `${selector} input`
       await this.page.waitForSelector(inputSelector, { state: 'visible' })
       await this.page.fill(inputSelector, data)
      }
     },
    }
   )
   await this.page.fill(inputSelector, data)
  }
 }
}
