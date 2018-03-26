const MapComponent = (props) => {
    const {data, returnCustomElement, parentClass, parentTag: ParentTag, childClass, childTag, specialClasses, keys, handleClick} = props,
        ChildTag = childTag || (ParentTag === 'ul' || ParentTag === 'ol' ? 'li' : ParentTag === 'tbody' || ParentTag === 'thead' ? 'tr' : 'div'),
        GrandChild = ParentTag === 'tbody' ? 'td' : ParentTag === 'thead' ? 'th' : 'div';
    let first = '', middle = '', last = '', middleIndex = Math.round(data.length / 2);

    return (
      <ParentTag className={parentClass}>
        {
          data.map((item, index) => {
            if(specialClasses){
              first = index ? '' : '$first';
              middle = data.length > 2 && middleIndex == index ? '$middle' : '';
              last = data.length > 1 && index == (data.length - 1) ? '$last' : '';
            }

            return returnCustomElement ?
              returnCustomElement(item, index, {className: `${childClass} ${first}${middle}${last}`, key: index}) :
              keys ?
                <ChildTag onClick={() => handleClick(item, index)} className={`${childClass} ${first}${middle}${last}`} key={index}>
                  {
                    typeof item == 'object' ?
                    keys.map((key, i) => <GrandChild key={i}>{item[key]}</GrandChild>) : item
                  }
                </ChildTag>
               :
                <ChildTag onClick={() => handleClick(item, index)} className={`${childClass} ${first}${middle}${last}`} key={index}>
                  {typeof item == 'object' ? JSON.stringify(item) : item}
                </ChildTag>
          })
        }
      </ParentTag>
    )
  }

//map component props.
MapComponent.propTypes = {
  data: PropTypes.array.isRequired,
  returnCustomElement: PropTypes.func, //A function that return an html element or react component, it is call with three arguments.
  keys: PropTypes.arrayOf(PropTypes.string), //A array of keys that you want to add on DOM.
  specialClasses: PropTypes.bool, //ng-repeat like classes, Ex: $first, $middle and $last
  parentClass: PropTypes.string, //css class for root/parent element of map component.
  parentTag: PropTypes.oneOf(['div', 'ul', 'ol', 'tbody', 'thead']), //html tag for parent element of map-component;
  childClass: PropTypes.string, //css class for child element, applied on each child.
  childTag: PropTypes.oneOf(['h1','h2','h3','h4','h5','h6', 'div', 'section', 'span', 'li', 'tr']), //html tag for child element of map-component.
  handleClick: PropTypes.func //click handler for child element of map-component.
};

//default props of map component.
MapComponent.defaultProps = {
  specialClasses: false,
  parentClass: 'map-parent', //default css class for root element.
  parentTag: 'div', //default div.
  childClass: 'map-item', //default css class for child element.
  handleClick: () => {}
};

//render root component.
const exampleWithObj = [
  {name: 'Ovais', id: 1, designation: 'Frontend Developer'},
  {name: 'Zubair', id: 2, designation: 'UI Developer'},
  {name: 'Umair', id: 3, designation: 'Fullstack Developer'},
  {name: 'Sohaib', id: 4, designation: 'Game Developer'},
  {name: 'Someone else', id: 5, designation: 'Game Developer'}
];
const exampleWithString = ["Ovais", "Zubair", "Umair", "Sohaib", "Tariq", "Someone else"];
const exampleWithNumber = [22, 33, 44 ,55, 66, 77, 88, 99];
const exampleWithCustomElement = (item, index, config) => {
  return (
      <h1 key={index}>{item}</h1>
  );
}

ReactDOM.render(
    <div>
      <h6>Example With Number</h6>
      <MapComponent data={exampleWithNumber} parentTag="div" specialClasses handleClick={(item, index) => console.log("running", item, index)}/>
      <h6>Example With String</h6>
      <MapComponent data={exampleWithString} parentTag="ol" handleClick={(item, index) => console.log("running", item, index)}/>
      <h6>Example With Object</h6>
      <table>
        <MapComponent data={exampleWithObj} parentTag="tbody" keys={['name', 'designation', 'id']} handleClick={(item, index) => console.log("running", item, index)}/>
      </table>
      <h6>Example With Custom element</h6>
      <MapComponent data={exampleWithNumber} returnCustomElement={exampleWithCustomElement}/>
    </div>,
    document.getElementById('app')
)