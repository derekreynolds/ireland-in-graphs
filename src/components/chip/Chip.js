import React, {useState} from 'react';

import './Chip.scss';


const Chip = (props) => {

    const [toggle, setToggle] = useState(false);    
    
    function handleClick(e) {
        e.preventDefault();
        setToggle(!toggle);
        if (props.onClick) {
            props.onClick();
        }
        
    }   
    
    function getClasses() {
        let clazz = 'er-chip';

        if(toggle)
          clazz += " er-no-shadow";

        return clazz; 
    }
    
    return (<div className={getClasses()} onClick={handleClick} style={{backgroundColor: props.color}}>{props.children}</div>);
}
 
export default Chip;