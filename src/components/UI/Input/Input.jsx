import React from 'react';
import style from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [style.InputElement];

    if (props.invalid && props.shoudValidate && props.touched) {
        inputClasses.push(style.Invalid);
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}  onChange={props.changed}/>;
            break;
        case ('select'):
            inputElement = (
                <select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map(el => (
                        <option key={el.value} value={el.value}>{el.displayValue}</option>
                    ))}
                </select>);
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')}{...props.elementConfig} value={props.value}  onChange={props.changed}/>
    }

    return (
        <div className={style.Input}>
            <label className={style.Label}>{props.label}</label>
            {inputElement}
        </div>
    );

};

export default input;