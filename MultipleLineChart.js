import React, {Component} from 'react';

export default class MultipleLineChart extends Component {

    constructor(props) {
        super(props);

        //initialize the values
        this.canvasHeight = this.props.height || 300;
        this.data = this.props.data;
        this.startX = this.data[0].x;
        this.maxValueY = 0;
        this.maxValueX = 0;
        this.minValueY = this.data[0].y[0];
        for (let i in this.data) {
            this.data[i].x -= this.startX;
            if (this.data[i].x > this.maxValueX) {
                this.maxValueX = this.data[i].x
            }

            for (let j in this.data[i].y) {
                if (this.data[i].y[0] > this.maxValueY) {
                    this.maxValueY = this.data[i].y[j]
                }
                if (this.data[i].y[0] < this.minValueY) {
                    this.minValueY = this.data[i].y[j]
                }
            }
        }
        console.log(this.maxValueY, this.minValueY);
        for (let i in this.data) {
            this.data[i].percent = parseInt(this.data[i].x / this.maxValueX * 10000) / 100
        }

        this.maxY = (this.maxValueY - this.minValueY) * 10 / 9;

        //binding functions to use `this`
        this.writeCanvas = this.writeCanvas.bind(this);
        this.reactOnHover = this.reactOnHover.bind(this);
        this.removeInfoSpan = this.removeInfoSpan.bind(this);

        this.state = {
            currentIndex: 0,
            showSpan: false,
            x: 0,
            y: 0,
        }

    }

    componentDidMount() {

        //init the canvas
        this.canvas.width = this.div.offsetWidth - 24;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.textStyle = '20px Ahroni';

        this.writeCanvas();
        window.addEventListener('resize', () => {
            this.canvas.width = this.div.offsetWidth - 24;
            this.writeCanvas();
        });
    }

    writeCanvas() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.textAlign = 'center';
        this.ctx.strokeWidth = 4;

        for (let j in this.props.labelsY) {
            this.ctx.strokeStyle = this.props.colors[j];
            this.ctx.fillStyle = this.props.colors[j];
            this.ctx.beginPath();

            for (let i = 0; i < this.data.length; i++) {


                //get the values
                let data = this.data[i];
                let pointHeight = (data.y[j] - this.minValueY) / this.maxY;
                let offsetX = ((this.canvas.width / 100) * data.percent);
                let offsetY = this.canvasHeight - (this.canvasHeight * pointHeight);

                //initialize the cursor position
                if (i === 0) {
                    this.ctx.moveTo(offsetX, offsetY);
                }

                //draw the line
                this.ctx.lineTo(offsetX, offsetY);
                this.ctx.stroke();

                //set label x and y for find on mouse hover
                this.data[i].offsetX = offsetX;
                this.data[i].offsetY = offsetY;
            }
            this.ctx.closePath();

            //draw the circle
            for (let i = 0; i < this.data.length; i++) {
                this.ctx.beginPath();
                this.ctx.arc(this.data[i].offsetX, this.data[i].offsetY, 4, 0, 2 * Math.PI, false);
                this.ctx.fill();
                this.ctx.closePath();
            }
        }

        //draw the labels
        let realMaxY = this.maxValueY / 9 * 10;
        let xInterval = this.maxValueX / 10;
        let yInterval = (this.maxValueY - this.minValueY) / 9;
        let startXLabel = this.data[0].x;
        this.ctx.strokeStyle = 'gray';
        this.ctx.fillStyle = 'gray';
        this.ctx.strokeWidth = 2;
        this.ctx.beginPath();

        for (let i = 1; i < 10; i++) {
            let x = this.canvas.width / 10 * i;
            this.ctx.moveTo(x, this.canvasHeight);
            this.ctx.lineTo(x, this.canvasHeight - 6);
            this.ctx.stroke();

            this.ctx.fillText('' + (parseInt((xInterval * i + startXLabel + this.startX) * 100) / 100), x, this.canvasHeight - 8);
        }

        this.ctx.closePath();
        this.ctx.beginPath();

        this.ctx.textAlign = 'left';
        for (let i = 1; i < 10; i++) {
            let y = this.canvas.height / 10 * (10 - i);
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(6, y);
            this.ctx.stroke();

            this.ctx.fillText('' + (parseInt((this.minValueY + yInterval * i) * 100) / 100), 9, y);
            console.log('kap', this.minValueY, yInterval, i);
            console.log(this.minValueY);

        }

        this.ctx.closePath();
    }

    removeInfoSpan() {
        this.setState({showSpan: false});
    }

    reactOnHover(e) {

        let
            rect = this.canvas.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

        // find the data area who exist in the mouse position
        let index = -1;
        for (let i = 0; i < this.data.length; i++) {

            if (x > this.data[i].offsetX - 15 && x < this.data[i].offsetX + 15 + 8) {
                index = i;
                break;
            }
        }

        // set state with a current info to display on the info span
        if (index !== -1) {

            this.setState({
                currentIndex: index,
                showSpan: true,
                x: this.data[index].offsetX - this.infoSpan.offsetWidth / 2 + 7,
                y: this.data[index].offsetY - this.infoSpan.offsetHeight - 7,
            });
        }

    }

    render() {

        const containerStyle = {
            padding: '12px',
            backgroundColor: (this.props.background || '#fdffde'),
            border: this.props.border || '1px solid black',
            position: 'relative',
            color: this.props.color || 'black',
            fontFamily: this.props.fontfamily || 'Arial',
            textAlign: 'center'
        };
        const spanStyle = {
            pointerEvents: 'none',
            position: 'absolute',
            left: (this.state.x) + 'px',
            top: (this.state.y) + 'px',
            color: 'white',
            backgroundColor: 'black',
            borderRadius: '8px',
            padding: '3px 7px',
            display: this.state.showSpan ? 'inline' : 'none',
            transition: 'all 0.2s ease'
        };
        const current = this.data[this.state.currentIndex];
        const innerSpan = this.props.labelsY.map((item, index)=>(
            <span style={{whiteSpace:'nowrap',fontSize:'12px'}}>{this.props.labelsY[index]+" : "+current.y[index]}<br/></span>
        ));

        return (
            <div style={containerStyle} ref={(ref) => {
                this.div = ref
            }}>
                <canvas height={this.canvasHeight} ref={(ref) => {
                    this.canvas = ref
                }} onMouseMove={this.reactOnHover} onMouseLeave={this.removeInfoSpan}
                        style={{margin: 'auto', backgroundColor: 'white', border: '1px solid black'}}>
                </canvas>
                <span ref={(ref) => {
                    this.infoSpan = ref
                }} style={spanStyle}>{innerSpan}<div style={{backgroundColor:'white',height:'1px',margin:'3px 0'}}/>{this.props.labelX + ': ' + (current.x + this.startX)}</span>
            </div>
        );
    }
}
