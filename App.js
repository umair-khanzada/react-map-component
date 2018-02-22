//map component class.
class MapComponent extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {data, cb, parentClass, childClass, specialClasses} = this.props;
        let first = '', middle = '', last = '';

        return (
            <div className={parentClass}>
                {
                    data.map((o, i) => {
                        if(specialClasses){
                            first = i ? '' : 'map-first-item';
                            //middle = i ? '' : 'map-first-item';
                            last = i == (data.length - 1) ? 'map-last-item' : '';
                        }
                        return (
                            <div className={`${childClass} ${first}${middle}${last}`} key={i}>{JSON.stringify(o)}</div>
                        )
                    })
                }
            </div>
        )
    }
}

//map component props.
MapComponent.propTypes = {
    data: PropTypes.array.isRequired,
    cb: PropTypes.func, //TODO: implement cb logic.
    parentClass: PropTypes.string, //css class applied on root/parent element of map component.
    childClass: PropTypes.string, //css class applied on each child.
    specialClasses: PropTypes.bool, //ng-repeat like classes, Ex: $first, $middle and $last
};

//default props of map component.
MapComponent.defaultProps = {
    parentClass: 'map-parent', //defaut css class for root element.
    childClass: 'map-item',     //defaut css class for child element.
    specialClasses: false
};

//render root component.
const data = [
    {name: 'Ovais', id: 1, designation: 'Frontend Developer'},
    {name: 'Zubair', id: 2, designation: 'UI Developer'},
    {name: 'Umair', id: 3, designation: 'Fullstack Developer'},
    {name: 'Sohaib', id: 4, designation: 'Game Developer'},
    {name: 'Someone else', id: 5, designation: 'Game Developer'}
]

ReactDOM.render(
    <div>
        <MapComponent data={data}  />
    </div>,
    document.getElementById('app')
)