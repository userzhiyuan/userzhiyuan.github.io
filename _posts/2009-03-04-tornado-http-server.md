---
title: tornado http server
author: banny
date: 2009-03-04 11:28:00 +0800
categories: [Blogging, Tutorial]
tags: [python]
pin: true
---

### tornado http server
```python
# -*- coding: utf-8 -*-
import tornado.httpserver
import tornado.web
import tornado.options
import tornado.ioloop
import tornado.httpclient
import os
from tornado.options import define,options
import time
from tornado.httpclient import AsyncHTTPClient
import tornado.gen
import tornado.netutil
import tornado.process

define('port',default=8000,help='running this port.',type=int)

class index(tornado.web.RequestHandler):

    def get(self):
        ip = self.request.remote_ip
        time.sleep(5)
        #self.render('index.html',ip=ip)
        #client = AsyncHTTPClient()
        self.render('index.html',ip=ip)
    post = get


class menu(tornado.web.RequestHandler):

    def get(self):
        self.render('menu.html')

    post = get

class data(tornado.web.RequestHandler):
    def get(self):
        te = self.get_argument('q')
        self.render('data.html',te=te)
    post = get

if __name__ == '__main__':
    tornado.options.parse_command_line()
    app = tornado.web.Application(handlers=[(r'/',index),(r'/data',data),(r'/menu',menu)],template_path=os.path.join(os.path.dirname(__file__),'templates'))
    #httpserver = tornado.httpserver.HTTPServer(app)
    #httpserver.listen(options.port)
    #tornado.ioloop.IOLoop.instance().start()

    sockets = tornado.netutil.bind_sockets(8000)
    tornado.process.fork_processes(0)
    server = tornado.httpserver.HTTPServer(app)
    server.add_sockets(sockets)
    tornado.ioloop.IOLoop.current().start()
```
