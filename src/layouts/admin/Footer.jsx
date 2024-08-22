import moment from "moment";

function Footer() {


	return (
		<div className={"py-10 flex justify-center bg-indigo-950 "}>
			<div className={"text-white"}>
				<strong className={"mx-3"}>© Copy Right Reserved</strong>
				{ moment(new Date()).format("DD/MM/YYYY") }
			</div>
		</div>
	)
}


export default Footer;