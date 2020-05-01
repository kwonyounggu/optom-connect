import React from "react";
import {Link} from "react-router-dom";


const NavRootFooter=(props)=>
{
	console.log("In NavMain, ",props);
	let currentFooter=null, pathname=props.location.pathname;
	switch(pathname)
	{
		case "/": 
		case "/login":
		case "/signup":
		case "/forgotPassword":
		case "/resetPassword":
		case (pathname.match(/^\/home[\/]?/i)||{}).input:
		{
			currentFooter=<RootFooterBar {...props} />;
			      break;
		}
		default:
		{
			console.log("Not Found of the given route for the footer in the NavRootFooter");
			break;
		}
	}
	
	return currentFooter;
}
//see https://teamtreehouse.com/library/css-flexbox-layout/building-a-layout-with-flexbox/creating-a-sticky-footer-with-flexbox
const RootFooterBar=(props)=>
(
		<footer className="footer">
		  <div className="container">
			<div className="top-footer">
				<div className="top-column">
					<ul><b>About company</b>
						<li>The company provides ...</li>
					</ul>
				</div>
				<div className="top-column">
					<ul><b>Our Company</b>
						<li>Home</li>
						<li>Music</li>
						<li>MatchMaker</li>
						<li>Etc</li>
					</ul>
				</div>
				<div className="top-column">
					<ul><b>Topics</b>
						<li>Home</li>
						<li>Music</li>
						<li>MatchMaker</li>
						<li>Etc</li>
					</ul>
				</div>
				<div className="top-column">
					<ul><b>Tracks</b>
						<li>Home</li>
						<li>Music</li>
						<li>MatchMaker</li>
						<li>Etc</li>
					</ul>
				</div>
			</div>
			<div className="bottom-footer">
				<div className="bottom-column">
					<a href="#"><i className="fa fa-facebook"></i></a>
					<a href="#"><i className="fa fa-twitter"></i></a>
					<a href="#"><i className="fa fa-linkedin"></i></a>
					<a href="#"><i className="fa fa-github"></i></a>
					<a href="#"><i className="fa fa-google-plus"></i></a>
				  	<a href="#"><i className="fa fa-skype"></i></a>
				</div>
				<div className="bottom-column">
					<Link to="#">About Company</Link>
					<Link to="#">Privacy Policy</Link>
					<Link to="#">Terms & Conditions</Link>
					<span>&copy;2017 WebMonster Technologies</span>
				</div>
			</div>
		  </div>
	    </footer>
);

export default NavRootFooter;

