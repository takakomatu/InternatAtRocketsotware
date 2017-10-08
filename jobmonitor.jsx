import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Col, Row } from 'react-bootstrap';
import { AreaChart, CartesianGrid, Area, XAxis, YAxis, Legend } from 'recharts';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import TimePicker from 'react-bootstrap-time-picker';
import moment from 'moment';
import PlugzAjax from 'plugz-ajax';

export default class SdsfMonitor extends Component {
        
    constructor(props) {
        super(props);
        this.state = {
            "date": "20170724/0012", //initialize value
            "data": [],
            "time": 0
        };
    }

    handleTimeChange(time) {
        let name; 
        let HH; 
        let MM;
        name = time/60;
        HH = Math.floor(name / 60);
        MM = name % 60;
        if( HH < 10 ){      
            let HHMM1 = "0" + HH + "" + MM;
            this.getSystemStatusList(1, "20170724" + "/" + HHMM1);
        }

        if( HH >= 10 )
        {alert(HH + ":" + MM);
        }

        //TODO:
        this.setState({
            "time": time
        });
    }

    /**
     * Get system performance array by JAXA.
     * @param systemid - (currently not used.) system id which is storing in database. 
     * @param date - YYYYMMDD format string 
     */

    getSystemStatusList(systemid, date) {
        PlugzAjax.get("../api/monitor/" + systemid + "/" + date) //?
            .then((response) => {
                //request success
                this.setState({
                    "data": response.data.data,
                });
            }).catch((error) => {
                //request failed
                //console.error(error.message);
            });
        this.setState({
            "date": "20170724"              
        });
    }
        

    //Invoked immediately after a component is mounted. 
    //Initialization that requires DOM nodes should go here. 
    //If you need to load data from a remote endpoint, 
    //this is a good place to instantiate the network request. 
    //Setting state in this method will trigger a re-rendering.
    componentDidMount() {
        //get system status as of 2017/07/24
        this.getSystemStatusList(1, this.state.date);  
    }

    onChange(selectedDay, modifiers) {  this.getSystemStatusList(1, moment(selectedDay).format("YYYYMMDD"));}  

    //in this sample displya only cpupr (CPU Usage)
    render() {
        return (


            <div>
                 <p>Please type a day:</p>

                 
<DayPickerInput 

     value={this.state.date} 
     onDayChange={ (selectedDay, modifiers) => this.onChange(selectedDay, modifiers) } />

　　　　<TimePicker start="00:12" end="23:59" step={15} value={this.state.time} onChange={(time) => this.handleTimeChange(time)}/> 
            
                <Row>　
                    <Col xs={6} md={6}>
                    <h4>　　　　　　　　 　　  　　                                                                                      　　　　　　　　 　　  　　                                                                                      　　　　　　　　 　　  　　                                                                                      　　　　　　　　 　　  　　                                                                                      　　　　　　　　 　　  　　                                                                                           　　　　　　　　 　　  　　                                                                                      　　　　　　　　 　　  　　                                                                                      　　　　　　　　 　　  　　                                                                                      　　　　　　　　 　　  　　                                                                                      　　　　　　　　 　　  　　                                                                                      　　　　　　　　 　　  　　                                                                                      　　　　　　　　 　　  　　                                                                                      　　　　　　　　 　　  　　                                                                                      Active Jobs</h4>　
                        <AreaChart width={1200} height={600} data={this.state.data}                     
                        margin={{"top": 20, "right": 80, "bottom": 20, "left": 20}}>
                        <XAxis dataKey="name" label={{ "value":"Job名", "position":"insideBottom", "dy": 6 , "fill":"white"}} />
                        <YAxis label={{ "value":"実行数",  "position":"insideLeft", "angle":-90, "dx":20, "dy": 20, "fill":"white"}}/>
                        <CartesianGrid strokeDasharray="3 3" />
                        <Area type="monotone" dataKey="count" stroke="#82ca9d" />

                        <Legend />
                    </AreaChart> </Col>
                </Row>
            </div>
        );
    }
}

sdsfmonitor.jsx

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Col, Row } from 'react-bootstrap';
import { AreaChart, CartesianGrid, Area, XAxis, YAxis, Legend } from 'recharts';
import DayPickerInput from 'react-day-picker/DayPickerInput';

import moment from 'moment';
import PlugzAjax from 'plugz-ajax';

export default class SdsfMonitor extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            "date": "20170724", //initialize value
            "data": []
        };
   }
 
    /**
     * Get system performance array by JAXA.
     * @param systemid - (currently not used.) system id which is storing in database. 
     * @param date - YYYYMMDD format string 
     */
    getSystemStatusList(systemid, date) {
        PlugzAjax.get("../api/monitor/" + systemid + "/" + date)
            .then((response) => {
                //request success
                this.setState({
                    "data": response.data.data,
                });
            }).catch((error) => {
                //request failed
                console.error(error.message);
            });
        this.setState({
            "date": "20170724"              
        });
    } 
            
    //Invoked immediately after a component is mounted. 
    //Initialization that requires DOM nodes should go here. 
    //If you need to load data from a remote endpoint, 
    //this is a good place to instantiate the network request. 
    //Setting state in this method will trigger a re-rendering.
    componentDidMount() {
        //get system status as of 2017/07/24
        this.getSystemStatusList(1, this.state.date);
    }

    onChange(selectedDay, modifiers) {  this.getSystemStatusList(1, moment(selectedDay).format("YYYYMMDD"));} 

    //in this sample displya only cpupr (CPU Usage)
    render() {
        return (

            <div>
                 <p>Please type a day:</p>


<DayPickerInput 

     value={this.state.date} 
     onDayChange={ (selectedDay, modifiers) => this.onChange(selectedDay, modifiers) } />

                <Row>　
                    <Col xs={6} md={6}>
                        <h4><center>CPU Usage</center></h4>　
                        <AreaChart width={600} height={300} data={this.state.data}                      
                        margin={{"top": 20, "right": 80, "bottom": 20, "left": 20}}>
                        <XAxis dataKey="time" label={{ "value":"測定時間(HH:mm)", "position":"insideBottom", "dy": 6 , "fill":"white"}} />
                        <YAxis label={{ "value":"使用率(%)",  "position":"insideLeft", "angle":-90, "dx":20, "dy": 20, "fill":"white"}}/>

                        <CartesianGrid strokeDasharray="3 3" />
                        <Area type="monotone" dataKey="cpupr" stroke="#82ca9d" />

                        <Legend />
                    </AreaChart> </Col>

                    <Col xs={6} md={4}> 

                        <h4><center>Spool Usage</center></h4>
                        <AreaChart width={600} height={300} data={this.state.data}                      
                        margin={{"top": 20, "right": 80, "bottom": 20, "left": 20}}>
                        <XAxis dataKey="time" label={{ "value":"測定時間(HH:mm)", "position":"insideBottom", "dy": 6 , "fill":"white"}} />
                        <YAxis label={{ "value":"spoolpct",  "position":"insideLeft", "angle":-90, "dx":20, "dy": 20, "fill":"white"}}/>
                            <CartesianGrid strokeDasharray="3 3" />
                            <Area type="monotone" dataKey="spoolpct" stroke="#82ca9d" />
                            <Legend />

                        </AreaChart>

                    </Col>
                </Row>

                                <Row>

                    <Col xs={6} md={6}>
                    
                        <h4><center>Common storage area used</center></h4>
                        <AreaChart width={600} height={300} data={this.state.data}                      
                        margin={{"top": 20, "right": 80, "bottom": 20, "left": 20}}>
                        <XAxis dataKey="time" label={{ "value":"測定時間(HH:mm)", "position":"insideBottom", "dy":  6 , "fill":"white"}} />
                        <YAxis label={{ "value":"%",  "position":"insideLeft", "angle":-90, "dx":20, "dy": 20, "fill":"white"}}/>
                            <CartesianGrid strokeDasharray="3 3" />
                            <Area type="monotone" dataKey="csapct" stroke="#82ca9d" />
                            <Legend />
                        </AreaChart>
                     </Col>

                    <Col xs={6} md={6}>
                        <h4><center>Extended common area used</center></h4>

                        <AreaChart width={600} height={300} data={this.state.data}
                            margin={{"top": 20, "right": 80, "bottom": 20, "left": 20}}>
                        <XAxis dataKey="time" label={{ "value":"測定時間(HH:mm)", "position":"insideBottom", "dy": 6 , "fill":"white"}} />
                        <YAxis label={{ "value":"%",  "position":"insideLeft", "angle":-90, "dx":20, "dy": 20, "fill":"white"}}/>
                            <CartesianGrid strokeDasharray="3 3" />
                            <Area type="monotone" dataKey="ecsapct" stroke="#82ca9d" />
                            <Legend />
                        </AreaChart>
                    </Col>
                </Row>

                <Row>
                    <Col xs={6} md={6}>
                        <h4><center>Active Jobs</center></h4>
                        <AreaChart width={600} height={300} data={this.state.data}                      
                        margin={{"top": 20, "right": 80, "bottom": 20, "left": 20}}>
                        <XAxis dataKey="time" label={{ "value":"測定時間(HH:mm)", "position":"insideBottom", "dy": 6 , "fill":"white"}} />
                        <YAxis label={{ "value":"ユーザー数",  "position":"insideLeft", "angle":-90, "dx":20, "dy": 20, "fill":"white"}}/>
                            <CartesianGrid strokeDasharray="3 3" />
                            <Area type="monotone" dataKey="jobnum" stroke="#82ca9d" />
                            <Legend />
                        </AreaChart>
                     </Col>

                    <Col xs={6} md={6}>
                        <h4><center>Active users</center></h4>
                        <AreaChart width={600} height={300} data={this.state.data}
                            margin={{"top": 20, "right": 80, "bottom": 20, "left": 20}}>
                        <XAxis dataKey="time" label={{ "value":"測定時間(HH:mm)", "position":"insideBottom", "dy": 6 , "fill":"white"}} />
                        <YAxis label={{ "value":"タスク数",  "position":"insideLeft", "angle":-90, "dx":20, "dy": 20, "fill":"white"}}/>
                            <CartesianGrid strokeDasharray="3 3" />
                            <Area type="monotone" dataKey="tsunum" stroke="#82ca9d" />
                            <Legend />
                        </AreaChart>

                    </Col>
                </Row>
            </div>
        );
    }
}
