import React from 'react';
import classes from './Spinner.css';

const spinner = () => (
    <div className={classes.loader}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
);

export default spinner;