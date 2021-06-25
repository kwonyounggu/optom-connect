import React from "react";
import {PropTypes} from "prop-types";

var styles=
    {
        content: 
        {
            textAlign: "center",
            fontSize: "2em"
        }
    }
export class Loading extends React.Component
{
    constructor(props)
    {
        super(props);
        //without unnecessary trailings in the text by replace function
        this.state=
        {
             text: this.props.text.replace(/[^a-zA-Z_]*$/, "")
        };
    }
    componentDidMount()
    {
        var stopper=this.state.text+"...";
     
        console.log("stopper: "+stopper+", this.props.text: "+this.props.text+", this.state.text: "+this.state.text);
        this.intervalId=window.setInterval
        (
            ()=>
            {
                if(this.state.text===stopper)
                {
                    this.setState({text: stopper.replace(/\.*$/, "")}); //set it without ...
                }
                else
                {
                    /*see https://stackoverflow.com/questions/39806802/lifecycle-event-state-and-prevstate-in-react-js*/
                    this.setState
                    (
                        (prevState, currentProps)=>{return {text: prevState.text+"."}}
                    );
                }
                
            },
            this.props.speed
        );
    }
    componentWillUnmount()
    {
        console.log("In Loading.jsx, componentWillUnmount() is called");
        window.clearInterval(this.intervalId);
    }
    render()
    {
        return (  
                <p style={styles.content}>
                    {this.state.text}
                </p>
               );
    }
}

Loading.propTypes=
{
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired
}
Loading.defaultProps=
{
     text: "Loading",
     speed: 300
}