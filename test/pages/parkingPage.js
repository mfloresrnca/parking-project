

class ParkingPage{
    
    constructor(page){
        this.page = page;
        
        
    }
    
    async open(page){
        return await page.goto('https://www.shino.de/parkcalc/', { waitUntil: 'networkidle2' });
    }

    async getTitle(page){
        let i;
        const parkingTitle = '.pagetitle';
        await page.waitForSelector(parkingTitle);
        i = await page.$eval(parkingTitle, i => i.innerText);
        return i;
    }



    async estimateParkingCost(page,parkingLot,startDate,startTime,leavingDate,leavingTime){
        const parkingLotOption = await page.$("#ParkingLot");
        await parkingLotOption.type(parkingLot);
        const startDateInput = await page.$('#StartingDate');
        await startDateInput.click({clickCount:3});
        await startDateInput.type(startDate);
        const startTimeInput = await page.$('#StartingTime');
        await startTimeInput.click({clickCount:3});
        await startTimeInput.type(startTime);

        const leavingDateInput = await page.$('#LeavingDate');
        await leavingDateInput.click({clickCount:3});
        await leavingDateInput.type(leavingDate);
       
        const leavingTimeInput = await page.$('#LeavingTime');
        await leavingTimeInput.click({clickCount:3});
        await leavingTimeInput.type(leavingTime);
        await page.click('[name="Submit"]');

        
        await page.waitForSelector('.subhead'); /*wait for cost*/
        const costText = await page.$$eval('.subhead',divs => divs.map(({ innerText }) => innerText));
        
        return costText;
    }

    async getPM(page){
        const pmRadio = await page.$$('input[name="LeavingTimeAMPM"]');
        pmRadio[1].click();
      
        
    }


}

module.exports = ParkingPage;