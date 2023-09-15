import React from 'react';
import banner01 from '../../common/mainImg/main-banner01.png';
import banner02 from '../../common/mainImg/main-banner02.png';
import banner03 from '../../common/mainImg/main-banner03.png';

import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { SliderImg, SliderItem } from './style';
// REactSimplyCarousel uninstall

interface slideItem {
    item: {
        img: string;
    };
}

function Item(props: slideItem) {
    return (
        <Paper>
            <SliderItem>
                <SliderImg src={props.item.img} />
            </SliderItem>
        </Paper>
    );
}

const Slider: React.FC = () => {
    const items = [
        {
            img: banner01,
        },
        {
            img: banner02,
        },
        {
            img: banner03,
        },
    ];
    return (
        <Carousel navButtonsAlwaysVisible={true} fullHeightHover={false} animation="slide" duration={300}>
            {items.map((item) => (
                <Item item={item} />
            ))}
        </Carousel>
    );
};

export default Slider;
