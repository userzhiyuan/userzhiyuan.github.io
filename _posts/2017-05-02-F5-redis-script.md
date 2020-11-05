---
title: F5 redis script
author: banny
date: 2017-05-02 10:55:00 +0800
categories: [Blogging, Tutorial]
tags: [F5]
pin: true
---

### F5 redis script
#### redis-cli,在与f5对应的版本的centos下编译
[root@testonly:Active:Standalone] monitors # cat redis_check
```shell 
#!/bin/sh

#
# (c) Copyright 1996-2006, 2010-2013 F5 Networks, Inc.
#
# This software is confidential and may contain trade secrets that are the
# property of F5 Networks, Inc.  No part of the software may be disclosed
# to other parties without the express written consent of F5 Networks, Inc.
# It is against the law to copy the software.  No part of the software may
# be reproduced, transmitted, or distributed in any form or by any means,
# electronic or mechanical, including photocopying, recording, or information
# storage and retrieval systems, for any purpose without the express written
# permission of F5 Networks, Inc.  Our services are only available for legal
# users of the program, for instance in the event that we extend our services
# by offering the updating of files via the Internet.
#
# @(#) $Id: //depot/maint/bigip14.1.2.3/tm_daemon/monitors/sample_monitor#1 $
#


#
# these arguments supplied automatically for all external pingers:
# $1 = IP (::ffff:nnn.nnn.nnn.nnn notation or hostname)
# $2 = port (decimal, host byte order)
# $3 and higher = additional arguments
# 
# $MONITOR_NAME = name of the monitor
# 
# In this sample script, $3 is the regular expression
#

# Name of the pidfile
pidfile="/var/run/$MONITOR_NAME.$1..$2.pid"

# Send signal to the process group to kill our former self and any children 
# as external monitors are run with SIGHUP blocked
if [ -f $pidfile ]
then
   kill -9 -`cat $pidfile` > /dev/null 2>&1
fi

echo "$$" > $pidfile

# Remove the IPv6/IPv4 compatibility prefix 
node_ip=`echo $1 | sed 's/::ffff://'`
# At F5 Monitors add Variables
node_user=${USER}
node_pass=${PASS}
node_port=${PORT}
show=${SHOW}
#res=${RES}
res="role:master"
# Using the nc utility to get data from the server. 
# Search the data received for the expected expression.
#echo "GET /"|/usr/bin/monitors/redis-cli -c -h $node_ip -p $2 $show 2> /dev/null|grep -E -i "$res" > /dev/null
echo "GET /" | /usr/bin/redis-cli -c -h $node_ip -p $2 info Replication 2> /dev/null | grep -E -i "$res" > /dev/null

status=$?
if [ $status -eq 0 ]
then
# Remove the pidfile before the script echoes anything to stdout and is killed by bigd      
    rm -f $pidfile
    echo "up"
fi

# Remove the pidfile before the script ends
rm -f $pidfile
```
