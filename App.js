//map component class.
class MapComponent extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const {data, returnCustomElement, parentClass, parentTag: ParentTag, childClass, childTag, specialClasses, keys} = this.props,
        ChildTag = childTag || (ParentTag == 'ul' || ParentTag == 'ol' ? 'li' : ParentTag == 'tr' ? 'td' : 'div');
    let first = '', middle = '', last = '', middleIndex = Math.round(data.length / 2);

    return (
      <ParentTag className={parentClass}>
        {
          data.map((item, index) => {
            if(specialClasses){
              first = index ? '' : 'map-first-item';
              middle = data.length > 2 && middleIndex == index ? 'map-middle-item' : '';
              last = data.length > 1 && index == (data.length - 1) ? 'map-last-item' : '';
            }

            return returnCustomElement ?
              returnCustomElement(item, index, {className: `${childClass} ${first}${middle}${last}`, key: index}) :
              keys ? keys.map((key, i) => (
                <ChildTag className={`${childClass} ${first}${middle}${last}`} key={i}>
                  {item[key]}
                </ChildTag>
              )) :
                <ChildTag className={`${childClass} ${first}${middle}${last}`} key={index}>
                  {JSON.stringify(item)}
                </ChildTag>

          })
        }
      </ParentTag>
    )
  }
}

//map component props.
MapComponent.propTypes = {
  data: PropTypes.array.isRequired,
  keys: PropTypes.arrayOf(PropTypes.string),
  returnCustomElement: PropTypes.func, //call this function in return with additional third config object argument
  parentClass: PropTypes.string, //css class applied on root/parent element of map component.
  parentTag: PropTypes.oneOf(['div', 'ul', 'ol', 'tr']), //html tag for parent element;
  childClass: PropTypes.string, //css class applied on each child.
  childTag: PropTypes.oneOf(['div', 'li', 'span', 'td', 'th']), //html tag for child element.
  specialClasses: PropTypes.bool, //ng-repeat like classes, Ex: $first, $middle and $last
};

//default props of map component.
MapComponent.defaultProps = {
  parentClass: 'map-parent', //default css class for root element.
  parentTag: 'ul', //default ul.
  childClass: 'map-item', //default css class for child element.
  specialClasses: false
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

const foo = (item, index, config) => {
  return (
      <h1>{item}</h1>
  );
}

ReactDOM.render(
    <div>
      <MapComponent data={exampleWithNumber} specialClasses/>
      <MapComponent data={exampleWithObj} parentTag="tr" keys={['name', 'designation']}/>
    </div>,
    document.getElementById('app')
)