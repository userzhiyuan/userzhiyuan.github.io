---
title: python netmiko
author: banny
date: 2015-08-09 20:55:00 +0800
categories: [Blogging, Tutorial]
tags: [python]
pin: true
---

### python netmiko 

```python
# -*- coding: UTF-8 -*-
import time
from netmiko import ConnectHandler

cisco = {
    'device_type': 'cisco_ios',
    'host':   '10.10.10.10',
    'username': 'cisco',
    'password': 'cisco.abc.123',
    'port' : 22,          # optional, defaults to 22
    'secret': 'cisco.abc.123',     # optional, defaults to ''
}

backupdate = time.strftime("%Y-%m-%d_%H%M%S", time.localtime())
command = "copy running-config tftp://tftp_server/ip_running-config_%s" % backupdate

net_connect = ConnectHandler(**cisco)
net_connect.enable()

output = net_connect.send_command(
    command_string=command,
    expect_string="Address or name of remote host",
    strip_prompt=False,
    strip_command=False
)
output += net_connect.send_command(
    command_string="\n",
    expect_string="Destination filename",
    strip_prompt=False,
    strip_command=False
)

net_connect.disconnect()

print(output)
```
