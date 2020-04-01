import React, {useEffect, useState} from "react";
import {Card, CardTitle, Col, Row, Media} from 'reactstrap';
import Chart from "react-google-charts";
import {Endpoint} from "../../config/endpoint";
import {Spinner} from "reactstrap";
import {faChartBar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import moment from "moment";

const ResumeChart = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    async function fetchData() {
        setIsLoading(true);
        const response = await fetch(Endpoint);
        const json = await response.json();

        //console.log(json);
        setData(json)
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <Card body>
            <CardTitle className={'text-success'}><b><FontAwesomeIcon icon={faChartBar} /> Global COVID-19</b></CardTitle>
            <Row>
                {
                    isLoading ? <Spinner color={'dark'}/> :
                        <>
                            <Col md={'2'}>
                                <Media body className={'text-primary'}>
                                    <Media heading>Positif</Media>
                                    <p>{data.confirmed.value.toLocaleString()} jiwa</p>
                                </Media><hr/>
                                <Media body className={'text-danger'}>
                                    <Media heading>Meninggal</Media>
                                    <p>{data.deaths.value.toLocaleString()} jiwa</p>
                                </Media><hr/>
                                <Media body className={'text-success'}>
                                    <Media heading>Sembuh</Media>
                                    <p>{data.recovered.value.toLocaleString()} jiwa</p>
                                </Media><hr/>
                                <Media body className={'text-muted'}>
                                    <Media heading>Dalam Perawatan</Media>
                                    <p>{(data.confirmed.value-(data.deaths.value+data.recovered.value)).toLocaleString()} jiwa</p>
                                </Media><hr/>
                            </Col>
                            <Col md={'10'}>
                                <Chart
                                        height={'400px'}
                                        chartType="Bar"
                                        loader={<div>Loading Chart</div>}
                                        colors={['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6']}
                                        data={[
                                            ['Last update on '+moment(data.lastUpdate).format('MMMM Do YYYY, h:mm:ss'), 'Total'],
                                            ['Positif', data.confirmed.value],
                                            ['Meninggal', data.deaths.value],
                                            ['Sembuh', data.recovered.value],
                                        ]}
                                        options={{
                                            legend: { position: 'none' },
                                        }}
                                    />
                            </Col>
                    </>
                    }
            </Row>
        </Card>
    );
}

export default ResumeChart;