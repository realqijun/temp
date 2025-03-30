const puppeteer = require('puppeteer')

const visitUrl = async (url, cookieDomain) => {
    let browser =
        await puppeteer.launch({
            headless: true,
            pipe: true,
            dumpio: true,
            ignoreHTTPSErrors: true,
            args: [
                '--incognito',
                '--no-sandbox',
                '--disable-gpu',
                '--disable-software-rasterizer',
                '--disable-dev-shm-usage',
            ]
        })

    try {
        const page = await browser.newPage()

        try {
            await page.setCookie({
                name: 'flag',
                value: process.env.FLAG || 'cs2107{fake_flag}',
                domain: cookieDomain,
                httpOnly: false,
                samesite: 'strict'
            })
            await page.goto(url, { timeout: 6000, waitUntil: 'networkidle2' })
        } finally {
            await page.close()
            await browser.close()
        }
    }
    finally {
        browser.close()
    }
}

module.exports = { visitUrl };