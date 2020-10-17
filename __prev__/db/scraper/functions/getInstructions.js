const fs = require('fs').promises;

const puppeteer = require('puppeteer-extra');
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');

const { Op } = require('sequelize');

const { Exercise, Muscle, sequelize } = require('../../models');

puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: '2captcha',
      token: '463c02eedcbb6ed46d6aae3f3c89815f',
      visualFeedback: true,
    },
  })
);

const get = async () => {
  const exercises = await Exercise.findAll();
  const numOfExercises = (await exercises).length;
  for (let i = 791; i < numOfExercises; i++) {
    const exercise = await exercises[i];
    const exerciseId = exercise.dataValues.id;
    const bbPageUrl = exercise.dataValues.bbPageUrl;
    try {
      const instructions = await getInstructions(exerciseId, bbPageUrl);
      await fs.appendFile('./scraper/seeds/instructions.json', JSON.stringify(instructions));
      console.log(`Exercise ${i} ID ${exercise.dataValues.id}, ${numOfExercises - i} remaining...`);
    } catch (e) {
      console.log(`ERROR: Exercise ${i}`);
      await fs.appendFile('./scraper/errors/instructions.json', JSON.stringify({ exerciseId: exercise.dataValues.id }));
    }
  }
};

get();

const getInstructions = async (exerciseId, bbPageUrl) => {
  const browser = await puppeteer.launch({ headless: true });

  const page = await browser.newPage();

  // const url = 'https://www.bodybuilding.com/exercises/dumbbell-bench-press';
  await page.goto(bbPageUrl);

  // click on sign in
  const SEL_LINK_SIGN_IN =
    '#js-ex-content > div > section.ExDetail-section.ExDetail-photos.paywall__xdb-details > div.ExDetail-ctaModule.grid-2-offset.grid-2-offset-l.grid-no-offset-m.grid-no-offset-s.grid-8.grid-8-l.grid-12-m.grid-12-s > div > div.sub-pricing-cta--topHalfContainer > section.sub-pricing-cta--login > p > a';

  const SEL_USERNAME = '#login-username-input';
  const SEL_PASSWORD = '#login-password-input';
  const SEL_BTN_SIGN_IN = '#login-submit-button';
  const SEL_OL = '#js-ex-content > div > section.ExDetail-section.ExDetail-guide > div > div.grid-8.grid-12-s.grid-12-m > ol';
  const username = 'tagotar';
  const pw = 'C524lvb#n#9o';

  await page.waitForSelector(SEL_LINK_SIGN_IN);
  await page.click(SEL_LINK_SIGN_IN);
  await page.waitForSelector(SEL_USERNAME);

  await page.click(SEL_USERNAME);
  await page.keyboard.type(username);
  await page.click(SEL_PASSWORD);
  await page.keyboard.type(pw);
  await page.click(SEL_BTN_SIGN_IN);
  await page.solveRecaptchas();

  await page.waitForSelector(SEL_OL);

  const instructions = await page.evaluate(
    (sel, exerciseId) => {
      const res = [];
      const items = document.querySelector(sel).children;
      for (item of items) {
        res.push({
          instruction: item.innerText,
          exerciseId: exerciseId,
        });
      }
      return res;
    },
    SEL_OL,
    exerciseId
  );
  browser.close();
  return instructions;
};
