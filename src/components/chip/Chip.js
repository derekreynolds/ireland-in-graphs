import React, {useState, useEffect} from 'react';

import './Chip.scss';


const Chip = (props) => {

    const [toggle, setToggle] = useState(props.selected);    
    
    const handleClick = (e) => {
        e.preventDefault();
        
        if (props.onClick) {
            if(props.onClick()) {
                setToggle(!toggle);
            }
        } else {
            setToggle(!toggle);
        }       
    }

    useEffect(() => {
        setToggle(props.selected);
    }, [props.selected])
   
    const getClasses = () => {
        
        let clazz = 'er-chip';

        if(toggle)
          clazz += " er-no-shadow";

        return clazz; 
    }
    
    return (<div className={getClasses()} onClick={handleClick} style={{backgroundColor: props.color}}>{props.children}</div>);
}
 
export default Chip;