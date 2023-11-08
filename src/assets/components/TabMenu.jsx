import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Asiakkaat from './Customerlist.jsx';
import Treenit from './Treenit.jsx';


function TabMenu() {

    const [value, setValue] = useState('one');

    const handleChange = (event, value) => {
        setValue(value);
        };


return(
    <div>
        <Tabs value={value} onChange={handleChange}>
            <Tab value="one" label="Asiakkaat" />
            <Tab value="two" label="Treenit" />
        </Tabs>
            {value === 'one' && <div><Asiakkaat/></div>}
            {value === 'two' && <div><Treenit/></div>}
    </div>
);
}

export default TabMenu;