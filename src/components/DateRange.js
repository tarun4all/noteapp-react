import React, { useEffect, useState } from 'react';

function DateRange({ inputId, handler }) {
    return (
        <input type="date" id={inputId} onChange={({ target }) => handler(target.value, target.id)} style={{ border: "none", height: "30px" }} />
    )
}

export default DateRange;