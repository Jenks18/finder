import React from "react";
import gymData from "./gymData";

export default class Gym extends React.Component {
    constructor(props){
        super();
        this.state = {
            gymName:"",
        }
    }

    componentDidMount = () => {
        let gymId = window.location.href.split("/").pop() //get gymId
        let selectedGymId = gymData.filter(g=>g.id === gymId)[0] //get gym object
        this.setState({gymName: selectedGymId.name})
    }
    render(){
        return(
            <div>
                <h1>
                    Gym: {this.state.gymName}
                </h1>
            </div>
        )
    }

}