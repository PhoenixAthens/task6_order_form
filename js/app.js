/*
* Potential bugs
* - Adding a computer component with certain specs, then removing them after changing the specs to something else
*   this can result in unexpected cost value.
* - Fix to above problem: Save the specs in a data structure on adding the item to the cart
*   thereby persisting the order info.
*
* */

// code to create a continuously updating clock on the webpage!
let select = document.getElementById('cur_time')
setInterval(()=>{
  let now = new Date();
  select.innerHTML=now.toLocaleTimeString();
},1000);

// flags to keep track of open popups (created by "About me" and "Login/Signup")
let flag1=false;
let flag2 = false;
let flag3 = false;

/*
function to create a popup that appears when About Me is clicked
The popup only appears if the order-checkout popup is not open
if the Login/SigUp popup is open, it's closed before opening the "About me" popup
*/
let popup = document.getElementById('popup1');
function openPop1(){
  if(!orderPlacementInProgress){
    if(flag2){
      document.getElementById('popup2').classList.remove('openPop2');
    }
    if(flag3)closePop3()
    popup.classList.add("openPop");
    flag1 = true;
  }
}
// function to close the popup created by 'About Me'
function closePop1(){
  flag1=false;
  popup.classList.remove("openPop");
}

/*
* Function to open the login/signup popup
* if the 'About me' popup or the 'Welcome' popup is open
* it's closed before opening the login/Signup popup
* */
let popup2 = document.getElementById('popup2');
function openPop2(){
  if(!orderPlacementInProgress){
    flag2 = true;
    if(flag1)closePop1();
    if(flag3)closePop3();
    popup2.classList.add("openPop2");
  }
}
/*
* function to close the login/signup popup
* If the user clicks on submit button in the popup window without
* filling the input fields, the code displays the appropriate warning!
* otherwise if the fields are filled, opens the welcome popup.
*/
function closePop2(){
  let mail = document.getElementById('mail');
  let pass = document.getElementById("pass");
  if(mail.value!=="" && pass.value!=="" ){
    document.getElementById('welcome-msg').innerHTML=`WELCOME ${mail.value}`;
    document.getElementById('warn').classList.remove("warn-add");
    popup2.classList.remove("openPop2");
    openPop3();
    flag2= false;
  }else{
    document.getElementById('warn').classList.add("warn-add");
  }
}

/*
* function to close the login/signup popup and
* and to remove the warning reflected on submitting the empty signup form.
* */
function closePop2_2(){
  document.getElementById('warn').classList.remove("warn-add");
  popup2.classList.remove("openPop2");
}

/*
* Function to open the welcome popup
* */
let popup3 = document.getElementById('popup3');
function openPop3(){
  if(flag1)closePop1();
  popup3.classList.add('openPop3');
  flag3 = true;
  if(flag2){
    closePop2()
  }
}

/*
* Function to close up welcome popup
* */
function closePop3(){
  flag3=false;
  popup3.classList.remove('openPop3');
}

/*
 * Code to remove the canvas with the empty cart message
 * when an item is added to the cart
 */
let main_body = document.getElementById("main");
let main_body_h1 = document.getElementById("remove");
function removeMainBodyBuffer(){
  if(main_body.classList.contains("image_here")){
    main_body.classList.remove("image_here");
    main_body.classList.add("container-main");
    main_body_h1.classList.add("disApp");
  }
}
/*
* Code to add the canvas with the empty cart message
* when all items are removed from the cart
* */
function addMainBodyBuffer(){
  main_body.classList.add("image_here");
  main_body_h1.classList.remove("disApp");
  main_body.classList.remove("container-main");
}

// Array keeping track of items added to the cart,
// each index is associated with a separate item in the cart
// once an item is added to the cart, it cannot be added again
// the purpose of this array is to recreate the empty canvas
// with the empty cart message when all items are removed from the cart
let itemsAdded = [0,0,0,0,0,0,0,0,0,0];

// variable keeping track of total cost
let price = 0.00;

// function to display the card associated with Ram
function addRam(){
  removeMainBodyBuffer();
  if(itemsAdded[0]===0)itemsAdded[0]++;
  document.getElementById("ramBOX").classList.remove('disApp');
}
// function to remove the card associated with Ram and to remove Ram from the cart
function removeRam(){
  itemsAdded[0]--;
  if(inCartBool[0]){
    let ramTypeSelect = document.getElementById('RT');
    let ramSpecSelect = document.getElementById('RS');
    price -= RamOBJ[ramTypeSelect.options[ramTypeSelect.selectedIndex].value][ramSpecSelect.options[ramSpecSelect.selectedIndex].value];
    price = parseFloat(price.toFixed(2));
    priceTag.innerHTML=price;
    inCartBool[0]=false;
  }
  let max = 0;
  itemsAdded.forEach((x)=>{
    max=Math.max(max,x);
  });
  if(max===0)addMainBodyBuffer();
  document.getElementById("ramBOX").classList.add('disApp');

}

// Function to display the card associated with Motherboard
function addMB(){
  removeMainBodyBuffer();
  if(itemsAdded[1]===0)itemsAdded[1]++;
  document.getElementById("mbBOX").classList.remove('disApp');
}

// Function to remove the card associated with Motherboard and to remove Motherboard from the cart
function removeMB(){
  itemsAdded[1]--;
  if(inCartBool[1]){
    let TypeSelect = document.getElementById('MT');
    let SpecSelect = document.getElementById('MS');
    price -= mbOBJ[TypeSelect.options[TypeSelect.selectedIndex].value][SpecSelect.options[SpecSelect.selectedIndex].value];
    price = parseFloat(price.toFixed(2));
    priceTag.innerHTML=price;
    inCartBool[1]=false;
  }
  let max = 0;
  itemsAdded.forEach((x)=>{
    max=Math.max(max,x);
  });
  if(max===0)addMainBodyBuffer();
  document.getElementById("mbBOX").classList.add('disApp');
}

// Function to display card associated with Storage
function addStore(){
  removeMainBodyBuffer();
  if(itemsAdded[2]===0)itemsAdded[2]++;
  document.getElementById("storeBOX").classList.remove('disApp');
}

// Function to remove card associated with Storage and to remove Storage from the cart
function removeStore(){
  itemsAdded[2]--;
  if(inCartBool[2]){
    let TypeSelect = document.getElementById('ST');
    let SpecSelect = document.getElementById('SS');
    price -= storeOBJ[TypeSelect.options[TypeSelect.selectedIndex].value][SpecSelect.options[SpecSelect.selectedIndex].value];
    price = parseFloat(price.toFixed(2));
    priceTag.innerHTML=price;
    inCartBool[2]=false;
  }
  let max = 0;
  itemsAdded.forEach((x)=>{
    max=Math.max(max,x);
  });
  if(max===0)addMainBodyBuffer();
  document.getElementById("storeBOX").classList.add('disApp');
}

// Function to display card associated with Processors
function addCompute(){
  removeMainBodyBuffer();
  if(itemsAdded[3]===0)itemsAdded[3]++;
  document.getElementById("computeBOX").classList.remove('disApp');
}

// Function to remove card associated with processors and to remove processors from the cart
function removeCompute(){
  itemsAdded[3]--;
  if(inCartBool[3]){
    let TypeSelect = document.getElementById('IT');
    let SpecSelect = document.getElementById('IS');
    price -= computeOBJ[TypeSelect.options[TypeSelect.selectedIndex].value][SpecSelect.options[SpecSelect.selectedIndex].value];
    price = parseFloat(price.toFixed(2));
    priceTag.innerHTML=price;
    inCartBool[3]=false;
  }
  let max = 0;
  itemsAdded.forEach((x)=>{
    max=Math.max(max,x);
  });
  if(max===0)addMainBodyBuffer();
  document.getElementById("computeBOX").classList.add('disApp');
}

// Function to display card associated with GPUs
function addGpu(){
  removeMainBodyBuffer();
  if(itemsAdded[4]===0)itemsAdded[4]++;
  document.getElementById("gpuBOX").classList.remove('disApp');
}

// Function to remove card associated with GPUs and to remove GPU from the cart
function removeGPU(){
  itemsAdded[4]--;
  if(inCartBool[4]){
    let SpecSelect = document.getElementById('GPUS');
    price -= gpuOBJ[SpecSelect.options[SpecSelect.selectedIndex].value];
    price = parseFloat(price.toFixed(2));
    priceTag.innerHTML=price;
    inCartBool[4]=false;
  }
  let max = 0;
  itemsAdded.forEach((x)=>{
    max=Math.max(max,x);
  });
  if(max===0)addMainBodyBuffer();
  document.getElementById("gpuBOX").classList.add('disApp');
}

// Function add card associated with Power Supply
function addPow(){
  removeMainBodyBuffer();
  if(itemsAdded[5]===0)itemsAdded[5]++;
  document.getElementById("powBOX").classList.remove('disApp');
}

// Function to remove card associated with Power Supply and to remove Power Supply from the cart
function removePow(){
  itemsAdded[5]--;
  if(inCartBool[5]){
    let SpecSelect = document.getElementById('powS');
    price -= powOBJ[SpecSelect.options[SpecSelect.selectedIndex].value];
    price = parseFloat(price.toFixed(2));
    priceTag.innerHTML=price;
    inCartBool[5]=false;
  }
  let max = 0;
  itemsAdded.forEach((x)=>{
    max=Math.max(max,x);
  });
  if(max===0)addMainBodyBuffer();
  document.getElementById("powBOX").classList.add('disApp');
}

// Function to add card associated with Cables
function addCB(){
  removeMainBodyBuffer();
  if(itemsAdded[6]===0)itemsAdded[6]++;
  document.getElementById("cbBOX").classList.remove('disApp');
}

// Function to remove card associated with Cables and to remove Cables from the cart
function removeCB(){
  itemsAdded[6]--;
  if(inCartBool[6]){
    let TypeSelect = document.getElementById('CBT');
    let SpecSelect = document.getElementById('CBS');
    price -= cbOBJ[TypeSelect.options[TypeSelect.selectedIndex].value][SpecSelect.options[SpecSelect.selectedIndex].value];
    price = parseFloat(price.toFixed(2));
    priceTag.innerHTML=price;
    inCartBool[6]=false;
  }

  let max = 0;
  itemsAdded.forEach((x)=>{
    max=Math.max(max,x);
  });
  if(max===0)addMainBodyBuffer();
  document.getElementById("cbBOX").classList.add('disApp');
}

// Function to add card associated with Computer Frame
function addFrame(){
  removeMainBodyBuffer();
  if(itemsAdded[7]===0)itemsAdded[7]++;
  document.getElementById("frameBOX").classList.remove('disApp');
}

// Function to remove card associated with Computer Frame and to remove Computer Frame from the cart
function removeFrame(){
  itemsAdded[7]--;
  if(inCartBool[7]){
    let SpecSelect = document.getElementById('FS');
    price -= caseOBJ[SpecSelect.options[SpecSelect.selectedIndex].value];
    price = parseFloat(price.toFixed(2));
    priceTag.innerHTML=price;
    inCartBool[7]=false;
  }
  let max = 0;
  itemsAdded.forEach((x)=>{
    max=Math.max(max,x);
  });
  if(max===0)addMainBodyBuffer();
  document.getElementById("frameBOX").classList.add('disApp');
}

// Function to add card associated with Monitor
function addMon(){
  removeMainBodyBuffer();
  if(itemsAdded[8]===0)itemsAdded[8]++;
  document.getElementById("monBOX").classList.remove('disApp');
}

// Function to remove card associated with Monitor and to remove Monitor from the cart
function removeMon(){
  itemsAdded[8]--;
  if(inCartBool[8]){
    let TypeSelect = document.getElementById('MonT');
    let SpecSelect = document.getElementById('MonS');
    price -= monOBJ[TypeSelect.options[TypeSelect.selectedIndex].value][SpecSelect.options[SpecSelect.selectedIndex].value];
    price = parseFloat(price.toFixed(2));
    priceTag.innerHTML=price;
    inCartBool[8]=false;
  }
  let max = 0;
  itemsAdded.forEach((x)=>{
    max=Math.max(max,x);
  });
  if(max===0)addMainBodyBuffer();
  document.getElementById("monBOX").classList.add('disApp');
}

// Function to add card associated with Peripherals such as Keyboard and Mouse
function addPeri(){
  removeMainBodyBuffer();
  if(itemsAdded[9]===0)itemsAdded[9]++;
  document.getElementById("periBOX").classList.remove('disApp');
}

// Function to remove card associated with Peripherals and to remove peripherals from the cart
function removePeri(){
  itemsAdded[9]--;
  if(inCartBool[9]){
    let TypeSelect = document.getElementById('PeriK');
    let SpecSelect = document.getElementById('PeriM');
    price -= periOBJ[TypeSelect.options[TypeSelect.selectedIndex].value];
    price-=periOBJ[SpecSelect.options[SpecSelect.selectedIndex].value];
    price = parseFloat(price.toFixed(2));
    priceTag.innerHTML=price;
    inCartBool[9]=false;
  }
  let max = 0;
  itemsAdded.forEach((x)=>{
    max=Math.max(max,x);
  });
  if(max===0)addMainBodyBuffer();
  document.getElementById("periBOX").classList.add('disApp');
}

// Object mapping Ram to price based on different types and specifications
const RamOBJ={
  "DDR3":{
    "4GB":2.3,
    "8GB":4.1,
    "16GB":6.8,
    "32GB":8.3,
    "64GB":10,
  },
  "DDR4":{
    "4GB":4.23,
    "8GB":8.90,
    "16GB":10.3,
    "32GB":12.45,
    "64GB":13.50,
  },
  "DDR5":{
    "4GB":9.23,
    "8GB":12.90,
    "16GB":15.3,
    "32GB":18.45,
    "64GB":20.50,
  }
};

// Object mapping Motherboard to prices based on different types and specifications
const mbOBJ = {
  "Mirco_ATX":{
    "B450_S2H":20.0,
    "H610M-E_DDR4":10.23,
    "B450M_Pro-Vdh":14.11,
    "B450M-A_II":10.11,
    "A320M-K":7.45
  },
  "Mini_stx":{
    "B450_S2H":12.34,
    "H610M-E_DDR4":23.9,
    "B450M_Pro-Vdh":25.89,
    "B450M-A_II":15.88,
    "A320M-K":11.56
  },
  "Extended_ATX":{
    "B450_S2H":123.89,
    "H610M-E_DDR4":100.8,
    "B450M_Pro-Vdh":67.90,
    "B450M-A_II":80.88,
    "A320M-K":89.90
  }
};

// Object mapping Storage options to Price based on different types and specifications
const storeOBJ={
  "NVME":{
    "256GB":12.89,
    "512GB":15.78,
    "1TB":19.90,
    "2TB":20.11,
    "5TB":21.90
  },
  "SSD":{
    "256GB":10.111,
    "512GB":12.23,
    "1TB":15,
    "2TB":18,
    "5TB":20
  },
  "HDD":{
    "256GB":3,
    "512GB":4.8,
    "1TB":7.3,
    "2TB":10.11,
    "5TB":15.23
  }
}

// Object mapping Processors to Price based on different types and specifications
const computeOBJ = {
  "ARM": {
    "i3_1300K": 1.23,
    "i9_1300K": 2.34,
    "i9_1400K": 3.45,
    "Ryzen_3600": 4.56,
    "i3_1400K": 5.67,
  },
  "x86-32": {
    "i3_1300K": 6.78,
    "i9_1300K": 7.89,
    "i9_1400K": 8.90,
    "Ryzen_3600": 9.01,
    "i3_1400K": 0.12,
  },
  "x86-64": {
    "i3_1300K": 1.23,
    "i9_1300K": 2.34,
    "i9_1400K": 3.45,
    "Ryzen_3600": 4.56,
    "i3_1400K": 5.67,
  }
}

// Object mapping GPU to Price
const gpuOBJ={
  "H100":5000.0,
  "4090":788.0,
  "4090Super":900.12,
  "Radeon":500.0,
  "3070":600.89
};

// Object mapping power supply to price
const powOBJ={
  "450-Watt":200.89,
  "500-Watt":230.78,
  "750-Watt":150,
  "850-Watt":300.21,
  "1000-Watt":250.71
};

// Object mapping cables to price based on different types and specification
const cbOBJ = {
  "VGA": {
    "2.0": 1.23,
    "3.0": 2.34,
    "4.0": 3.45,
    "10m": 4.56,
    "20m": 5.67
  },
  "DP": {
    "2.0": 6.78,
    "3.0": 7.89,
    "4.0": 8.90,
    "10m": 9.01,
    "20m": 0.12
  },
  "HDMI": {
    "2.0": 1.23,
    "3.0": 2.34,
    "4.0": 3.45,
    "10m": 4.56,
    "20m": 5.67
  },
  "ATX": {
    "2.0": 6.78,
    "3.0": 7.89,
    "4.0": 8.90,
    "10m": 9.01,
    "20m": 0.12
  },
  "Ethernet": {
    "2.0": 1.23,
    "3.0": 2.34,
    "4.0": 3.45,
    "10m": 4.56,
    "20m": 5.67
  },
  "Power": {
    "2.0": 6.78,
    "3.0": 7.89,
    "4.0": 8.90,
    "10m": 9.01,
    "20m": 0.12
  }
};

// Object mapping CPU Frame to Price
const caseOBJ={
  "MidTower":23.56,
  "SlimDesk":30.90,
  "MiniPC":50.89,
  "NUX":240.45,
  "MiniTower":120.11
}

// Object mapping monitors to price based on different types and specifications
const monOBJ={
  "HRR":{
    "18i":120.89,
    "22i":140.23,
    "28i":190.23,
    "UW":220.88
  },
  "OLED":{
    "18i":400.89,
    "22i":450.11,
    "28i":480.22,
    "UW":550.99
  },
  "MChrome":{
    "18i":110.1,
    "22i":120.99,
    "28i":190.01,
    "UW":1000.89
  }
}
// Object mapping keyboard and mouse to price
const periOBJ={
  "ME":12.3,
  "SM":56.2,
  "GK":45.2,
  "GM":120.2,
  "LW":22.56,
  "Ergo":50.89,
  "LHS":34.45
}

// Selector for HTML element displaying the price
const priceTag = document.getElementById('price');

// Selectors for HTML elements associated with different computer components
const ramBoxHandler = document.getElementById('ramBOX');
const mbBoxHandler = document.getElementById('mbBOX');
const storeBoxHandler = document.getElementById('storeBOX');
const computeBoxHandler = document.getElementById('computeBOX');
const gpuBoxHandler = document.getElementById('gpuBOX');
const powBoxHandler = document.getElementById('powBOX');
const cbBoxHandler = document.getElementById('cbBOX');
const frameBoxHandler = document.getElementById('frameBOX');
const monBoxHandler = document.getElementById('monBOX');
const periBoxHandler = document.getElementById('periBOX');

// array keeping track of whether certain computer component has been added to the cart or not
let inCartBool = [false,false,false,false,false,false,false,false,false,false];

// Function to add ram of certain type and specification to the cart
function addRamToCart(){
  if(!ramBoxHandler.classList.contains('disApp') && !inCartBool[0]){
    inCartBool[0]=true;
    let TypeSelect = document.getElementById('RT');
    let SpecSelect = document.getElementById('RS');
    price += RamOBJ[TypeSelect.options[TypeSelect.selectedIndex].value][SpecSelect.options[SpecSelect.selectedIndex].value];
    price = parseFloat(price.toFixed(2));
    priceTag.innerHTML=price;
  }
}

// Function to add Motherboard of certain type and specification to the cart
function addMBToCart(){
  if(!mbBoxHandler.classList.contains('disApp') && !inCartBool[1]){
    inCartBool[1]=true;
    let TypeSelect = document.getElementById('MT');
    let SpecSelect = document.getElementById('MS');
    price += mbOBJ[TypeSelect.options[TypeSelect.selectedIndex].value][SpecSelect.options[SpecSelect.selectedIndex].value];
    price = parseFloat(price.toFixed(2));
    priceTag.innerHTML=price;
  }
}
// Function to add Primary Storage of certain type and specification to the cart
function addStoreToCart(){
  if(!storeBoxHandler.classList.contains('disApp') && !inCartBool[2]){
    inCartBool[2]=true;
    let TypeSelect = document.getElementById('ST');
    let SpecSelect = document.getElementById('SS');
    price += storeOBJ[TypeSelect.options[TypeSelect.selectedIndex].value][SpecSelect.options[SpecSelect.selectedIndex].value];
    price = parseFloat(price.toFixed(2));
    priceTag.innerHTML=price;
  }
}
// Function to add Processor of certain type and specification to the cart
function addComputeToCart(){
  if(!computeBoxHandler.classList.contains('disApp') && !inCartBool[3]){
    inCartBool[3]=true;
    let TypeSelect = document.getElementById('IT');
    let SpecSelect = document.getElementById('IS');
    price += computeOBJ[TypeSelect.options[TypeSelect.selectedIndex].value][SpecSelect.options[SpecSelect.selectedIndex].value];
    price = parseFloat(price.toFixed(2));
    priceTag.innerHTML=price;
  }
}
// Function to add GPU of certain type and specification to the cart
function addGpuToCart(){
  if(!gpuBoxHandler.classList.contains('disApp') && !inCartBool[4]){
    inCartBool[4]=true;
    let SpecSelect = document.getElementById('GPUS');
    price += gpuOBJ[SpecSelect.options[SpecSelect.selectedIndex].value];
    price = parseFloat(price.toFixed(2));
    priceTag.innerHTML=price;
  }
}
// Function to add Power Supply of certain type and specification to the cart
function addPowToCart(){
  if(!powBoxHandler.classList.contains('disApp') && !inCartBool[5]){
    inCartBool[5]=true;
    let SpecSelect = document.getElementById('powS');
    price += powOBJ[SpecSelect.options[SpecSelect.selectedIndex].value];
    price = parseFloat(price.toFixed(2));
    priceTag.innerHTML=price;
  }
}
// Function to add Cables of certain type and specification to the cart
function addCbToCart(){
  if(!cbBoxHandler.classList.contains('disApp') && !inCartBool[6]){
    inCartBool[6]=true;
    let TypeSelect = document.getElementById('CBT');
    let SpecSelect = document.getElementById('CBS');
    price += cbOBJ[TypeSelect.options[TypeSelect.selectedIndex].value][SpecSelect.options[SpecSelect.selectedIndex].value];
    price = parseFloat(price.toFixed(2));
    priceTag.innerHTML=price;
  }
}
// Function to add Computer Frame of certain type and specification to the cart
function addFrameToCart(){
  if(!frameBoxHandler.classList.contains('disApp') && !inCartBool[7]){
    inCartBool[7]=true;
    let SpecSelect = document.getElementById('FS');
    price += caseOBJ[SpecSelect.options[SpecSelect.selectedIndex].value];
    price = parseFloat(price.toFixed(2));
    priceTag.innerHTML=price;
  }
}
// Function to add Monitor of certain type and specification to the cart
function addMonToCart(){
  if(!monBoxHandler.classList.contains('disApp') && !inCartBool[8]){
    inCartBool[8]=true;
    let TypeSelect = document.getElementById('MonT');
    let SpecSelect = document.getElementById('MonS');
    price += monOBJ[TypeSelect.options[TypeSelect.selectedIndex].value][SpecSelect.options[SpecSelect.selectedIndex].value];
    price = parseFloat(price.toFixed(2));
    priceTag.innerHTML=price;
  }
}
// Function to add Peripherals to the cart
function addPeriToCart(){
  if(!periBoxHandler.classList.contains('disApp') && !inCartBool[9]){
    inCartBool[9]=true;
    let TypeSelect = document.getElementById('PeriK');
    let SpecSelect = document.getElementById('PeriM');
    price += periOBJ[TypeSelect.options[TypeSelect.selectedIndex].value];
    price+= periOBJ[SpecSelect.options[SpecSelect.selectedIndex].value];
    price = parseFloat(price.toFixed(2));
    priceTag.innerHTML=price;
  }
}
// flag associated with the Checkout popup
let orderPlacementInProgress = false;

// function to open the Checkout popup
function finalCall(){
  if(price===0){
    document.getElementById("emptyCart").classList.add("openFinalShow");
  }else{
    orderPlacementInProgress=true;
    closePop1();
    closePop2_2();
    closePop3();
    let getElement = document.getElementById("placeOrder");
    let priceTag = document.getElementById("priceAddHere");
    priceTag.innerHTML=price;
    getElement.classList.add("openPopN");
  }
}

// Function called when user presses the 'Place Order!' button in the Checkout popup!
function placeOrder(){
  let add = document.getElementById("address");
  let phn = document.getElementById("phnNum");
  if(add.value!=="" && phn.value!=="" ){
    document.getElementById('warningForOrder').classList.remove("warn-add");
    document.getElementById("placeOrder").classList.remove("openPopN");
    document.getElementById("lastOne").classList.add("openFinalShow");
    removeRam();
    removeMB();
    removeStore()
    removeCompute();
    removeGPU();
    removePow();
    removeCB()
    removeFrame();
    removeMon();
    removePeri();
    orderPlacementInProgress=false;
  }else{
    document.getElementById('warningForOrder').classList.add("warn-add");
  }
}

// Function called when user presses the cancel button in the checkout popup
function abortOrder(){
  document.getElementById('warningForOrder').classList.remove("warn-add");
  document.getElementById("placeOrder").classList.remove("openPopN");
  orderPlacementInProgress=false;
}

// callback function responsible for automatically closing the `Order Placed!`
// and `Cart is Empty!` popups.
setInterval(()=>{
  let element = document.getElementById("lastOne");
  let element2 =  document.getElementById("emptyCart");
  element.classList.remove("openFinalShow");
  element2.classList.remove("openFinalShow");
},10000)

