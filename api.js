var express = require('express');
var app = express();
var port = 5000;
const os = require("os")
const si = require('systeminformation');
var osUtil = require('node-os-utils');

app.get('/api/system-info', async function (req, res) {
    var responseBody = await buildResponse();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(responseBody));
    res.end();
 })
 
app.listen(port, () => {
    console.log(`Success! Your application is running on port ${port}.`);
});

async function buildResponse(){
    var cpuInfo = await getCPUInfo();
    var cpuTemp = await getCPUTemp();
    var memInfo = await getMemory();
    var diskInfo = await getDisk();
    var osInfo = await getOSInfo();
    var memUsage = await getMemUsage();
    var cpuUse = await cpuUsage()
    var computerName = await getHostname()

    return {
        "cpu_info": cpuInfo,
        "cpu_temp": cpuTemp,
        "mem": memInfo,
        "disk": diskInfo,
        "osInfo": osInfo,
        "mem_usage": memUsage,
        "cpu_use": cpuUse,
        "hostname": computerName
    };
}

async function getCPUInfo(){
    var cpuResp = await si.cpu();
    return cpuResp
}

async function getCPUTemp(){
    var cpuResp = await si.cpuTemperature();
    console.log(cpuResp)
    return cpuResp
}

async function getMemory(){
    var memResp = await si.memLayout();
    console.log(memResp)
    return memResp
}

async function getDisk(){
    var diskResp = await si.diskLayout();
    console.log(diskResp)
    return diskResp
}

async function getOSInfo(){

    var total_mem_kb = os.totalmem()/1024;
    var total_mem_mb = total_mem_kb/1024;
    var total_mem_gb = total_mem_mb/1024;

    var free_mem_kb = os.freemem()/1024;
    var free_mem_mb = free_mem_kb/1024;
    var free_mem_gb = free_mem_mb/1024;

    var diskResp = {
        "cpus": os.cpus(),
        "total_mem_kb": Math.floor(total_mem_kb),
        "total_mem_mb": Math.floor(total_mem_mb),
        "total_mem_gb": Math.floor(total_mem_gb),
        "free_mem_kb": Math.floor(free_mem_kb),
        "free_mem_mb": Math.floor(free_mem_mb),
        "free_mem_gb": Math.floor(free_mem_gb)
    }

    return diskResp
}

async function getMemUsage() {
    //TODO round to 2 digits
    var memPerc = (os.freemem() / os.totalmem()) * 100;
    memPerc = memPerc.toFixed(2)

    return memPerc;
}

async function cpuUsage() {
    var cpu = osUtil.cpu;
    
    return await cpu.usage()
}

async function getHostname(){
    return await os.hostname()
}