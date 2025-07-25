import { test, expect } from '@playwright/test'
import { Career } from '../pages/career'
import { BaseActions } from '../models/baseActions'
import { TIMEOUT } from 'dns'

let career
let baseActions

test.beforeEach(async ({ page }) => {
 career = new Career(page)
 baseActions = new BaseActions(page)
 await page.goto('https://rozetka.com.ua/ua/careers/')
})
test.only('Filtering in AllWays dropdown', async ({ page }) => {
 await page.locator(career.allWaysDropdown).selectOption({ value: '9' })
 await page.waitForTimeout(3000)
 await baseActions.clickOnElement(career.showVacanciesButton)
 await expect(page.locator(career.allWaysDropdown)).toHaveValue('9')
})
