import React, { Component } from 'react';

export default class Histogram extends Component {

    constructor(props){
        super(props);

        //initialize the values
        this.canvasWidth = this.props.width||300;
        this.data = this.props.data;
        this.fullSize = 0;
        this.maxValue = 0;
        this.usedHeight = this.canvasWidth - 20;
        for(let i in this.data){
            this.fullSize += this.data[i].value;
            if (this.data[i].value>this.maxValue){this.maxValue = this.data[i].value}
        }
        for(let i in this.data){this.data[i].percent = parseInt(this.data[i].value/this.fullSize*10000)/100}
        this.maxY = parseInt(this.maxValue*10/9);
        this.padding = this.canvasWidth/10;
        this.labelWidth = (this.canvasWidth-this.padding)/this.data.length;

        //binding functions to use `this`
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

        //init the canvas
        this.ctx = this.canvas.getContext('2d');
        this.ctx.textAlign = 'center';
        this.ctx.textStyle = '19px Aharoni';
        this.writeCanvas();
    }

    writeCanvas(){

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for(let i=0; i<this.data.length; i++){

            let data =  this.data[i];

            //draw the bar chart
            this.ctx.beginPath();
            this.ctx.fillStyle = data.color;
            let labelPercentFromMaxY = data.value/this.maxY*100;
            let labelHeight = this.usedHeight/100*labelPercentFromMaxY;
            let offsetX = ((this.canvas.width-this.padding)/this.data.length)*i + this.padding/2;
            let offsetY = this.canvas.height-labelHeight- 20;
            this.ctx.rect(offsetX,offsetY,this.labelWidth,labelHeight);
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.closePath();

            //add the value above the rect
            this.ctx.beginPath();
            this.ctx.fillText(data.value, offsetX+(this.labelWidth/2),offsetY-15);
            this.ctx.closePath();

            //write the x labels values
            this.ctx.beginPath();
            this.ctx.fillStyle = '#414141';
            this.ctx.fillText(this.props.labelsX[0]+this.props.labelsX[1]*i, offsetX,this.canvas.height);
            if(i === this.data.length-1){
                this.ctx.fillText(this.props.labelsX[0]+this.props.labelsX[1]*(i+1), offsetX+this.labelWidth,this.canvas.height);
            }
            this.ctx.closePath();

            //set label x and y for find on mouse hover
            this.data[i].x = offsetX;
            this.data[i].y = offsetY;
            this.data[i].height = labelHeight;
        }

    }

    isInRect(x1,x2,y1,y2,w,h){

        return x1>=x2 && x1<=x2+w && y1>=y2 && y1<=y2+h;
    }

    removeInfoSpan(){
        this.setState({showSpan:false});
    }

    reactOnHover(e){

        let
            rect = this.canvas.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

        // find the data area who exist in the mouse position
        let index = -1;
        for(let i=0;i<this.data.length;i++){

            if (this.isInRect(x,this.data[i].x,y,this.data[i].y,this.labelWidth,this.data[i].height)){
                index = i;
                break;
            }
        }

        // set state with a current info to display on the info span
        if(index !== -1){

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

        return (
            <div style={containerStyle} ref={(ref)=>{this.div = ref}}>
                <canvas width={this.canvasWidth} height={this.canvasWidth} ref={(ref)=>{this.canvas = ref}} onMouseMove={this.reactOnHover} onMouseLeave={this.removeInfoSpan} style={{margin:'auto'}}>
                </canvas>
                <span style={spanStyle}><span style={{whiteSpace:'nowrap'}}><span style={{fontSize:'17px'}}>{current.value} </span><span style={{fontSize:'12px'}}>{current.percent}%</span></span><br/><span style={{fontSize:'12px',whiteSpace:'nowrap'}}>{this.props.labelY || ''}</span></span>
            </div>
        );
    }
}
