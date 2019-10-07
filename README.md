# create-lower-thirds-with-AE

brief outline:

1. create templates in After Effects 
1b. in this case 3 templates for lower thirds with 1, 2 or 3 lines

2. write or generate csv file with the data for the lower thirds
2b. e.g. 
	Switching off your device,
	Removing the back cover screws,(pentalobe screws) <- generates lower third with 2 lines
	Removing the display,
Disconnecting the display connectors,
3. generate csv file with the timings for the lower thirds
3b. e.g. in Premiere Pro with chapter marker, should look like this:
	Marker Name	Description	In	Out	Duration	Marker Type	
	01		00:00:35:16	00:00:35:16	00:00:00:00	Chapter
4. start the script in After Effects
5. create folder and composition with "Create Folder"
6. create the timing for the lower thirds by importing a csv with "Import marker"
7. create the compositions with the lower thirds with "Create lower thirds"
8. place the lower thirds in the main composition with "(Re-)Place lower thirds"
9. use the main composition in AE or Premiere 