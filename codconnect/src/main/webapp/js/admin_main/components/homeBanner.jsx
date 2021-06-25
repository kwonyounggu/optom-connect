import React from 'react';
import Carousel from "react-material-ui-carousel"
import autoBind from "auto-bind"
import '../css/homeBanner.scss';

import 
{
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Button,
    Checkbox,
    FormControlLabel,
    Radio,
    RadioGroup,
    FormLabel,
    Slider
} from '@material-ui/core';

/*
function Banner(props) 
{
	if (props.newProp) console.log(props.newProp)
    const contentPosition = props.contentPosition ? props.contentPosition : "left"
    const totalItems = props.length ? props.length : 3;
    const mediaLength = totalItems - 1;

    let items = [];
    const content = 
    (
        <Grid item xs={12 / totalItems} key="content">
            <CardContent className="Content">
                <Typography className="Title">
                    {props.item.Name}
                </Typography>

                <Typography className="Caption">
                    {props.item.Caption}
                </Typography>

                <Button variant="outlined" className="ViewButton">
                    View Now
                </Button>
            </CardContent>
        </Grid>
    );


    for (let i = 0; i < mediaLength; i++) 
    {
        const item = props.item.Items[i];

        const media = 
        (
            <Grid item xs={12 / totalItems} key={item.Name}>
                <CardMedia
                    className="Media"
                    image={item.Image}
                    title={item.Name}
                >
                    <Typography className="MediaCaption">
                        {item.Name}
                    </Typography>
                </CardMedia>

            </Grid>
        )

        items.push(media);
    }

    if (contentPosition === "left") 
    {
        items.unshift(content);
    } 
    else if (contentPosition === "right") 
    {
        items.push(content);
    } 
    else if (contentPosition === "middle") 
    {
        items.splice(items.length / 2, 0, content);
    }

    return (
        <Card raised className="Banner">
            <Grid container spacing={0} className="BannerGrid">
                {items}
            </Grid>
        </Card>
    )
}

const items = 
[
    {
        Name: "Electronics",
        Caption: "Electrify your friends!",
        contentPosition: "left",
        Items: [
            {
                Name: "Macbook Pro",
                Image: "https://source.unsplash.com/featured/?macbook"
            },
            {
                Name: "iPhone",
                Image: "https://source.unsplash.com/featured/?iphone"
            }
        ]
    },
    {
        Name: "Home Appliances",
        Caption: "Say no to manual home labour!",
        contentPosition: "middle",
        Items: [
            {
                Name: "Washing Machine WX9102",
                Image: "https://source.unsplash.com/featured/?washingmachine"
            },
            {
                Name: "Learus Vacuum Cleaner",
                Image: "https://source.unsplash.com/featured/?vacuum,cleaner"
            }
        ]
    },
    {
        Name: "Decoratives",
        Caption: "Give style and color to your living room!",
        contentPosition: "right",
        Items: [
            {
                Name: "Living Room Lamp",
                Image: "https://source.unsplash.com/featured/?lamp"
            },
            {
                Name: "Floral Vase",
                Image: "https://source.unsplash.com/featured/?vase"
            }
        ]
    }
]
*/

function EyeCareBanner(props)
{
	 return (
        <Card raised className="Banner">
	                <CardMedia
	                    className="Media"
	                    image={props.item.image}
	                    title={props.item.name}
	                >  
	                </CardMedia>
        </Card>
    )
}
/*
function EyeCareBanner(props)
{
	console.log("props of EyeCareBanner: ", props.item.image);
	 return (
        <Card raised className="Banner">
            <Grid container className="BannerGrid">
                <Grid item key={props.item.name}>
	                <CardMedia
	                    className="Media"
	                    image={props.item.image}
	                    title={props.item.name}
	                >
	                    <Typography className="MediaCaption">
	                        {props.item.name}
	                    </Typography>
	                </CardMedia>
	            </Grid>
            </Grid>
        </Card>
    )
}*/
const eyeCareItems =
[
	{
		name: "first",
		image: "/images/home_image0.jpg",
		description: ""
	},
	{
		name: "second",
		image: "/images/home_image1.jpg",
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
class HomeBanner extends React.Component 
{
    constructor(props) 
	{
        super(props);

        this.state = 
  		{
            autoPlay: true,
            animation: "fade",
            indicators: true,
            timeout: 500,
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
                        eyeCareItems.map
						((item, index) => 
						 {
                            return <EyeCareBanner item={item} key={index}  />
                         }
						)
                    }
                </Carousel>
            </div>

        )
    }
}

export default HomeBanner;