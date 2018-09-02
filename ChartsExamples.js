import React, {Component} from 'react';
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import MultipleLineChart from "./MultipleLineChart";
import AreaChart from "./AreaChart";
import MultipleAreaChart from "./MultipleAreaChart";
import Histogram from "./Histogram";

const ChartExamples = () => {

    return (
        <div className="container">
            <BarChart data={[{color: '#f1623d', value: 25, label: 'the red one'}, {
                color: '#497eff',
                value: 90,
                label: 'the blue one'
            }, {color: '#ffdf5b', value: 45, label: 'the yellow one'}, {
                color: '#5edb71',
                value: 22,
                label: 'the green one'
            }]}/>
            <PieChart data={[{color: '#f1623d', value: 25, label: 'the red one'}, {
                color: '#497eff',
                value: 90,
                label: 'the blue one'
            }, {color: '#ffdf5b', value: 45, label: 'the yellow one'}, {
                color: '#5edb71',
                value: 22,
                label: 'the green one'
            }]}/>
            <LineChart color={'#ff9944'} labelX={'age'} labelY={'years experience'}
                       data={[{x: 37, y: 22}, {x: 46, y: 83}, {x: 50, y: 72}, {x: 62, y: 80}, {x: 70, y: 66}, {
                           x: 97,
                           y: 43
                       }]}/>
            <AreaChart color={'#ff5353'} labelX={'age'} labelY={'years experience'}
                       data={[{x: 37, y: 22}, {x: 46, y: 83}, {x: 50, y: 72}, {x: 62, y: 80}, {x: 70, y: 66}, {
                           x: 97,
                           y: 43
                       }]}/>
            <MultipleLineChart labelX={'age'} labelsY={['label1', 'label2', 'label3']}
                               colors={['#f1623d', '#497eff', '#ffdf5b']}
                               data={[{x: 37, y: [22, 32, 43]}, {x: 46, y: [24, 53, 24]}, {
                                   x: 50,
                                   y: [72, 43, 35]
                               }, {x: 62, y: [63, 54, 66]}, {x: 70, y: [66, 58, 50]}, {x: 97, y: [43, 36, 27]}]}/>
            <MultipleAreaChart labelX={'age'} labelsY={['label1', 'label2', 'label3']}
                               colors={['#0008f1', '#3f962a', '#ff49d4']}
                               data={[{x: 37, y: [22, 32, 43]}, {x: 46, y: [24, 53, 24]}, {
                                   x: 50,
                                   y: [72, 43, 35]
                               }, {x: 62, y: [63, 54, 66]}, {x: 70, y: [66, 58, 50]}, {x: 97, y: [43, 36, 27]}]}/>
            <Histogram data={[
                {color: '#f1623d', value: 25},
                {color: '#497eff', value: 90,}, {color: '#ffdf5b', value: 45}, {
                    color: '#5edb71',
                    value: 22,
                }]}
                       labelsX={[35,50]} labelY={'Trees'}
            />
        </div>
    );

};

export default ChartsPage;
