---
title: python random password
author: banny
date: 2018-07-22 08:58:00 +0800
categories: [Blogging, Tutorial]
tags: [python]
pin: true
---

### python random password

```python
# -*- coding: UTF-8 -*-
import string,sys
from random import choice

salt = '!@#$%^&*()><?'
def generate_activation_code(len=10, chars=string.ascii_letters+string.digits):
    return ''.join([choice(chars) for i in range(len)])
def generate_activation_code_plus(len=10, chars=string.ascii_letters+string.digits+salt):
    return ''.join([choice(chars) for i in range(len)])

if __name__ == '__main__':
    if len(sys.argv) < 4:
        print("""
        Usage:
            Normal: randompass 16 8 0
            Complex:    randompass 16 8 1
            FileName:   randompass
            Password Length:    16
            Password Number:    8
            Complex        :    0/1
            """)
    else:
        passwordlen = sys.argv[1]
        passwordnum = sys.argv[2]
        passwordplus = sys.argv[3]

        if int(passwordplus) == 0:
            for i in range(int(passwordnum)):
                print(generate_activation_code(int(passwordlen)))
        else:
            for i in range(int(passwordnum)):
                print(generate_activation_code_plus(int(passwordlen)))
```
