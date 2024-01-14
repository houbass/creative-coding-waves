


export default function AnimationSettings({ animateHandler, setAnimateHandler, drawHandler, setDrawHandler, reset, setReset }) {

    return(
        <div 
        style={{
            display: "inline-flex",
            justifyContent: "center",
            gap: "15px",
        }}>
            <button 
            onClick={() => setAnimateHandler(!animateHandler)}
            >animation on/off</button>

            <button 
            onClick={() => setDrawHandler(!drawHandler)}
            >draw on/off</button>

            <button 
            onClick={() => setReset(!reset)}
            >reset</button>
        </div>
    )
}