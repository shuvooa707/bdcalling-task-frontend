function Overlay() {
	return (
		<div className={"w-full h-full fixed top-0 left-0 bg-gray-100 opacity-70 z-[51]"}>
			{/* eslint-disable-next-line react/no-unknown-property */}
			<svg className={"mx-auto"} xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="200" height="200" style={{
				shapeRendering: "auto",
				marginTop: "15%",
				display: "block",
				background: "rgba(255,255,255,0)"
			}}>
				<g>
					<path style={{
						transform: "scale(0.8)",
						transformOrigin: "50px 50px"
					}} strokeLinecap="round" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" strokeDasharray="42.76482137044271 42.76482137044271" strokeWidth="8" stroke="green" fill="none">
						<animate values="0;256.58892822265625" keyTimes="0;1" dur="1s" repeatCount="indefinite" attributeName="stroke-dashoffset"/>
					</path>
					<g/>
				</g>
			</svg>
		</div>
	)
}


export default Overlay;