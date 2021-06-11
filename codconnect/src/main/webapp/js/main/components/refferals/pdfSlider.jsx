import React from 'react';
import Carousel from "react-material-ui-carousel"
import autoBind from "auto-bind"
import '../../css/homeBanner.scss';
import IframePDF from "./iframePDF.jsx";
import {Card} from '@material-ui/core';

function EachSlider(props)
{
	 return (
        <IframePDF src={props.item.image} />
    )
}

const pdfItems =
[
	{
		name: "first",
		image: "/docs/patientReferralFormEditable.pdf",
		description: ""
	},
	{
		name: "second",
		image: "/docs/patientReferralFormEditable.pdf",
		description: ""
	},
	{
		name: "third",
		image: "/images/home_image2.jpg",
		description: ""
	},
	{
		name: "fourth",
		image: "/images/home_image3.jpg",
		description: ""
	},
	{
		name: "fifth",
		image: "/images/home_image4.jpg",
		description: ""
	},
	{
		name: "sixth",
		image: "/images/home_image5.jpg",
		description: ""
	}
];
class PDFSlider extends React.Component 
{
    constructor(props) 
	{
        super(props);

        this.state = 
  		{
            autoPlay: true,
            animation: "fade",
            indicators: true,
            timeout: 500000,
            navButtonsAlwaysVisible: false,
            navButtonsAlwaysInvisible: false,
            cycleNavigation: true
        };

        autoBind(this);
    }

	//This is to prevent a warning about a memory leak.
	//See https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
	componentWillUnmount() 
	{
	    // fix Warning: Can't perform a React state update on an unmounted component
	    this.setState = (state,callback) =>
		{
	        return;
	    };
	}
    toggleAutoPlay() 
    {
        this.setState({ autoPlay: !this.state.autoPlay })
    }

    toggleIndicators() 
	{
        this.setState({indicators: !this.state.indicators})
    }

    toggleNavButtonsAlwaysVisible() 
	{
        this.setState({navButtonsAlwaysVisible: !this.state.navButtonsAlwaysVisible})
    }

    toggleNavButtonsAlwaysInvisible() 
	{
        this.setState({navButtonsAlwaysInvisible: !this.state.navButtonsAlwaysInvisible})
    }

    toggleCycleNavigation() 
	{
        this.setState({cycleNavigation: !this.state.cycleNavigation})
    }

    changeAnimation(event) 
	{
        this.setState({animation: event.target.value})
    }

    changeTimeout(event, value) 
	{
        this.setState({timeout: value})
    }

    render() 
	{
        return (
            <div style={{ marginTop: "0px"}}>
                <Carousel    
                    autoPlay={this.state.autoPlay}
                    animation={this.state.animation}
                    indicators={this.state.indicators}
                    timeout={this.state.timeout}
                    cycleNavigation={this.state.cycleNavigation}
                    navButtonsAlwaysVisible={this.state.navButtonsAlwaysVisible}
                    navButtonsAlwaysInvisible={this.state.navButtonsAlwaysInvisible}
                >
                    {
                        pdfItems.map
						((item, index) => 
						 {
                            return <EachSlider item={item} key={index}  />
                         }
						)
                    }
                </Carousel>
            </div>

        )
    }
}

export default PDFSlider;