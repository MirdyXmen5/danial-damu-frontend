У меня ошибка с при загрузке изображении через админскуйю панель. После того как я выбрал картинку и нажал "загрузить" выходит ошибка "Учетные данные не были предоставлены." 
Вот, что показывывает devtools console:
:8082/api/images/:1  Failed to load resource: the server responded with a status of 413 (Request Entity Too Large)
index-CqAZ5Vxl.js:180 AxiosError: Request failed with status code 413
    at E0 (index-CqAZ5Vxl.js:177:1085)
    at XMLHttpRequest.m (index-CqAZ5Vxl.js:177:5922)
    at Ln.request (index-CqAZ5Vxl.js:179:2085)
    at async y (index-CqAZ5Vxl.js:180:18325)
y @ index-CqAZ5Vxl.js:180
:8082/api/images/:1  Failed to load resource: the server responded with a status of 403 (Forbidden)
index-CqAZ5Vxl.js:180 AxiosError: Request failed with status code 403
    at E0 (index-CqAZ5Vxl.js:177:1085)
    at XMLHttpRequest.m (index-CqAZ5Vxl.js:177:5922)
    at Ln.request (index-CqAZ5Vxl.js:179:2085)
    at async y (index-CqAZ5Vxl.js:180:18325)
y @ index-CqAZ5Vxl.js:180
index-CqAZ5Vxl.js:177  POST http://localhost:8082/api/images/ 403 (Forbidden)
(anonymous) @ index-CqAZ5Vxl.js:177
xhr @ index-CqAZ5Vxl.js:177
Gh @ index-CqAZ5Vxl.js:179
Promise.then
_request @ index-CqAZ5Vxl.js:180
request @ index-CqAZ5Vxl.js:179
(anonymous) @ index-CqAZ5Vxl.js:180
(anonymous) @ index-CqAZ5Vxl.js:175
y @ index-CqAZ5Vxl.js:180
gv @ index-CqAZ5Vxl.js:37
vv @ index-CqAZ5Vxl.js:37
xv @ index-CqAZ5Vxl.js:37
Ef @ index-CqAZ5Vxl.js:37
hm @ index-CqAZ5Vxl.js:37
(anonymous) @ index-CqAZ5Vxl.js:37
qu @ index-CqAZ5Vxl.js:40
Vp @ index-CqAZ5Vxl.js:37
ha @ index-CqAZ5Vxl.js:37
Eu @ index-CqAZ5Vxl.js:37
Mv @ index-CqAZ5Vxl.js:37
index-CqAZ5Vxl.js:180 AxiosError: Request failed with status code 403
    at E0 (index-CqAZ5Vxl.js:177:1085)
    at XMLHttpRequest.m (index-CqAZ5Vxl.js:177:5922)
    at Ln.request (index-CqAZ5Vxl.js:179:2085)
    at async y (index-CqAZ5Vxl.js:180:18325)
y @ index-CqAZ5Vxl.js:180
await in y
gv @ index-CqAZ5Vxl.js:37
vv @ index-CqAZ5Vxl.js:37
xv @ index-CqAZ5Vxl.js:37
Ef @ index-CqAZ5Vxl.js:37
hm @ index-CqAZ5Vxl.js:37
(anonymous) @ index-CqAZ5Vxl.js:37
qu @ index-CqAZ5Vxl.js:40
Vp @ index-CqAZ5Vxl.js:37
ha @ index-CqAZ5Vxl.js:37
Eu @ index-CqAZ5Vxl.js:37
Mv @ index-CqAZ5Vxl.js:37

:8082/api/images/:1  Failed to load resource: the server responded with a status of 413 (Request Entity Too Large)
index-CqAZ5Vxl.js:180 AxiosError: Request failed with status code 413
    at E0 (index-CqAZ5Vxl.js:177:1085)
    at XMLHttpRequest.m (index-CqAZ5Vxl.js:177:5922)
    at Ln.request (index-CqAZ5Vxl.js:179:2085)
    at async y (index-CqAZ5Vxl.js:180:18325)
y @ index-CqAZ5Vxl.js:180
:8082/api/images/:1  Failed to load resource: the server responded with a status of 403 (Forbidden)
index-CqAZ5Vxl.js:180 AxiosError: Request failed with status code 403
    at E0 (index-CqAZ5Vxl.js:177:1085)
    at XMLHttpRequest.m (index-CqAZ5Vxl.js:177:5922)
    at Ln.request (index-CqAZ5Vxl.js:179:2085)
    at async y (index-CqAZ5Vxl.js:180:18325)
y @ index-CqAZ5Vxl.js:180
index-CqAZ5Vxl.js:177  POST http://localhost:8082/api/images/ 403 (Forbidden)
(anonymous) @ index-CqAZ5Vxl.js:177
xhr @ index-CqAZ5Vxl.js:177
Gh @ index-CqAZ5Vxl.js:179
Promise.then
_request @ index-CqAZ5Vxl.js:180
request @ index-CqAZ5Vxl.js:179
(anonymous) @ index-CqAZ5Vxl.js:180
(anonymous) @ index-CqAZ5Vxl.js:175
y @ index-CqAZ5Vxl.js:180
gv @ index-CqAZ5Vxl.js:37
vv @ index-CqAZ5Vxl.js:37
xv @ index-CqAZ5Vxl.js:37
Ef @ index-CqAZ5Vxl.js:37
hm @ index-CqAZ5Vxl.js:37
(anonymous) @ index-CqAZ5Vxl.js:37
qu @ index-CqAZ5Vxl.js:40
Vp @ index-CqAZ5Vxl.js:37
ha @ index-CqAZ5Vxl.js:37
Eu @ index-CqAZ5Vxl.js:37
Mv @ index-CqAZ5Vxl.js:37
index-CqAZ5Vxl.js:180 AxiosError: Request failed with status code 403
    at E0 (index-CqAZ5Vxl.js:177:1085)
    at XMLHttpRequest.m (index-CqAZ5Vxl.js:177:5922)
    at Ln.request (index-CqAZ5Vxl.js:179:2085)
    at async y (index-CqAZ5Vxl.js:180:18325)
y @ index-CqAZ5Vxl.js:180
await in y
gv @ index-CqAZ5Vxl.js:37
vv @ index-CqAZ5Vxl.js:37
xv @ index-CqAZ5Vxl.js:37
Ef @ index-CqAZ5Vxl.js:37
hm @ index-CqAZ5Vxl.js:37
(anonymous) @ index-CqAZ5Vxl.js:37
qu @ index-CqAZ5Vxl.js:40
Vp @ index-CqAZ5Vxl.js:37
ha @ index-CqAZ5Vxl.js:37
Eu @ index-CqAZ5Vxl.js:37
Mv @ index-CqAZ5Vxl.js:37


Это данные network после нажатия "загрузить" картинку.
POST /api/images/ HTTP/1.1
Accept: application/json, text/plain, */*
Accept-Encoding: gzip, deflate, br, zstd
Accept-Language: en-US,en;q=0.9,ru;q=0.8
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzc3MTI4MzM2LCJpYXQiOjE3NzcxMjgwMzYsImp0aSI6IjM0NTZjMjNjMDU0MTRhNjU5ZWRjNWMyYWE0ZDQzODAyIiwidXNlcl9pZCI6MX0.VekQVFa2bcxeXg7QF3-3VdKYpnF6mqTvrC_BImZaYfY
Connection: keep-alive
Content-Length: 1027322
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryZsSZlRzlIrDQS9nZ
Host: localhost:8082
Origin: http://localhost:8082
Referer: http://localhost:8082/panel/images
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-origin
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36
sec-ch-ua: "Google Chrome";v="147", "Not.A/Brand";v="8", "Chromium";v="147"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "Linux"

HTTP/1.1 403 Forbidden
Server: nginx/1.25.4
Date: Sat, 25 Apr 2026 14:42:16 GMT
Content-Type: application/json
Content-Length: 82
Connection: keep-alive
Vary: Accept, Cookie, origin
Allow: GET, POST, HEAD, OPTIONS
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: same-origin
Cross-Origin-Opener-Policy: same-origin

Что это означает? и как это решить?