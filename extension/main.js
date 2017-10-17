// global variable: the app ID of the application. This is needed to send a targetted external message
var app_ID = "mkkkhkamidcjgkephchihlekndnjnpml";

// Called when the user clicks on the browser action. tab is the currently active tab
chrome.browserAction.onClicked.addListener(function(tab) {
    
    chrome.tabs.sendMessage(tab.id, {name: "getReceipt"}, function(response) {
        let fileName = Get_File_Name_To_Save_As(response.ele);
        chrome.runtime.sendMessage(app_ID, {fileName: fileName, content: response.ele});
    });
});

function Save_Receipt(worker) {
	//Adk the conscript for the page body.
    worker.port.emit("getElements", tag);
	worker.port.on("gotElement", function(elementContent) {
	}); 	
}


function Get_File_Name_To_Save_As(Page_Body)
{
	//					 store#; register#;  trans. ID;  Sales Date
	//Find a text that matches this pattern: 3815  00058  27662    04/02/14  09:04
	var Four_Digit_Number = /\d{4}/;
	var Five_Digit_Number = /\d{5}/;
	var Two_Spaces = /\s{2}/;
	var String_Start;
	var Search_String; 
	var Receipt_String
	var Store_Number;
	var Register_Number;
	var Transaction_ID;
	var Sales_Date;
	var File_Name;
	Search_String = new RegExp(Four_Digit_Number.source + Two_Spaces.source + Five_Digit_Number.source + Two_Spaces.source + Five_Digit_Number.source );
	String_Start = Page_Body.search(Search_String);
	Receipt_String = Page_Body.substring(String_Start, String_Start + 30);
	Store_Number = Receipt_String.substring(0,0+4);
	Register_Number = Receipt_String.substring(6,6+5);
	//Transaction_ID Should be a 4 digit number, the receipt shows 5 digits, but the website only uses the first 4 as the transaction id.
	Transaction_ID = Receipt_String.substring(13,13+4);
	Sales_Date = Receipt_String.substring(22,22+8);
	//The sales date is reconfigured to be Year/Month/Day...but not using any delimeters
	Sales_Date = Sales_Date.substring(6,6+2) + Sales_Date.substring(0,0+2) + Sales_Date.substring(3,3+2);

	File_Name = Sales_Date + Store_Number + Register_Number + Transaction_ID + ".html";

	console.log("The Receipt String is: ");
	console.log(Receipt_String);
	console.log(Store_Number);
	console.log(Register_Number);
	console.log(Transaction_ID);
	console.log(Sales_Date);
	console.log(File_Name);

	return File_Name;
}



/*
function Remove_Extra_Data_From_File(Original_File_Text)
{
	var String_Start;
	var Search_String; 
	var New_File_Text;

//	Search_String = "</script><div class="margin-bottom-1"><button class="btn btn-primary" onclick="PrintReceipt()">Print Receipt</button></div><div id="toPrint" class="overflow-auto">;
//	Search_String = "</script><div class=\"margin-bottom-1\"><button class=\"btn btn-primary\" onclick=\"PrintReceipt()\">Print Receipt</button></div><div id=\"toPrint\" class=\"overflow-auto\">";
	//For some reason i can't match the string past ()
	//Old Stuff Search_String = "</script><div class=\"margin-bottom-1\"><button class=\"btn btn-primary\" onclick=\"PrintReceipt()";
	Search_String =	"</script><div class=\"margin-bottom-1 ng-scope\"><button class=\"btn btn-primary ng-isolate-scope\" onclick=\"PrintReceipt()";	
	String_Start = Original_File_Text.search(Search_String);
	console.log(String_Start);	
	console.log(Search_String);	
	New_File_Text = Original_File_Text.substring(String_Start + 198);

	//delete the trailing text after the closing table brackets. ie after:
	//</tbody></table>	
	Search_String ="</tbody></table>"
	String_Start = New_File_Text.search(Search_String);
	return New_File_Text.substring(0, String_Start + 16);	
	//return Original_File_Text;

}
*/