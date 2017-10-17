if (document.body) 	
{    console.log("~~~~!!!CONTENT SCRIPT LOADED")
	// attach a click listener to each receipt image link on the page.
    /* var links = document.querySelectorAll('[data-ng-click="scope.openrecentReceiptImage(row)"]');
    for(var i=links.length-1; i>=0; i--) {
        links[i].addEventListener('click', function() {
            setTimeout(function() { var receipt = extractReceipt(); }, 2000);
            console.log(receipt);
        });
    } 
	var bodyText = document.body.innerHTML;
	//console.log(bodyText);
	*/
	//The element Getter
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        let receipt = extractReceipt();
        sendResponse({name:"gotElement", ele: receipt.innerHTML})
    });
	//End of the element getter
    

    function extractReceipt() {
        let receipt = document.querySelector("#toPrint");
        console.log(receipt);
        return receipt
        /*if(!receipt) {
            return extractReceipt();
        } else {
            console.log(receipt);
            return receipt;
        }*/
    }
}