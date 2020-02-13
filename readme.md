# Express-oauth-server-examples

### Introduction
This page contains example code for the <a href="https://github.com/oauthjs/express-oauth-server">express-oauth-server</a>. I have yet **only implemented** functions and curl-requests for:
- password grants
- client credential grants
- refresh token grants.

You will find the code under ./examples folder. There's currently code for a memory model. I hope you will find it useful to help understand the oauth2 protocol and last but not least, the <a href="https://github.com/oauthjs/express-oauth-server">express-oauth-server</a> wrapper module.

## Table of contents
<ul style="list-style-type:none">
	<li>1 - <a href="#installation">Installation</a></li>
	<li>2 - <a href="#curl-requests">Curl-requests for express-oauth-server</a>
		<ul style="list-style-type:none">
			<li>2.1 - <a href="#credentials-body">Client credentials in the request body</a>
				<ul style="list-style-type:none">
					<li>2.1.1 - <a href="#password-grant">Get access token via password grant</a></li>
					<li>2.1.2 - <a href="#refresh-token-grant">Get access token via refresh token grant</a></li>
					<li>2.1.3 - <a href="#client-credential-grant">Get access token via client credential grant</a></li>
				</ul>
			</li>
			<li>2.2 - <a href="#client-credentials-base64">Client credentials base64-encoded</a>
				<ul style="list-style-type:none">
					<li>2.1.1 - <a href="#base64-password-grant">Get access token via password grant</a></li>
					<li>2.1.2 - <a href="#base64-refresh-token-grant">Get access token via refresh token grant</a></li>
					<li>2.1.3 - <a href="#base64-client-credential-grant">Get access token via client credential grant</a></li>
				</ul>
			</li>
		</ul>
	</li>
	<li>3 - <a href="#access-resources">Access resources</a>
		<ul style="list-style-type:none">
			<li>3.1 - <a href="#protected">Access protected resource</a></li>
			<li>3.2 - <a href="#public">Access public resource</a></li>
		</ul>
	</li>
	<li>4 - <a href="#documentation">Documentations used for this guide</a></li>
	<li>5 - <a href="#appendix">APPENDIX</a>
		<ul style="list-style-type:none">
			<li>A - <a href="#appendix-A">Curl options used in this guide</a></li>
		</ul>
	</li>
</ul>



<a id="installation"></a>
## 1 Installation

Simply run `npm i` and after the installation is finished `npm run dev-memory`. 

<a id="curl-requests"></a>
## 2 Curl-requests for express-oauth-server

This section goes through curl requests for interacting with the oauth server.

<a id="credentials-body"></a>
### 2.1 Client credentials in the request body

This first part sends the requests with the client credentials in the request body.

<a id="password-grant"></a>
### <i>2.1.1 Get access token via password grant [[2](#docTwo)]:</i>

#### Example request:
```Shell Session
curl http://localhost:3000/oauth/token -d "grant_type=password" -d "username=freddbull" -d "password=password" -d "client_id=application" -d "client_secret=secret" -H "Content-Type: application/x-www-form-urlencoded"
```

#### Example response:
```Shell Session
{"access_token":"bdde83d3562ecc751f618a4bec0e30048bc51275","token_type":"Bearer","expires_in":3599,"refresh_token":"fbc456bb5fa4233b2601913e9d989deeb235b13f"}
```
<a id="refresh-token-grant"></a>
### <i>2.1.2 Get access token via refresh token grant [[3](#docThree)]:</i>

> ### NOTE!
> You have to change the refresh token below to the one you got from section [2.1.1](#password-grant).</br>Example: `"refresh_token=<your refresh token goes here>"`

#### Example request
```Shell Session
curl http://localhost:3000/oauth/token -H "Content-Type: application/x-www-form-urlencoded" -d "client_id=application" -d "client_secret=secret" -d "grant_type=refresh_token" -d "refresh_token=fbc456bb5fa4233b2601913e9d989deeb235b13f"
```

#### Example response
```Shell Session
{"access_token":"dc64ad729e7fc2d10a34b845fe28ccc103163af6","token_type":"Bearer","expires_in":3599,"refresh_token":"8ee8dd5aec0365909d01db3c6106e17e88bd87c8"}
```

<a id="client-credential-grant"></a>
### <i>2.1.3. Get access token via client credential grant [[4](#docFour)]:</i>

#### Example request
```Shell Session
curl http://localhost:3000/oauth/token -H "Content-Type: application/x-www-form-urlencoded" -d "grant_type=client_credentials" -d "client_id=application" -d "client_secret=secret"
```

> ### NOTE!
> Client credential grant SHOULD NOT return a refresh_token [<a href="#docFour">4</a>].

#### Example response
```Shell Session
{"access_token":"cd3675c962a5a4e49a50155fbb4eb06fef02a52f","token_type":"Bearer","expires_in":3599}
```

<a id="client-credentials-base64"></a>
### 2.2 Client credentials base64-encoded

This part sends the curl requests with the client credentials in the request header encoded using base64-encoding [[5](#docFive)].
> #### Example - encoding \<username:password\> using base64 encoding:
>
> application:secret = YXBwbGljYXRpb246c2VjcmV0 =>
>
> => "Authorization: Basic YXBwbGljYXRpb246c2VjcmV0"
>
>Add "Authorization: Basic YXBwbGljYXRpb246c2VjcmV0" to the request header.

Search on for "online base64 converter" and try it yourself; don't forget the semicolon!

<a id="base64-password-grant"></a>
### <i>2.2.1. Get access token via password grant [[2](#docTwo)]:</i>

#### Example request
```Shell Session
curl http://localhost:3000/oauth/token -H "Content-Type: application/x-www-form-urlencoded" -H "Authorization: Basic YXBwbGljYXRpb246c2VjcmV0" -d "grant_type=password" -d "username=freddbull" -d "password=password"
```

#### Example response
```Shell Session
{"access_token":"bdde83d3562ecc751f618a4bec0e30048bc51275","token_type":"Bearer","expires_in":3599,"refresh_token":"fbc456bb5fa4233b2601913e9d989deeb235b13f"}
```

<a id="base64-refresh-token-grant"></a>
### <i>2.2.2. Get access token via refresh token grant [[3](#docThee)]:</i>

> ### NOTE!
>You have to change the refresh token below to the one you got from request <a href="#base64-password-grant">2.2.1</a>.</br> Example: `"refresh_token=<your refresh token goes here>"`.

#### Example request
```Shell Session
curl http://localhost:3000/oauth/token -H "Content-Type: application/x-www-form-urlencoded" -H "Authorization: Basic YXBwbGljYXRpb246c2VjcmV0" -d "grant_type=refresh_token" -d "refresh_token=fbc456bb5fa4233b2601913e9d989deeb235b13f
```

#### Example response
```Shell Session
{"access_token":"489121b45987bee9936b4f8b407ea0228a1e1e38","token_type":"Bearer","expires_in":3599,"refresh_token":"1f6d1655b3315a7f425f51412319fc2d1a113c29"}
```

<a id="base64-client-credential-grant"></a>
### <i>2.2.3. Get access token via client credential grant [[4](#docFour)]:</i>

#### Example request
```Shell Session
curl http://localhost:3000/oauth/token -H "Content-Type: application/x-www-form-urlencoded" -H "Authorization: Basic YXBwbGljYXRpb246c2VjcmV0" -d "grant_type=client_credentials"
```
> ### NOTE!
>Client credential grant SHOULD NOT return a refresh_token [<a href="#docFour">4</a>].

#### Example response
```Shell Session
{"access_token":"2dce15e228e4abe76c18b70b1ba87a2ca492b2c7","token_type":"Bearer","expires_in":3599}
```

<a id="access-resources"></a>
## 3. -  Access resources

<a id="protected"></a>
### 3.1 - Access protected resource [[6](#docSix)]:

> ### NOTE!
> You have to change the access/bearer token below to the one you got from one of the requests above. </br> Example:
`"Authorization: Bearer <your access/bearer token goes here>"`.

#### Example request
```Shell Session
curl http://localhost:3000/secret -H "Authorization: Bearer cd3675c962a5a4e49a50155fbb4eb06fef02a52f"
```

#### Example response
```Shell Session
Secret area
```

<a id="public"></a>
### 3.2 - Access public resource:

#### Example request
```Shell Session
curl http://localhost:3000
```
#### Example response
```Shell Session
Public area
```

<a id="documentation"></a>
## 4.0 Documentations used for this guide:
<a id = 'docOne'></a>[1]
[The OAuth 2.0 Authorization Framework](https://tools.ietf.org/html/rfc6749.html)
    
<a id = "docTwo"></a>[2]	
[Resource Owner Password Credentials Grant](https://tools.ietf.org/html/rfc6749.html#section-4.3)

<a id = "docThree"></a>[3]
[Refreshing an Access Token](https://tools.ietf.org/html/rfc6749.html#page-47)

<a id = "docFour"></a>[4]
[Client Credentials Grant](https://tools.ietf.org/html/rfc6749.html#section-4.4)

<a id = "docFive"></a>[5]
[HTTP Authentication: Basic and Digest Access Authentication](https://tools.ietf.org/html/rfc2617)

<a id = "docSix"></a>[6]
[Accessing Protected Resources](https://tools.ietf.org/html/rfc6749.html#section-7)

<a id = "docSeven"></a>[7]
[Curl man page](http://man.he.net/?topic=curl&section=all)

<a id="appendix"></a>
## APPENDIX
<a id="appendix-A"></a>
### A - Curl options used in this guide: 
```Shell Session
curl [options] [URL...]
```

`-H`: adds extra header to the request.</br>&nbsp;&nbsp;&nbsp;&nbsp;  Example: `-H "Authorization: Basic YXBwbGljYXRpb246c2VjcmV0"`

`-d`: adds data to the request body and therefore issues a post-request.</br>&nbsp;&nbsp;&nbsp;&nbsp;Example: `-d "client_id=application"`

For more information about curl please search the man pages [[7](#docSeven)].