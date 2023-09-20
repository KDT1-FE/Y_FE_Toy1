import React from 'react';
import {
    HomeContainer,
    AboutImg,
    AboutWrapper,
    AboutTitle,
    AboutSubTitle,
    AboutUs,
    AboutContent,
    AboutContainer,
} from './style';
import fastcampusImg from '../../common/MainImg/fastcampus.png';
import wikiImg from '../../common/MainImg/wiki.png';
import galleryImg from '../../common/MainImg/gallery.png';

import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';

import Footer from '../../common/Footer';

const Home: React.FC = () => {
    return (
        <HomeContainer>
            <Carousel
                navButtonsAlwaysVisible={true}
                fullHeightHover={false}
                animation="slide"
                duration={300}
                indicators={false}
                autoPlay={true}
            >
                <Paper>
                    <AboutContainer>
                        <AboutWrapper>
                            <AboutUs>About us</AboutUs>
                            <AboutTitle>
                                WIKI FOR <span style={{ color: 'red' }}>FASTCAMPUS</span>
                            </AboutTitle>
                            <AboutSubTitle>Page for Fastcampus x Yanolja bootcamp</AboutSubTitle>
                            <AboutContent>
                                Our service provides <a href="/wiki">Wiki</a> and <a href="/gallery">Gallery</a> pages.
                                everyone can fixed wiki and gallery
                                <br />
                                for free. if you want make or join team for project create thread in{' '}
                                <a href="#">Project page</a>
                            </AboutContent>
                        </AboutWrapper>
                        <AboutImg src={fastcampusImg} />
                    </AboutContainer>
                </Paper>
                <Paper>
                    <AboutContainer>
                        <AboutWrapper>
                            <AboutUs>About us</AboutUs>
                            <AboutTitle>
                                About <span style={{ color: 'blue' }}>WIKI</span>
                            </AboutTitle>
                            <AboutSubTitle>Page for Announcement</AboutSubTitle>
                            <AboutContent>
                                The main function of the <a href="/wiki">Wiki page</a> provides an announcement
                                function.
                                <br />
                                Create a new channel and write a new wiki !
                            </AboutContent>
                        </AboutWrapper>
                        <AboutImg src={wikiImg} />
                    </AboutContainer>
                </Paper>
                <Paper>
                    <AboutContainer>
                        <AboutWrapper>
                            <AboutUs>About us</AboutUs>
                            <AboutTitle>
                                About <span style={{ color: 'green' }}>GALLERY</span>
                            </AboutTitle>
                            <AboutSubTitle>Page for Fastcampus x Yanolja bootcamp</AboutSubTitle>
                            <AboutContent>
                                The <a href="">gallery page</a> provides you to register, update, and delete user
                                profiles
                                <br />
                                and various reference materials.
                            </AboutContent>
                        </AboutWrapper>
                        <AboutImg src={galleryImg} />
                    </AboutContainer>
                </Paper>
            </Carousel>
            <Footer />
        </HomeContainer>
    );
};

export default Home;
