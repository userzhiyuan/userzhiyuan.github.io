---
title: Google Authenticator python
author: banny
date: 2007-08-28 11:28:00 +0800
categories: [Blogging, Tutorial]
tags: [python]
pin: true
---

### Google Authenticator python 实现
```python
# -*- coding: UTF-8 -*-
import pyotp
import time
import sys

#num = sys.argv[1]
num = "O3GW4O2WDMKQE76LPP3K3YBHMRKVB47HBHAUT6T2YLALMUZ5YUOQGCSAM6DZ5JJN"
totp = pyotp.TOTP(num)

if __name__=='__main__':
    while True:
        print(totp.now())
        time.sleep(5)
```

