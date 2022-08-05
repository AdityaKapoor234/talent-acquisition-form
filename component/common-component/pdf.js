import * as React from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';



const DefaultLayoutExample= ({ fileUrl }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return <Viewer fileUrl= {'https://fitcart-category-qa.s3.ap-south-1.amazonaws.com/pdf/1651729746.3294084_Chocolate_-_Whey_Protein.pdf'} plugins={[defaultLayoutPluginInstance]} />;
};

export default DefaultLayoutExample;