const puppeteer = require('puppeteer');
const { expect } = require('chai');
const ParkingPage = require('./pages/parkingPage');

describe('Parking Cost Calculator page',()=> {
    let browser;
    let page;
    let parkingPage;
    let parkingTitle;
    let parkingCost;
    let parkingLot;
    let startDate;
    let startTime;
    let leavingDate;
    let leavingTime;
  

    before(async () => {
        browser = await puppeteer.launch({headless:false});
        page = await browser.newPage()
        parkingPage = new ParkingPage(page);
        await parkingPage.open(page);
    });
    
    it("should show Parking Cost Calculator title", async()=>{
        parkingTitle = await parkingPage.getTitle(page);
        expect(parkingTitle).to.eql('PARKING COST CALCULATOR');
    });

    describe('Valet Parking option', async()=>{
        

        it("should calcule $12 when parking time takes less than 5 hours",async()=>{
            parkingLot = 'Valet Parking';
            startDate = '01/27/2021';
            startTime = '9';
            leavingDate = '01/27/2021';
            leavingTime = '10';
            parkingCost = await parkingPage.estimateParkingCost(page,parkingLot,startDate,startTime,leavingDate,leavingTime);
            for(let j = 0; j< parkingCost.length; j++){
                const currentNode = parkingCost[j];
                if(j == 1){
                    expect(currentNode).to.eql('$ 12.00');
                    console.log(currentNode);
                }
                
            } 
        });
    
        
        it("should calcule $12 when parking time takes 5 hours",async()=>{
            parkingLot = 'Valet Parking';
            startDate = '01/27/2021';
            startTime = '6';
            leavingDate = '01/27/2021';
            leavingTime = '11';
            parkingCost = await parkingPage.estimateParkingCost(page,parkingLot,startDate,startTime,leavingDate,leavingTime);
            for(let j = 0; j< parkingCost.length; j++){
                const currentNode = parkingCost[j];
                if(j == 1){
                    expect(currentNode).to.eql('$ 12.00');
                    console.log(currentNode);
                }
                
            } 
        });
    
        it("should calcule $18 when parking time takes more than 5 hours",async()=>{
            parkingLot = 'Valet Parking';
            startDate = '01/27/2021';
            startTime = '7';
            leavingDate = '01/27/2021';
            leavingTime = '1';
            const pmRadio = await parkingPage.getPM(page);
            parkingCost = await parkingPage.estimateParkingCost(page,parkingLot,startDate,startTime,leavingDate,leavingTime);
            for(let j = 0; j< parkingCost.length; j++){
                const currentNode = parkingCost[j];
                if(j == 1){
                    expect(currentNode).to.eql('$ 18.00');
                    console.log(currentNode);
                }
                
            }  
        });
        
        it("should calcule $36 when parking time takes 2 days",async()=>{
            parkingLot = 'Valet Parking';
            startDate = '01/27/2021';
            startTime = '7';
            leavingDate = '01/29/2021';
            leavingTime = '7';
            parkingCost = await parkingPage.estimateParkingCost(page,parkingLot,startDate,startTime,leavingDate,leavingTime);
            for(let j = 0; j< parkingCost.length; j++){
                const currentNode = parkingCost[j];
                if(j == 1){
                    expect(currentNode).to.eql('$ 36.00');
                    console.log(currentNode);
                }
                
            } 
        });

        
    
        it("should display an error message when leaving day comes before entry day",async()=>{
            parkingLot = 'Valet Parking';
            startDate = '01/28/2021';
            startTime = '7';
            leavingDate = '01/27/2021';
            leavingTime = '7';
            parkingCost = await parkingPage.estimateParkingCost(page,parkingLot,startDate,startTime,leavingDate,leavingTime);
            for(let j = 0; j< parkingCost.length; j++){
                const currentNode = parkingCost[j];
                if(j == 1){
                    expect(currentNode).to.eql('ERROR! YOUR LEAVING DATE OR TIME IS BEFORE YOUR STARTING DATE OR TIME');
                    console.log(currentNode);
                }
                
            }
        });
    
        it("should display an error message when leaving time comes before entry time",async()=>{
            parkingLot = 'Valet Parking';
            startDate = '01/27/2021';
            startTime = '7';
            leavingDate = '01/27/2021';
            leavingTime = '12';
            parkingCost = await parkingPage.estimateParkingCost(page,parkingLot,startDate,startTime,leavingDate,leavingTime);
            for(let j = 0; j< parkingCost.length; j++){
                const currentNode = parkingCost[j];
                if(j == 1){
                    expect(currentNode).to.eql('ERROR! YOUR LEAVING DATE OR TIME IS BEFORE YOUR STARTING DATE OR TIME');
                    console.log(currentNode);
                }
                
            }    
        });

    });

    describe('Short-Term Parking option', async()=>{
        
        it("should calcule $2 when parking time takes 1 hour",async()=>{
            parkingLot = 'Short-Term Parking';
            startDate = '01/27/2021';
            startTime = '7';
            leavingDate = '01/27/2021';
            leavingTime = '8';
            parkingCost = await parkingPage.estimateParkingCost(page,parkingLot,startDate,startTime,leavingDate,leavingTime);
            for(let j = 0; j< parkingCost.length; j++){
                const currentNode = parkingCost[j];
                if(j == 1){
                    expect(currentNode).to.eql('$ 2.00');
                    console.log(currentNode);
                }
                
            } 
    
        });

        it("should calcule $3 when parking time takes 1.5 hour",async()=>{
            parkingLot = 'Short-Term Parking';
            startDate = '01/27/2021';
            startTime = '7';
            leavingDate = '01/27/2021';
            leavingTime = '8:30';
            parkingCost = await parkingPage.estimateParkingCost(page,parkingLot,startDate,startTime,leavingDate,leavingTime);
            for(let j = 0; j< parkingCost.length; j++){
                const currentNode = parkingCost[j];
                if(j == 1){
                    expect(currentNode).to.eql('$ 3.00');
                    console.log(currentNode);
                }
                
            }
    
        });
    });

    describe('Long-Term Garage Parking',async()=>{
   
       it("should calculate $2 when parking time takes 1 hour",async()=>{
            parkingLot = 'Long-Term Garage Parking';
            startDate ='01/29/2021';
            starTime = '7';
            leavingDate = '01/29/2021';
            leavingTime = '8';
            parkingCost = await parkingPage.estimateParkingCost(page,parkingLot,startDate,startTime,leavingDate,leavingTime);
            for(let j= 0; j< parkingCost.length; j++){
                const currentNode = parkingCost[j];
                if(j == 1){
                    expect(currentNode).to.eql('$ 2.00');
                    console.log(currentNode);
                }
            }
        });

        it("should calculate $12 when parking time takes 1 day",async()=>{
            parkingLot = 'Long-Term Garage Parking';
            startDate ='01/29/2021';
            starTime = '7';
            leavingDate = '01/30/2021';
            leavingTime = '7';
            parkingCost = await parkingPage.estimateParkingCost(page,parkingLot,startDate,startTime,leavingDate,leavingTime);
            for(let j= 0; j< parkingCost.length; j++){
                const currentNode = parkingCost[j];
                if(j == 1){
                    expect(currentNode).to.eql('$ 12.00');
                    console.log(currentNode);
                }
            }
        });

        it("should calculate $36 when parking time takes 3 days",async()=>{
            parkingLot = 'Long-Term Garage Parking';
            startDate ='01/29/2021';
            starTime = '7';
            leavingDate = '02/01/2021';
            leavingTime = '7';
            parkingCost = await parkingPage.estimateParkingCost(page,parkingLot,startDate,startTime,leavingDate,leavingTime);
            for(let j= 0; j< parkingCost.length; j++){
                const currentNode = parkingCost[j];
                if(j == 1){
                    expect(currentNode).to.eql('$ 36.00');
                    console.log(currentNode);
                }
            }
        });

        it("should calculate $72 when parking time takes 7 days",async()=>{
            parkingLot = 'Long-Term Garage Parking';
            startDate ='01/29/2021';
            starTime = '7';
            leavingDate = '02/05/2021';
            leavingTime = '7';
            parkingCost = await parkingPage.estimateParkingCost(page,parkingLot,startDate,startTime,leavingDate,leavingTime);
            for(let j= 0; j< parkingCost.length; j++){
                const currentNode = parkingCost[j];
                if(j == 1){
                    expect(currentNode).to.eql('$ 72.00');
                    console.log(currentNode);
                }
            }
        });

        it("should calculate $228 when parking time takes 22 days",async()=>{
            parkingLot = 'Long-Term Garage Parking';
            startDate ='01/29/2021';
            starTime = '7';
            leavingDate = '02/20/2021';
            leavingTime = '7';
            parkingCost = await parkingPage.estimateParkingCost(page,parkingLot,startDate,startTime,leavingDate,leavingTime);
            for(let j= 0; j< parkingCost.length; j++){
                const currentNode = parkingCost[j];
                if(j == 1){
                    expect(currentNode).to.eql('$ 228.00');
                    console.log(currentNode);
                }
            }
        });


    });

    describe('Long-Term Surface Parking(North Lot)',async()=>{
        after(async()=>{
            await browser.close();
        });

        it("should calculate $2 when parking time takes 1 hour",async()=>{
            parkingLot = 'Long-Term Surface Parking';
            startDate ='01/29/2021';
            starTime = '7';
            leavingDate = '01/29/2021';
            leavingTime = '8';
            parkingCost = await parkingPage.estimateParkingCost(page,parkingLot,startDate,startTime,leavingDate,leavingTime);
            for(let j= 0; j< parkingCost.length; j++){
                const currentNode = parkingCost[j];
                if(j == 1){
                    expect(currentNode).to.eql('$ 2.00');
                    console.log(currentNode);
                }
            }
        
        

            
        });

        it("should calculate $12 when parking time takes 1 day and 1 hour",async()=>{
            parkingLot = 'Long-Term Surface Parking';
            startDate ='01/29/2021';
            starTime = '7';
            leavingDate = '01/30/2021';
            leavingTime = '8';
            parkingCost = await parkingPage.estimateParkingCost(page,parkingLot,startDate,startTime,leavingDate,leavingTime);
            for(let j= 0; j< parkingCost.length; j++){
                const currentNode = parkingCost[j];
                if(j == 1){
                    expect(currentNode).to.eql('$ 12.00');
                    console.log(currentNode);
                }
            }
        
        

            
        });

        it("should calculate $184 when parking time takes 3 weeks and 2 hours",async()=>{
            parkingLot = 'Long-Term Surface Parking';
            startDate ='01/29/2021';
            starTime = '7';
            leavingDate = '02/19/2021';
            leavingTime = '9';
            parkingCost = await parkingPage.estimateParkingCost(page,parkingLot,startDate,startTime,leavingDate,leavingTime);
            for(let j= 0; j< parkingCost.length; j++){
                const currentNode = parkingCost[j];
                if(j == 1){
                    expect(currentNode).to.eql('$ 184.00');
                    console.log(currentNode);
                }
            }
        
        

            
        });

        it("should calculate $252 when parking time takes 4 weeks and 1 hour",async()=>{
            parkingLot = 'Long-Term Surface Parking';
            startDate ='01/29/2021';
            starTime = '7';
            leavingDate = '02/27/2021';
            leavingTime = '8';
            parkingCost = await parkingPage.estimateParkingCost(page,parkingLot,startDate,startTime,leavingDate,leavingTime);
            for(let j= 0; j< parkingCost.length; j++){
                const currentNode = parkingCost[j];
                if(j == 1){
                    expect(currentNode).to.eql('$ 252.00');
                    console.log(currentNode);
                }
            }
        
        

            
        });


    });













});
