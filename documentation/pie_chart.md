# Pie Chart

### Import the component
```js
import PieChart from 'way/to/path/charts/PieChart';
```

### Create the Component

required props:
 - name: data
 - type: array of literal objects, with variebles:
     - 'color':String,
     - 'value':Number, 
     - 'label':String

example:
```jsx
<PieChart data={[
               {color: '#f1623d', value: 25, label: 'the red one'}, 
               {color: '#497eff', value: 90, label: 'the blue one'}, 
               {color: '#ffdf5b', value: 45, label: 'the yellow one'}, 
               {color: '#5edb71', value: 22, label: 'the green one'}
            ]}/>
```

### Costumisation props

 - background (string): set the background of the chart
 - border (string): set the border of the chart
 - color (string): set the text color of the labels
 - fontfamily (string): set the font-family of the labels
 - width (number): set the width (and height) of the chart
