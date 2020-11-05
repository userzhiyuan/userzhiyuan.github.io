---
title: Zabbix alert speak
author: banny
date: 2018-02-18 14:18:00 +0800
categories: [Blogging, Tutorial]
tags: [zabbix]
pin: true
---

### Zabbix alert speak

```python
# -*- coding: UTF-8 -*-
from pyzabbix import ZabbixAPI
import urllib3
import time
import pyttsx3
import os
from googletrans import Translator

urllib3.disable_warnings()
zapi = ZabbixAPI("https://192.168.1.88/zabbix")
#zapi.session.auth("admin", "admin")
zapi.session.verify = False
zapi.timeout = 5.1
zapi.login("admin", "admin")
#print("Connected to Zabbix API Version %s" % zapi.api_version())
prioritytostr = {'0': 'ok', '1': '信息', '2': '警告', '3': '严重', '4': '非常严重', '5': '超级严重'}
def getCurIssue(zapi):
    '''
    获取所有最近有问题的trigger
    返回trigger的信息列表： ['trigger1','trigger2',......]
    '''
    triggers = zapi.trigger.get(
        only_true=1,
        skipDependent=1,
        monitored=1,
        active=1,
        output='extend',
        expandDescription=1,
        selectHosts=['host'],
    )
    print(triggers)
    triggerlist = []
def getHostgroupName(zapi, hostname):
    '''
    通过hostname(即ip)获取host所在的监控组名
    返回由组名组成的字符串
    '''
    groups = zapi.host.get(
        search={"name": hostname},
        selectGroups=['name'],
        output=['groups']
    )[0]['groups']
    groupname = [group['name'] for group in groups]
    return ' '.join(groupname)
# 获取未确认的trigger
def getCurIsnotsue(zapi):
    unack_triggers = zapi.trigger.get(
        only_true=1,
        skipDependent=1,
        monitored=1,
        active=1,
        output='extend',
        expandDescription=1,
        selectHosts=['host'],
        withLastEventUnacknowledged=1,
    )
    #print(unack_triggers)
    triggerlist = []
    for t in unack_triggers:
        if int(t['value']) == 1:
            triggerlist.append("{0} {1} {2} {3}".format(
                time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(float(t['lastchange']))),
                prioritytostr[t['priority']],
                t['hosts'][0]['host'],
                t['description'],
            )
            )
    return (triggerlist[-1])

def ld(spa):
   engine = pyttsx3.init()
   #engine.setProperty('rate', 125)
   engine.say(spa)
   engine.runAndWait()
# translation
def entocn(text):
    translator = Translator(service_urls=['translate.google.cn'])
    dst = translator.translate(text, dest='zh-CN')
    return (dst.text)

tmpfile = "tmp.txt"
if os.path.exists(tmpfile) is False:
    fo = open(tmpfile, "w")
    fo.write("1234567890")
    fo.close()

if __name__ == "__main__":
    # 打开一个文件
    fo = open(tmpfile, "r+")
    str = fo.read(50)
    fo.close()
    # print(str)
    #getCurIssue(zapi)

    alrlist = getCurIsnotsue(zapi)
    print(alrlist)
    if str in alrlist:
        print('==')
    else:
        print('!=')
        fo = open(tmpfile, "w")
        fo.write(alrlist)
        fo.close()
        rd = open(tmpfile, "r+")
        str = rd.readline()
        newstr = str.replace('_',' ')
        print(newstr)
        #ld(entocn(str))
        ld(newstr)
        rd.close()
```