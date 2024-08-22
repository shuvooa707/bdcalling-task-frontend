import {BallTriangle} from "react-loader-spinner";
import React from "react";

function Overlay() {
	return (
		<div className={"w-full h-full fixed flex justify-center items-center top-0 left-0 bg-gray-100 opacity-70 z-[51]"}>
			{/* eslint-disable-next-line react/no-unknown-property */}
			<BallTriangle
				height={100}
				width={100}
				radius={5}
				color="#4fa94d"
				ariaLabel="ball-triangle-loading"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
			/>
		</div>
	)
}


export default Overlay;