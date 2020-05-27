import React, { useState, useEffect } from 'react';
import { Viewer, Entity, PointGraphics, EntityDescription } from "resium";
import { Cartesian3 } from "cesium";
import { hot } from "react-hot-loader/root";
// 33.533873, 130.347779
// const position = Cartesian3.fromDegrees(130.347779, 33.533873, 100);
const CeciumFlight = props => {
    const [flightData, setFlightData] = useState(null);
    useEffect(() => {
        const result = props.getData?.(props.howmany).then(response => setFlightData(response));
    }, [props])
    return (
        <div key="flightViewer">
            <Viewer >
                {
                    flightData === null
                        ? <p>now loading...</p>
                        : flightData.data.SearchBirdseyeInFlightResult.aircraft.map((x, index) =>
                            <Entity position={Cartesian3.fromDegrees(x.longitude, x.latitude, 100)} name={x.ident} key={x.faFlightID}>
                                <PointGraphics pixelSize={10} />
                                <EntityDescription>
                                    <h1>便名:{x.ident}</h1>
                                    <p>航空機:{x.type}</p>
                                </EntityDescription>
                            </Entity>
                        )
                }
            </Viewer>
        </div>
    );
}
export default hot(CeciumFlight);