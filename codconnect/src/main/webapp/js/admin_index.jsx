/**
 * This is the file, entry point, defined in webpack.config.js
 */
import React from "react";
import ReactDOM from "react-dom";

import "./main/css/root.css";
import "./main/css/footer.css";


/****************************************************************************************************************************/
//For the dynamic menu to change a root menu contents, see https://stackoverflow.com/questions/42095600/nested-routes-in-v4
/****************************************************************************************************************************/
class MainApp extends React.Component
{
    constructor(props)
    {
        super(props);
        ////this.handleAuthentication=this.handleAuthentication.bind(this);
    }
    componentWillMount()
    {
    	
    }
    componentDidMount()
    {
    }

    render()
    { return(<div>This is the admin page</div>);
    }
}

ReactDOM.render
( <MainApp />,window.document.getElementById("app"));