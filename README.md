# react-map-component
A reuseable dumb/presentational map component for react.js

___

### Demo

___

### props:

| Name | Type | Default | Required | Priority | Details |
| ---- | ---- | ------- | -------- | -------- | ------- |
| data | array | none | true | none | Array of strings, numbers or objects. |
| returnCustomElement | func | none | false | 5 <br /><sub>highest priority for now</sub> | A function that return an html element or react component, it is call with three arguments. <br /> <ol><li>current element</li><li> index</li> <li> props Object</li></ol> |
| keys | array of string | none | false | 4 | A array of keys name that you want to add on DOM. </br> **Note:** pass only when data is array of objects |
| specialClasses | boolean | false | false | none | Add special classes on some elements same as **ng-repeat**. <br /> `Ex: $first, $middle and $last` |
| parentClass | string | map-parent | false | none | css class for root/parent element of map-component. |
| parentTag | enum | div | false | none | html tag for parent element of map-component, supported tags for now `['div', 'ul', 'ol', 'tbody', 'thead']` |
| childClass | string | map-item | false | none | css class for child element, applied on each child of map-component. |
| childTag | enum | depends on parentTag | false | none | html tag for child element of map-comonent, supported tags for now `['h1','h2','h3','h4','h5','h6', 'div', 'section', 'span', 'li', 'tr']` |
| handleClick | func | () => {} | false | none | click handler for child element of map-component. <br /> **Note:** call with two arguments. <br /><ol><li> item</li> <li> index</li> |
___

```
//simple with string.
<MapComponent data={arrayOfString} /> 
//with objects you need to pass some props like below.
<table>
  <MapComponent data={arrayOfObj} keys={['id', 'name', 'gender']} />
</table>
//with custom element just pass the func no worries which type of data array contain.
<MapComponent data={exampleWithNumber} returnCustomElement={func}/>
```