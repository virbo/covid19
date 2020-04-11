import React, {useEffect, useState} from "react";
import {Card, CardTitle, CardBody} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Confirmed} from "../../config/endpoint";
import moment from "moment";
import {faGlobe} from "@fortawesome/free-solid-svg-icons";
import {MDBDataTable} from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';
import '@fortawesome/fontawesome-free/css/all.css'

const Confirm = () => {
    const [data, setData] = useState([]);
    //const [isLoading, setIsLoading] = useState(true);

    async function fetchData() {
        //setIsLoading(true);
        const response = await fetch(Confirmed);
        const json = await response.json();

        setData(json);
        //setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const _data = {
        columns: [
            {label: '#', field: 'no', sort: 'asc', width: '10px'},
            {label: 'Negara', field: 'country', sort: 'asc'},
            {label: 'Positif', field: 'positif', sort: 'asc'},
            {label: 'Sembuh', field: 'sembuh', sort: 'asc'},
            {label: 'Meninggal', field: 'death', sort: 'asc'},
            {label: 'Dalam Perawatan', field: 'active', sort: 'asc'},
            {label: 'CFR (%)', field: 'cfr', sort: 'asc'},
            {label: 'Last Update', field: 'updated', sort: 'asc'}
        ],
        rows: data.map((item, key) => {
            const _country = item['provinceState'] == null ? item['countryRegion'] : item['provinceState']+" ("+item['countryRegion']+ ")";
            const _cfr = item['deaths']/item['confirmed']*100;
            //const _flag = item.iso2 === undefined ? '' : <img src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.6/flags/4x3/${item.iso2.toLowerCase()}.svg`} alt={_country} width={'15px'} />;
            return {
                no: key+1,
                country: _country,
                positif: item.confirmed.toLocaleString(),
                sembuh: item.recovered.toLocaleString(),
                death: item.deaths.toLocaleString(),
                active: item.active.toLocaleString(),
                cfr: _cfr.toLocaleString(),
                updated: moment(item['lastUpdate']).format('MMMM Do YYYY, h:mm:ss')
            }
        })
    };

    //console.log(_data);

    return (
        <Card>
            <CardBody>
                <CardTitle className={'text-danger'}><b><FontAwesomeIcon icon={faGlobe} /> Daily Update COVID-19</b></CardTitle>
                    <MDBDataTable
                        striped
                        bordered
                        hover
                        data={_data}
                        sortable={false}
                        responsive
                    />
            </CardBody>
        </Card>
    );
}

export default Confirm;
