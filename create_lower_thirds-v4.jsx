var pp = app.project;
myInput();

function myInput() {
	var w = new Window("palette", "Create lower thirds for video guides"); // create UI
	w.orientation = "column";
	var wI = w.add("group");
	w.alignChildren ="left";
	var wB = w.add("group");
	wB.orientation ="row";
	var wC = w.add("group");
	wI.add("statictext", undefined, "Guide:")
	var guide = wI.add("edittext", undefined, "Akku");
	guide.characters = 12;
	var language = wI.add("checkbox", undefined, "EN");
	var createFolderAndCompButton = wB.add("button", undefined, "Create Folder");
	var importMarkerButton = wB.add("button", undefined, "Import Marker");
	var createLowerThirdsButton = wB.add("button", undefined, "Create lower thirds");
	var rePlaceLowerThirdsButton = wB.add("button", undefined, "(Re-)Place lower thirds");
	var cancel = wC.add("button", undefined, "Close");
	createFolderAndCompButton.onClick = function() { // trigger functions for the buttons
		app.beginUndoGroup("create new folder and copy template"); // create script undo group (so you can use cmd+z)
		createFolder(guide.text);
		app.endUndoGroup();
	}
	importMarkerButton.onClick = function(){ 
		app.beginUndoGroup("import and insert marker"); 
		importMarker(guide.text);
		app.endUndoGroup();	
	}
	createLowerThirdsButton.onClick = function() {
		if (language.value == true) {
			var lang = true;
		}
		app.beginUndoGroup("create lower thirds"); 
		createLowerThirds(guide.text, lang);
		app.endUndoGroup();	
	}	
	rePlaceLowerThirdsButton.onClick = function() {
		app.beginUndoGroup("(re)place lower thirds"); 
		rePlaceLowerThirds(guide.text);
		app.endUndoGroup();	
	}	
	cancel.onClick = function() {w.close();} // close button action
	w.show();
}
function rePlaceLowerThirds(g){
	var myComp = findComp("lower_thirds "+ g);
	for (var i = myComp.numLayers; i > 0; i--) { // remove all lower thirds layer
	var myItemName = myComp.layer(i).name.substr(0,g.length);
	if (myItemName == g){
	myItem = myComp.layer(i);
	myItem.remove();
		}
	}

 	var myFolder = findFolder("lower thirds "+g);
 	var lts = myFolder.numItems;
 	var trigger = myComp.layer("trigger");
 	for (i=1; i <= lts; i++) {
 	myComp.layers.add(myFolder.item(i));
 	BauchbindenTitel = myFolder.item(i).name;
	lt_time=trigger.property("Marker").keyTime(i);
	myComp.layer(BauchbindenTitel).startTime = (lt_time);
	}
}
function createFolder(g) { // #works
		var compFolder = pp.items.addFolder("lower thirds "+g);
		var template = findComp("lower_thirds_template");
		var compElement = template.duplicate();
		compElement.name = "lower_thirds "+ g;
		var superParent = findFolder("lower thirds"); 
		compFolder.parentFolder = superParent; // moves new folder in "lower thirds"
		compElement.parentFolder = superParent; // moves comp in "lower thirds"
		compElement.openInViewer(); // open new comp
}

function importMarker(g) {
var myComp = findComp("lower_thirds "+ g);
var keyNumber = myComp.layer("trigger").property("Marker").numKeys; //remove all previous marker
	for (var i = 1; i <= keyNumber; i++) {
	    myComp.layer("trigger").property("Marker").removeKey(1);
		}
	// temporary solution 
	var pfile = File.openDialog("Please select a CSV file");
	var encoded_data = '';	
	if (pfile == null){
		alert("No csv file selected. ");
	}else{ var readData = pfile.open("r","TEXT", "????");
		if(readData){
			var encoded_data = pfile.read();
		}else{
			alert("Problems reading csv file");
		}
	}
	pfile.close();
	var data = parseCSV(encoded_data); 
	// end of temporary solution
	for (var j=1; j<=(data.length -1); j++) {
		if (data[j][5] == "Chapter"){
		t = currentFormatToTime(data[j][2],myComp.frameRate);
		var Marker1Name = new MarkerValue(data[j][0]);
		myComp.layer("trigger").property("Marker").setValueAtTime(t, Marker1Name);
		}
	}
}
// find index of comp and folder by name
function findComp(compName){ 
	for (var i = 1; i <= pp.numItems; i++){
	      if (pp.item(i) instanceof CompItem && pp.item(i).name == compName){
	        return pp.item(i);
	      } } return null; }
 
function findFolder(folderName){
    for (var i = 1; i <= pp.numItems; i++){
      if (pp.item(i) instanceof FolderItem && pp.item(i).name == folderName){
        return pp.item(i);
      } } return null; }

/* function CSVselect() { // obsolete in temporary solution
var pfile = File.openDialog("Please select a CSV file");
	var encoded_data = '';
	
	if (pfile == null){
		alert("No csv file selected. ");
	}else{
	
		var readData = pfile.open("r","TEXT", "????");
		
		
		if(readData){
			var encoded_data = pfile.read();
		}else{
			alert("Problems reading csv file");
		}
	}
	pfile.close();
	}
*/
// CSVtoTextLayers.jsx
function parseCSV(text){  		
		var i, s;
		var table = new Array();
		var a = text.split(/\r*\n/);
		var version = app.version.substring(0,1);
		var pattern;
		if(version >= 8){
			 pattern = new RegExp("(^|\\t|,)(\"*|'*)(.*?)\\2(?=,|\\t|(?<,)$)", "g");
		}else{
			pattern = new RegExp("(^|\\t|,)(\"*|'*)(.*?)\\2(?=,|\\t|$)", "g");
		}		
		for (i=0; i<a.length; i++){
			s = a[i].replace(/""/g, '\"');	 
			s = s.replace(pattern, "$3\t");
			s = s.replace(/\t(?=\t)/g, "\t ");
			s = s.replace(/\t$/, "");
		
			if (s) {
				var element = s.split("\t");
				var count = element.length;
				
				table[i] = new Array(count);
				for (x=0; x < count; x++){
				     if (typeof element[x] != 'undefined'){
						if(version >= 8){
							if(element[x].indexOf(",") == 0) element[x] =  element[x].substring(1, s.length);
						}
						
						table[i][x] = element[x];
					}
				}
			}
		 }
		  return table; 
    }

function createLowerThirds (g,l){
	// temporary solution 
	if (l == true) { var step = "Step "}else {step="Schritt "}
	var pfile = File.openDialog("Please select a CSV file");
	var encoded_data = '';	
	if (pfile == null){
		alert("No csv file selected. ");
	}else{ var readData = pfile.open("r","TEXT", "????");
		if(readData){
			var encoded_data = pfile.read();
		}else{
			alert("Problems reading csv file");
		}
	}
	pfile.close();
	var data = parseCSV(encoded_data);
	// end of temporary solution
	var compFolder = findFolder("lower thirds "+g);

for (j=0; j < data.length; j++){
	if (data[j][1] == " ") {
		if (j<9) {
			var Schrittnummer = "0"+ (j+1); } 
			else {var Schrittnummer = (j+1);}
		var template = findComp("template-1-line");
		var compElement = template.duplicate();
		var compElementName = g + "-step" + (j+1);
		compElement.name = compElementName;
		var myComp = findComp(compElementName);
		myComp.layer("line1").text.sourceText.setValue( data[j][0]);
		myComp.layer("step").text.sourceText.setValue( step + Schrittnummer);
		myComp.parentFolder = compFolder;

	} else {
		if (data[j][2] == " ") {
		if (j<9) {
			var Schrittnummer = "0"+ (j+1); } 
			else {var Schrittnummer = (j+1);}
		var template = findComp("template-2-line");
		var compElement = template.duplicate();
		var compElementName = g + "-step" + (j+1);
		compElement.name = compElementName;
		var myComp = findComp(compElementName);
		myComp.layer("line1").text.sourceText.setValue( data[j][0]);
		myComp.layer("line2").text.sourceText.setValue( data[j][1]);
		myComp.layer("step").text.sourceText.setValue( step+ Schrittnummer);
		myComp.parentFolder = compFolder;

		} else {
			if (j<9) {
			var Schrittnummer = "0"+ (j+1); } 
			else {var Schrittnummer = (j+1);}
		var template = findComp("template-3-line");
		var compElement = template.duplicate();
		var compElementName = g + "-step" + (j+1);
		compElement.name = compElementName;
		var myComp = findComp(compElementName);
		myComp.layer("line1").text.sourceText.setValue( data[j][0]);
		myComp.layer("line2").text.sourceText.setValue( data[j][1]);
		myComp.layer("line3").text.sourceText.setValue( data[j][2]);
		myComp.layer("step").text.sourceText.setValue( step + Schrittnummer);
		myComp.parentFolder = compFolder;
		}
	}
}
	/*var myComp = findComp("lower_thirds "+ g); // replaced by "(Re-)Place ..."
 	var lts = compFolder.numItems;
 	var trigger = myComp.layer("trigger");
 	for (i=1; i <= lts; i++) {
 	myComp.layers.add(compFolder.item(i));
 	BauchbindenTitel = compFolder.item(i).name;
	lt_time=trigger.property("Marker").keyTime(i);
	myComp.layer(BauchbindenTitel).startTime = (lt_time);
	}*/

}
/* 
function placeLTs(g) { // obsolete
	var myComp = findComp("lower_thirds "+ g);
	for (var i=1; i<=data.length; i++) { // place lower thirds layer
	var BauchbindenTitel = g + "-step" + i;
	var Bauchbinde = findComp(BauchbindenTitel);
	myComp.layers.add(Bauchbinde);
	trigger = myComp.layer("trigger");
	lt_time=trigger.property("Marker").keyTime(i);
	myComp.layer(BauchbindenTitel).startTime = (lt_time);
	
}
} */