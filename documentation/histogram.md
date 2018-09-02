# Histogram

### Import the component
```js
import Histogram from 'way/to/path/charts/Histogram';
```

### Create the Component

required props:
 - data
   - type: array of literal objects, with variebles:
     - 'color':String,
     - 'value':Number, 
 - labelsX
  - type: array
    -[0] x-label start point
    -[1] x-label interval between points
 - labelY
  -type: string
  -value: the name of the analysed subject

example:
```jsx
<Histogram data={[
               {color: '#f1623d', value: 25}, 
               {color: '#497eff', value: 90}, 
               {color: '#ffdf5b', value: 45}, 
               {color: '#5edb71', value: 22}
            ]}
            labelsX={[0,20]}
            labelY={'Trees count'}
            />
```

### Costumisation props

 - background (string): set the background of the chart
 - border (string): set the border of the chart
 - width (number): set the width (and height) of the chart
