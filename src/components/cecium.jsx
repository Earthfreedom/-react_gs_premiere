import React, { useState, useEffect } from 'react';
import { Viewer, Globe, Entity, PointGraphics, EntityDescription } from "resium";
import { Cartesian3 } from "cesium";
import { hot } from "react-hot-loader/root";
// 33.533873, 130.347779
// const position = Cartesian3.fromDegrees(130.347779, 33.533873, 100);
function orgFloor(value, base) {
    return Math.floor(value * base) / base;
}
const CeciumFlight = props => {
    const [flightData, setFlightData] = useState(null);
    useEffect(() => {
        const result = props.getData?.(props.howmany).then(response => setFlightData(response));
    }, [props])
    return (
        <div key="flightViewer">
            <p>地球儀の上でクリックしながらぐりぐりすると動く</p>
            <Viewer >
                <Globe
                    enableLighting
                // onImageryLayersUpdate
                // onTerrainProviderChange
                />
                {
                    flightData === null
                        ? <p>now loading...</p>
                        : flightData.data.SearchBirdseyeInFlightResult.aircraft.map((x, index) =>
                            <Entity position={Cartesian3.fromDegrees(x.longitude, x.latitude, 100)} name={x.ident} key={x.faFlightID}>
                                <PointGraphics pixelSize={10} />
                                <EntityDescription>
                                    <h1>便名：{x.ident}</h1>
                                    <p>対地速度：{x.groundspeed} kts（時速：{orgFloor(x.groundspeed * 1.852, 0.2)} ㎞）</p>
                                    <p>発空港：{x.origin}</p>
                                    <p>発時間：{new Date(x.departureTime * 1000).toLocaleDateString()}　{new Date(x.departureTime * 1000).toLocaleTimeString()}</p>
                                    <p>着空港：{x.destination}</p>
                                    <p>着時間：{x.arrivalTime > 0 ? new Date(x.arrivalTime * 1000).toLocaleDateString() + "　" + new Date(x.arrivalTime * 1000).toLocaleTimeString() : "未着"}</p>
                                    <p>航空機種類：{x.type}</p>
                                    <p>※空港名はICAOコード</p>
                                </EntityDescription>
                            </Entity>
                        )
                }
            </Viewer>
        </div>
    );
}
export default hot(CeciumFlight);