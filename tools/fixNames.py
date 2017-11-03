import os
arr = os.listdir()
for i, f in enumerate(arr):
	oldName = f
	f = f.replace("И","ł")
	f = f.replace("й","ę")
	f = f.replace("Ш","ś")
	f = f.replace("Ж","ć")
	f = f.replace("в","ó")
	f = f.replace("╛","ż")
	f = f.replace("е","ą")
	f = f.replace("л","ź")
	f = f.replace("ф","ń")
	f = f.replace("Э","Ł")
	f = f.replace("Ч","Ś")
	f = f.replace("  "," ")
	os.rename(oldName, f)
	print(f)
