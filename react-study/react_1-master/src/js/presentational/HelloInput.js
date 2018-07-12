import React, {Fragment} from "react";

const HelloInput = ({handleChange, addUserHandler}) => (
    <Fragment>
        <input type="text" onChange={handleChange} />
        <button onClick={addUserHandler}>Add</button>
    </Fragment>
);

export default HelloInput;