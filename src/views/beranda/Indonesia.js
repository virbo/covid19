import React, {useEffect, useState} from "react";
import {Card, CardTitle, Spinner} from 'reactstrap';
import { Chart } from "react-google-charts";

import {Indonesia} from "../../config/endpoint";
import moment from "moment";
import {faChartLine} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const IndonesiaConfirm = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    async function fetchData() {
        setIsLoading(true);
        const response = await fetch(Indonesia);
        const json = await response.json();

        setData(json)
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <Card body>
            <CardTitle className={'text-primary'}><b><FontAwesomeIcon icon={faChartLine} /> Indonesia COVID-19</b></CardTitle>
            {
                isLoading ? <Spinner color={'dark'}/> :
                    <Chart
                        chartType="BarChart"
                        loader={<Spinner color={'dark'}/>}
                        data={[
                            [
                                '',
                                'Total',
                                { role: 'style' },
                                {
                                    sourceColumn: 0,
                                    role: 'annotation',
                                    type: 'string',
                                    calc: 'stringify',
                                },
                            ],
                            ['Positif', data.confirmed.value, '#3498db', data.confirmed.value],
                            ['Meninggal', data.deaths.value, '#c0392b', data.deaths.value],
                            ['Sembuh', data.recovered.value, '#2ecc71', data.recovered.value],
                            ['Dalam Perawatan', data.confirmed.value-(data.recovered.value+data.deaths.value), '#e67e22', data.confirmed.value-(data.recovered.value+data.deaths.value)],
                        ]}
                        options={{
                            hAxis: {
                                title: 'Last update on '+moment(data.lastUpdate).format('MMMM Do YYYY, h:mm:ss'),
                                minValue: 0,
                            },
                            //title: 'Indonesian Covid-19',
                            width: '100%',
                            height: 300,
                            bar: { groupWidth: '85%' },
                            legend: { position: 'none' },
                        }}
                    />
            }
        </Card>
    );
}

export default IndonesiaConfirm;