import React from 'react';
import './App.css';
import { BarChart } from './BarChart';
import { OrganizationHierarchyComponent } from './OrganizationHierarchyComponent';

function App() {
  // return ( <BarChart
  //           data={[12, 5, 6, 6, 9, 10, 14, 26, 34, 100]}
  //           width={700}
  //           height={200}/> )

  return (<OrganizationHierarchyComponent
            width={700}
            height={200}/>)
}

export default App;
