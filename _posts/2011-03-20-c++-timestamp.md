---
title: c++ timestamp
author: banny
date: 2011-03-20 10:28:00 +0800
categories: [Blogging, Tutorial]
tags: [c++]
pin: true
---

### c++ timestamp
```c++
[root@localhost ~]# cat c/whi.c 
#include <iostream>
#include <ctime>
#include <sys/wait.h>
#include <cstdlib>
using namespace std;

string  Get_Current_Date();

int main ()
{
	int a = 10;
	
	while( a < 20 )
	{
	  cout << Get_Current_Date().c_str() << endl;
	  cout << "a=" << a << endl;
	  a++;
	  system("date");
	  usleep(100000);//微秒 500000为500毫秒
	  // sleep(1) 秒
	  cout << "rand:" << rand() << endl; //rand()生成随机数
	}

return 0;
}

string  Get_Current_Date()
{
    time_t nowtime;  
    nowtime = time(NULL); //获取日历时间   
    char tmp[64];   
    strftime(tmp,sizeof(tmp),"%Y-%m-%d %H:%M:%S",localtime(&nowtime));   
    return tmp;
}

```


