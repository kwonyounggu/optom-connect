<%@ page language="java" contentType="text/json; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="javax.sql.*" %>
<%@ page isELIgnored ="false" %>

<%
	response.setContentType("text/html; charset=UTF-8");
%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>My Portal</title>
	
	<!-- the following public_url stuff is from auth0.com/blog/reactjs-authentication-tutorial 
	<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
	-->
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
	
	<!-- Optional theme -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css">
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">

	<script src="https://cdn.auth0.com/js/lock/10.18/lock.min.js"></script>
	<!-- before you commit to asgraph of openshift, 
		1: copy dist/index-bundle.js into src/main/webapp/js/index-bundle.js 
		2. put a statement after the div of app as in script src="js/bundle.js"
		<script type="text/javascript" src="js/index_bundle.js"></script>
			<script type="text/javascript" src="/index_bundle.js"></script>
	-->
	<!--
		<script src="https://cdn.auth0.com/js/lock/10.x.y/lock.min.js"></script>
		<script src="https://cdn.auth0.com/js/lock/10.18/lock.min.js"></script>
	-->
</head>
<body>
	<div id="app"><div style="height: 100%; width: 100%; display: flex; position: fixed; align-items: center; justify-content: center"><h1>Uploading ...</h1></div></div>
	<script type="text/javascript" src="js/built/admin_index_bundle.js"></script></body>
</html>