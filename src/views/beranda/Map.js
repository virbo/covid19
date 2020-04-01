import React, {useEffect, useState} from "react";
import {Card, CardTitle} from 'reactstrap';
import {Map, CircleMarker, TileLayer, Tooltip} from "react-leaflet";
import {Spinner} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircle, faMapMarked} from "@fortawesome/free-solid-svg-icons";
import {Confirmed} from "../../config/endpoint";
import "leaflet/dist/leaflet.css";
import moment from "moment";

const MapSebaran = () => {
    const [dataMap, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchData() {
        setIsLoading(true);

        const response = await fetch(Confirmed);
        const json = await response.json();

        //console.log(json);
        setData(json);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <Card body>
            <CardTitle className={'text-primary'}><b><FontAwesomeIcon icon={faMapMarked} /> World Map COVID-19</b></CardTitle>
            <Map
                animate={true}
                style={{ height: "560px", width: "100%" }}
                zoom={1.5}
                center={[26.8206, 30.8025]}>
                <TileLayer
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                    attribution={'&copy <a href="https://yusufayuba.net" target="_blank" rel="noreferrer">Yusuf Ayuba</a> | Data by <a href="https://covid19.mathdro.id/api/confirmed" target="_blank" rel="noreferrer">mathdro.id</a>'}
                />
                {
                    isLoading ? <Spinner color="dark"/> :
                        dataMap.map((item, key) => {
                            const _country = item['provinceState'] == null ? item['countryRegion'] : item['provinceState']+" ("+item['countryRegion']+ ")";
                            //console.log(item['lat']);
                            const _lat = item.lat === null ? 0 : item.lat;
                            const _long = item.long === null ? 0 : item.long;
                            const _confirmed = item.confirmed === null ? 1 : item.confirmed;

                            return (
                                <CircleMarker
                                    center={[_lat, _long]} key={key}
                                    radius={5 * Math.log(_confirmed/3)}
                                    // radius={20 * item['confirmed']/10000}
                                    fillOpacity={0.5}
                                    stroke={false}
                                    color={'#ff0000'}
                                >
                                    <Tooltip direction={"top"} offset={[-8, -2]} opacity={1}>
                                        <span>
                                            <p align={'center'}><b>{_country}</b></p>
                                            <FontAwesomeIcon icon={faCircle} size={"sm"} className={'text-primary'} /> Positif: {item["confirmed"]}<br/>
                                            <FontAwesomeIcon icon={faCircle} size={"sm"} className={'text-success'} /> Sembuh: {item["recovered"]}<br/>
                                            <FontAwesomeIcon icon={faCircle} size={"sm"} className={'text-danger'} /> Meninggal: {item["deaths"]}<br/>
                                            <FontAwesomeIcon icon={faCircle} size={"sm"} className={'text-muted'} /> Dalam Perawatan: {item["active"]}<br/><br/>
                                            <i>Last Update: {moment(item['lastUpdate']).format('MMMM Do YYYY, h:mm:ss')}</i>
                                        </span>
                                    </Tooltip>
                                </CircleMarker>
                            )
                        })
                }
            </Map>
        </Card>
    );
}

export default MapSebaran;