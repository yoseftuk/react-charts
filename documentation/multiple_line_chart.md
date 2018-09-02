# Multiple Line Chart

### Import the component
```js
import MultipleLineChart from 'way/to/path/charts/MultipleLineChart';
```

### Create the Component

required props:
 - data
  - type: array of literal objects, with variebles:
     - 'x':Number,
     - 'y': Array of Nubers (the y values of all the data) 
- labelX
  - type: string
  - value: the name of the x labe
- labelY
  - type: string
  - value: the name of the y label
- colors
  - type: string array
  - value: the colors of the lines in the chart

example:
```jsx
<MultipleLineChart data={[
               {x:20,y:[20,40,35,23]}, 
               {x:30,y:[27,35,50,30]}, 
               {x:40,y:[32, 40, 60, 55]}, 
               {x:50,y:[30,55,40,37]}
            ]
            colors={['#f1623d','#497eff','#ffdf5b','#5edb71']}
            labelX={'age'} labelY={'experiance'}
            }/>
```

### Costumisation props

 - background (string): set the background of the chart
 - border (string): set the border of the chart
 - height (number) set the height of the chart //the width is 100%
