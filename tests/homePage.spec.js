import { test, expect } from '@playwright/test'
import { Homepage } from '../pages/homepage'
import { BaseActions } from '../models/baseActions'

let homepage
let baseActions

test.beforeEach(async ({ page }) => {
 homepage = new Homepage(page)
 baseActions = new BaseActions(page)
 await page.goto('https://rozetka.com.ua/')
})

test('User is able to go to confirming modal', async ({ page }) => {
 const iframeContainer = page.frameLocator('#evoAuthElement iframe')

 await baseActions.clickOnElement(homepage.loginIcon)
 await expect(iframeContainer.locator(homepage.phoneInput)).toBeVisible()
 await iframeContainer.locator(homepage.phoneInput).fill('987719789')
 await iframeContainer.locator(homepage.submitPhone).click()
 await iframeContainer.locator(homepage.codeStep).isVisible()
})

test('User is able to search by input name', async ({ page }) => {
 await baseActions.fillInput(homepage.searchFormInput, 'iphone')
 await baseActions.clickOnElement(homepage.searchFormSubmit)
 await expect(page.url()).toContain('?text=iphone')
})
test('Search by Product Code', async ({ page }) => {
 await baseActions.fillInput(homepage.searchFormInput, 'iphone 16')
 await baseActions.clickOnElement(homepage.searchFormSubmit)
 expect(homepage.categoryGoods.length).toBeGreaterThan(1)
 const elements = page.locator(homepage.categoryGoods)
 const count = await elements.count()
 for (let i = 0; i < count; i++) {
  const text = await elements.nth(i).textContent()
  expect(text).toContain('iPhone 16')
 }
})
test('Search unavailable item', async ({ page }) => {
 await baseActions.fillInput(homepage.searchFormInput, 'asdqwerty')
 await baseActions.clickOnElement(homepage.searchFormSubmit)
 const noResultsMessage = page.locator('.search-nothing')
 await expect(noResultsMessage).toContainText(
  ' За запитом «asdqwerty» нічого не знайдено :('
 )
 await baseActions.clickOnElement(homepage.searchNothingChangeButton)
 await baseActions.isElementVisible(homepage.searchFormInput)
})
test.only('Sorting from cheaper-expensive', async ({ page }) => {
 await baseActions.fillInput(homepage.searchFormInput, 'Zelmer')
 await baseActions.clickOnElement(homepage.searchFormSubmit)
 console.log()
 await baseActions.isElementVisible(homepage.sortingDropdown)
 await baseActions.sortItems('cheap')
})
