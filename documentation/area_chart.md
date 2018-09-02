# Area Chart

### Import the component
```js
import AreaChart from 'way/to/path/charts/AreaChart';
```

### Create the Component

required props:
 - data
  - type: array of literal objects, with variebles:
     - 'color':String,
     - 'value':Number, 
- labelX
  - type: string
  - value: the name of the x labe
- labelY
  - type: string
  - value: the name of the y label

example:
```jsx
<LineChart data={[
               {color: '#f1623d', value: 25}, 
               {color: '#497eff', value: 90}, 
               {color: '#ffdf5b', value: 45}, 
               {color: '#5edb71', value: 22}
            ]
            labelX={'age'} labelY={'experiance'}
            }/>
```

### Costumisation props

 - background (string): set the background of the chart
 - border (string): set the border of the chart
 - color (string): set the color of the line
 - height (number) set the height of the chart //the width is 100%
