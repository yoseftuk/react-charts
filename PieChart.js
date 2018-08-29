import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class PieChart extends Component {

    constructor(props){
        super(props);
        this.canvasWidth = this.props.width||300;
        this.data = this.props.data;
        this.fullSize = 0;
        for(let i in this.data){this.fullSize += this.data[i].value}
        for(let i in this.data){this.data[i].percent = parseInt(this.data[i].value/this.fullSize*10000)/100}

        //binding functions to use `this`
        this.setHoverHandler = this.setHoverHandler.bind(this);
        this.writeCanvas = this.writeCanvas.bind(this);
        this.reactOnHover = this.reactOnHover.bind(this);
        this.removeInfoSpan = this.removeInfoSpan.bind(this);

        this.state = {
            currentIndex:0,
            showSpan:false,
            x:0,
            y:0,
        }

    }

    componentDidMount(){
        this.ctx = this.canvas.getContext('2d');
        this.ctx.lineWidth = this.canvasWidth/20*9;

        this.writeCanvas();

        this.setHoverHandler();

    }

    writeCanvas(){

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        let begin_angel = -0.5;
        let size = 0;
        for(let i=0; i<this.data.length; i++){

            size = begin_angel + (this.data[i].value/this.fullSize*2);
            this.data[i].begin_angle = (begin_angel/2*360)+90;
            this.data[i].end_angle = (size/2*360)+90;

            this.ctx.beginPath();
            this.ctx.arc(this.canvasWidth/2,this.canvasWidth/2,this.canvasWidth/40*9 ,begin_angel*Math.PI,size*Math.PI,false);
            this.ctx.strokeStyle = this.data[i].color;
            this.ctx.stroke();
            this.ctx.closePath();

            begin_angel = size;
        }
        this.ctx.beginPath();
        this.ctx.arc(this.canvasWidth/2,this.canvasWidth/2,this.canvasWidth/20*9 ,0,2*Math.PI,false);
        this.ctx.strokeStyle = '#222222';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        this.ctx.closePath();

    }

    toDegrees (angle) {
        return angle * (180 / Math.PI);
    }

    getLineWidth(x1,x2,y1,y2){
        return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
    }

    removeInfoSpan(){
        this.setState({showSpan:false});
    }

    setHoverHandler(){

        let reactOnHover = this.reactOnHover;

        this.canvas.onmousemove = function(e) {

            // get the correct mouse position:
            let
                rect = this.getBoundingClientRect(),
                x = e.clientX - rect.left,
                y = e.clientY - rect.top;

            reactOnHover(x,y);

        };
    }

    reactOnHover(x,y){

        // get the angle of the mouse from the center of the canvas
        let centerX = this.canvas.width/2;
        let centerY = this.canvas.width/2;
        let opp = x - centerX;
        let hyp = this.getLineWidth(centerX,x,centerY,y);
        if (hyp > this.canvasWidth/20*9){
            return this.removeInfoSpan();
        }
        let angle = this.toDegrees(Math.asin(opp/hyp));
        angle = y>centerY?180-angle:x<centerX?360+angle:angle;

        // find the data area who exist in the mouse position
        let index = -1;
        for(let i=0;i<this.data.length;i++){
            // console.log(i,data[i].begin_angle,data[i].end_angle,angle);
            if (this.data[i].begin_angle <= angle && this.data[i].end_angle > angle){
                index = i;
                break;
            }
        }

        // set state with a current info to display on the info span
        if(index !== -1){
            console.log(this.div.offsetHeight);
            this.setState({
                currentIndex:index,
                showSpan:true,
                x:this.canvas.width - x - this.canvasWidth/20,
                y:this.div.offsetHeight - y - this.canvasWidth/20 + 6,
            });
        }else{this.removeInfoSpan()}

    }

    render() {

        const containerStyle = {padding:'12px',display:'inline-block',backgroundColor:(this.props.background||'#fdffde'),border:this.props.border||'1px solid black',position:'relative',color:this.props.color||'black', fontFamily:this.props.fontfamily||'Arial',textAlign:'center'};
        const spanStyle = {pointerEvents:'none',position:'absolute',right:(this.state.x)+'px',bottom:(this.state.y)+'px',color:'white', backgroundColor:'black', borderRadius:'8px',padding:'3px 7px',display:this.state.showSpan?'inline':'none',transition:'all 0.2s ease'};
        const current = this.data[this.state.currentIndex];

        const labels = this.data.map((item, index)=>(
            <p key={'label_'+index}><div style={{content:'',width:'15px',height:'15px',backgroundColor:item.color,display:'inline-block'}}/>  {item.label +' : '+item.value + '  ('+(item.percent)+'%)'}</p>
            ));
        return (
            <div style={containerStyle} ref={(ref)=>{this.div = ref}}>
                <canvas width={this.canvasWidth} height={this.canvasWidth} ref={(ref)=>{this.canvas = ref}} onMouseLeave={this.removeInfoSpan} style={{margin:'auto'}}>
                </canvas>
                <span style={spanStyle}><span style={{whiteSpace:'nowrap'}}><span style={{fontSize:'17px'}}>{current.value} </span><span style={{fontSize:'12px'}}>{current.percent}%</span></span><br/><span style={{fontSize:'12px',whiteSpace:'nowrap'}}>{current.label}</span></span>
                <div style={{textAlign:'left'}}>{labels}</div>

            </div>
        );
    }
}

if (document.getElementById('pie-chart')) {
    ReactDOM.render(<PieChart />, document.getElementById('pie-chart'));
}
