import puppeteer from 'puppeteer'
import { login, getCurriculumId } from '../functions/index.mjs'

let browser
let page

beforeAll(async () => {
  browser = await puppeteer.launch()
  page = await browser.newPage()
  await

  describe('Progress Tracker login page', async() => {


    test('has title "Progress Tracker"', async() => {
      await page.goto('https://progress.appacademy.io/students/auth/github/', { waitUntil: 'networkidle0'})
      const title = await page.title()
      expect(title).toBe('Progress Tracker')

    })

  })
  await page.goto('');
    await login(page);

  })

  it('should be called with a browser page instance', () => {
    spy = chai.spy.on(getCurriculumId);
    await getCurriculumId(page);
    expect(spy).to.have.been.called.with(page)
  })

  it('should evaluate that browser page', () => {
    spy = chai.spy.on(page, 'evaluate');
    await getCurriculumId(page);
    expect(spy).to.have.been.called(1);
  })

  it('should return the current week', () => {
    const [w, d] = await getCurriculumId(page);
    expect(w).to.equal(8);
  })

  it('should return the current day', () => {
    const [w, d] = await getCurriculumId(page);
    expect(d).to.equal(4);
  })
