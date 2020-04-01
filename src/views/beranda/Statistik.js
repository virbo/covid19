import React, {useEffect, useState} from "react";
import {Card, CardBody, CardHeader} from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import {Daily} from "../../config/endpoint";

const StatistikConfirm = () => {
    const [dataStats, setDataDtats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchData() {
        setIsLoading(true);
        const response = await fetch(Daily);
        const json = await response.json();

        setDataDtats(json);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [])

    const dataKus = dataStats.map((item) => {
        return {
            china: item.mainlandChina
        };
    });

    /*
    const dataChart = data.map((item) => {
        return {
            name: item.tahun,
            y: item.jml
        }
    });
    * */

    console.log(dataKus);

    return (
        <Card>
                <CardHeader>heloo</CardHeader>
                <CardBody>
                </CardBody>
            </Card>
    );
}

export default StatistikConfirm;