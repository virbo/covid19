import React from "react";
import {Container, Row, Col} from 'reactstrap';

import Beranda from "../beranda";
import Confirm from "../beranda/Confirmed";
import IndonesiaConfirm from "../beranda/Indonesia";
import ResumeChart from "../beranda/Resume";

const Layout = (props) => {
    //const lokasi = props.location;
    return (
        <div className={'main bg-gradient-dark text-dark'}>
            <Container>
                <Row>
                    <Col md={12}>
                        <br/>
                        <IndonesiaConfirm/><br/>
                        <Beranda/><br/>
                        <ResumeChart/><br/>
                        <Confirm/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Layout;