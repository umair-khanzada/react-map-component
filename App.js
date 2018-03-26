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


ReactDOM.render(
  <div className="container">
    <div className="row">
      <div className="col-xs-12">
        <h1>Temp</h1>
      </div>
    </div>
  </div>,
  document.getElementById('app')
)