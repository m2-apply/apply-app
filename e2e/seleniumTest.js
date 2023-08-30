const webdriver = require('selenium-webdriver');
const { By, until, Builder } = webdriver;
const assert = require("assert");

async function HomePageTest(driver) {
    let title = await driver.getTitle();
    assert.equal("Document", title);
    let loadingPage = await driver.findElement(By.className('landingPage')).isDisplayed();
    assert.equal(loadingPage, true);
    let login_button = await driver.findElement(By.className('genericButton blue')).isDisplayed();
    assert.equal(login_button, true);
    let signup_button = await driver.findElement(By.className('genericButton white')).isDisplayed();
    assert.equal(signup_button, true);
    console.log('loadingPage sucess!');
}


async function loginTest(driver, username, email, password, passwordConfirm) {
    let login_button = await driver.findElement(By.className('genericButton blue'));
    await login_button.click();
    console.log('login sucess!');
}

async function mapPageTest(driver) {
    let map = await driver.findElement(By.className('map')).isDisplayed();
    assert.equal(map, true);
    let set_new_point_button = await driver.findElement(By.className('genericButtonMap white'));
    await set_new_point_button.click();
    let mapCanvas = await driver.findElement(By.className('mapCanvas setting')).isDisplayed();
    assert.equal(mapCanvas, true);
    let logout_button = await driver.findElement(By.className('genericButtonMap white'));
    await logout_button.click();
    let loadingPage = await driver.findElement(By.className('landingPage')).isDisplayed();
    assert.equal(loadingPage, true);
    console.log('mapPage sucess!');
}

(async function () {
    const driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://localhost:8080/');

    try {
        await HomePageTest(driver);
        await driver.manage().setTimeouts({ implicit: 500000 });
        await loginTest(driver);
        await driver.manage().setTimeouts({ implicit: 500000 });
        await mapPageTest(driver);
        // await driver.findElement(By.className('card')).click();
        // await driver.wait(until.elementLocated(By.className('add-container')), 10000);
        // await driver.findElement(By.className('env-button2')).click();
        // await driver.wait(until.elementLocated(By.className('add-container')), 10000);
        // await localHostedTest(
        //     driver,
        //     'Docker',
        //     'SQL',
        //     'mongodb://localhost:27017/mydb',
        //     'Test Docker',
        //     'A description of my app'
        // );

        // await driver.findElement(By.id('card-add')).click();
        // await driver.wait(until.elementLocated(By.className('add-container')), 10000);
        // await driver.findElement(By.className('env-button2')).click();
        // await driver.wait(until.elementLocated(By.className('add-container')), 10000);
        // await localHostedTest(
        //     driver,
        //     'Kubernetes',
        //     'MongoDB',
        //     'mongodb://localhost:27017/mydb',
        //     'Test Kubernetes',
        //     'A description of my app'
        // );

        // await driver.findElement(By.id('card-add')).click();
        // await driver.wait(until.elementLocated(By.className('add-container')), 10000);
        // await driver.findElement(By.className('env-button')).click();
        // await driver.wait(until.elementLocated(By.className('add-container')), 10000);
        // await cloudHostedTest(
        //     driver,
        //     'Elastic Compute Cloud (EC2)',
        //     'i-1234567890abcdef0',
        //     'us-east-1',
        //     'your-access-key',
        //     'your-secret-access-key',
        //     'mongodb://your-mongodb-url',
        //     'Test AWS',
        //     'Test MongoDB Database'
        // );

        // await driver.findElement(By.className('personIconArea')).click();
        // const signUpButton = await driver.wait(
        //     until.elementLocated(By.xpath('//span[text()="Sign Up"]')),
        //     10000
        // );
        // await driver.wait(until.elementIsEnabled(signUpButton), 10000);
        // await signUpButton.click();
        // await signupTest(driver, 'testUser', 'testEmail@test.com', 'testPassword', 'testPassword');

        console.log('E2E test completed successfully');
    } catch (error) {
        console.error('E2E test failed:', error);
    } finally {
        await driver.executeScript('window.close()');
        //await driver.quit();
    }
})();

// const {By, Builder, Browser} = require('selenium-webdriver');
// const {suite} = require('selenium-webdriver/testing');
// const assert = require("assert");

// suite(function (env) {
//   describe('First script', function () {
//     let driver;

//     before(async function () {
//       driver = await new Builder().forBrowser('chrome').build();
//     });

//     after(async () => await driver.quit());

//     it('First Selenium script', async function () {
//       await driver.get('http://localhost:8080/');

//       let title = await driver.getTitle();
//       assert.equal("Web form", title);

//       await driver.manage().setTimeouts({implicit: 500});

//       let textBox = await driver.findElement(By.name('my-text'));
//       let submitButton = await driver.findElement(By.css('button'));

//       await textBox.sendKeys('Selenium');
//       await submitButton.click();

//       let message = await driver.findElement(By.id('message'));
//       let value = await message.getText();
//       assert.equal("Received!", value);
//     });
//   });
// }, { browsers: [Browser.CHROME, Browser.FIREFOX]});