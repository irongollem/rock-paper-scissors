module.exports = {
    'Page load test'  : function (browser) {
        browser
            .url('http://localhost:80')
            .waitForElementVisible('body')

        browser.expect.element('#yourSprite').to.have.attribute('src').which.contains('assets/images/rock-paper-scissors.png')
        
        browser.click('button:first-child')
            .pause(1000);
        
        browser.expect.element('#yourSprite').to.have.attribute('src').which.contains('assets/images/rock.png')

        browser.end();
    }
}
