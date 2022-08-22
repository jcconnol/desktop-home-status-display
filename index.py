import wmi
myWMI = wmi.WMI (privileges=["RemoteShutdown"])

for processer in myWMI.Win32_Processor ():
    print ("Current Clock Speed : %s" % (processer.CurrentClockSpeed))
    print ("Name : %s" % (processer.Name))
    print ("Cores : %s" % (processer.NumberOfCores))
    
wql = "Select * From Win32_Processor"
for item in myWMI.query(wql):
    print (item)
    
wql = "Select * From Win32_Process"
process_count = 0
for item in myWMI.query(wql):
    # print (item)
    process_count = process_count + 1
print(process_count)
    
wql = "Select * From Win32_Service"
service_count = 0
for item in myWMI.query(wql):
    # print (item)
    service_count = service_count + 1

print(service_count)

    
wql = "Select * From Win32_LogicalDisk"
for item in myWMI.query(wql):
    print (item)
    if item.FreeSpace and item.Size:
        print (item.Caption, "%0.2f%% free disk space" % (100.0 * float(item.FreeSpace) / float(item.Size)))

#will reboot machine
if False:
    # other_machine = "machine name of your choice"
    os = myWMI.Win32_OperatingSystem(Primary=1)[0]
    os.Reboot ()
    
for os in myWMI.Win32_OperatingSystem():
  print(os)