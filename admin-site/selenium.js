const { Builder, By } = require('selenium-webdriver');

(async () => {
    const driver = await new Builder().forBrowser('MicrosoftEdge').build();
    try {
        await driver.get('localhost:3000/login');

        const element = await driver.findElement(By.id('login'));
        await element.sendKeys('WebDriver');
        await element.submit();

        await driver.sleep(5000);
    } finally {
        await driver.quit();
    }
})();
