---
layout: compress
# Chirpy v2.2
# https://github.com/
# © 2020 Banny
# MIT Licensed
---

/* Registering Service Worker */
if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('{{ "/sw.js" | relative_url }}');
};