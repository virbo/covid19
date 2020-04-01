import React, {useEffect, useState} from "react";
import {Media, Spinner, Card, CardHeader, CardBody, Table} from 'reactstrap';

import {Daily} from "../../config/endpoint";

const DailyUpdate = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchData() {
        setIsLoading(true);
        const response = await fetch(Daily);
        const json = await response.json();

        setData(json);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <Card body>
            {
                isLoading ? <Spinner color={'dark'}/> :
                    data.map((item, key) => {
                        return (
                            <>
                            <Media>
                                <Media body>
                                    <Media heading>{item['reportDateString']}</Media>
                                    Total {item['totalConfirmed']} cases on China ({item['mainlandChina']}) and and other country ({item['otherLocations']})
                                </Media>
                            </Media>
                            <hr/>
                            </>
                        );
                    })
            }
        </Card>
    );
}

export default DailyUpdate;