import React from "react";
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import GoogleMapReact from 'google-map-react';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import gymData from "./gymData";
import { selectClasses } from "@mui/material";


export default class Map extends React.Component {
    constructor(props){
        super();
        this.state = {
            latitude: 24.72,
            longitude: 43.23,
            gyms: gymData,
            selectedGymId: null,
            markerClicked: false,
            searchText: "",
            distnace: 40,
        }
    }

    componentDidMount = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position.coords)
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    
                })
            },
        (error) => {
            console.log("Error Getting Location: " + error.message)
        }
        )
    }
    header = () =>{
        const getDistanceFromLatLoninKm = (lat1, lon1, lat2, lon2) => {
            const deg2rad = (deg) => {return deg * (Math.PI / 180)}

            var R = 6371; //Radius of the earth in km
            var dLat = deg2rad(lat2 - lat1);
            var dLon = deg2rad(lon2 - lon1);
            var a = 
                Math.sin(dLat / 2) * Math.sin(dLat/2) +
                Math.cos(deg2rad(lat1))* Math.cos(deg2rad(lat2))*
                Math.sin(dLon / 2) * Math.sin(dLon / 2)
                ;
            
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = R * c; //Distance in km
            return d;
        }

        const handleSearch = () => {
            let filteredGyms = gymData.filter(
                g =>
                g.name.toLowerCase().includes(this.state.searchText.toLowerCase())
                &&
                (getDistanceFromLatLoninKm(this.state.latitude, this.state.longitude, g.latitude, g.longitude) < this.state.distnace
                )
            )
                this.setState({
                gyms: filteredGyms
            })
        }


        const resetAll = () => {
            this.setState({
                gym: gymData,
                distnace: 40,
                searchText: ""
            })
        }
        return (
            <div style={{marginBottom:10}}>
                    <Typography variant='h4'style={{textAlign:"center"}}>
                        G Y M F I N D E R
                     </Typography>
                     <TextField label="Search for a gym" 
                        variant="outlined"
                        value={this.state.searchText}
                        style={{width:"100%"}}
                        onChange={(event)=>{this.setState({searchText: event.target.value})}}
                     />
                        <div style={{display:"flex", flexDirection: "row", justifyContent:"space-between", alignItems:"center"}}>
                            <Typography>
                                Distance:
                            </Typography>
                        <Slider style={{width:"75%"}}
                         value={this.state.distnace}
                         valueLabelDisplay="auto"
                         step={5}
                         marks
                         min={0}
                         max={50}
                         onChange={(event,value) => {this.setState({distnace: value})}}
                         />
                        </div>
                    <div>
                     <Button variant="outlined"
                            onClick={resetAll}
                     style={{width:"50%"}}>
                        <RestartAltIcon/>
                        Reset
                        </Button>
                    
                     <Button variant="contained"
                     onClick={handleSearch}
                     style={{width:"50%"}}>
                        <SearchIcon/>
                        Search
                        </Button>
                    
                    </div>
        </div>
        )    
}


    map = () =>{
        const clickedOutside = (x, y, lat, lng, event) => {
         if (this.state.markerClicked == true) {
            this.setState({
                selectedGymId: null,
                markerClicked: false,
            })
         }
         else{
            console.log("Clicked on map")
         }
        }

        const handleGymClick = (gym) => {
            window.location.replace("/gym/" + gym.id)
        }
        return(
            <div style={{height:"80vh"}}>
        <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCvxDpWWF914cDFdRK6ny-rAK13IMvWRlM" }}
            defaultCenter={{
                lat:10.2,
                lng:10.2,
            }}
        defaultZoom={2}
        center={{lat: this.state.latitude, lng: this.state.longitude}}
        
        onClick={clickedOutside}>
        {
            this.state.gyms.map((gym) => {
                return(
                <LocationOnIcon color={"secondary"}
                lat={gym.latitude}  
                lng={gym.longitude} 
                onClick={()=>{this.setState({selectedGymId: gym.id, markerClicked: true})}} 
                />

                )
            })
        }
        {
            this.state.gyms.map((gym) => {
                if (this.state.selectedGymId === gym.id){
                    return(
                        <div
                        lat={gym.latitude}  
                        lng={gym.longitude}
                        onClick={()=>{handleGymClick(gym)}} 
                        style={{ backgroundColor: "white", padding: 10, borderRadius: 20, width: 100}}>
                            <Typography style={{textAlign:"center"}}>
                                {gym.name}
                            </Typography>
                        </div>
                    )
                }
                else{
                    return null
                }
                
            })
        }
        <LocationSearchingIcon color={"primary"}
        lat={this.state.latitude}  
        lng={this.state.longitude} 
        />
        
      </GoogleMapReact>
                </div>
        )
    }
    render(){
        return(
            <div style={{backgroundColor:"beige"}}>
                {this.header()}
                {this.map()}
            </div>
        )
    }

}