import { Carousel } from "react-carousel-minimal";

interface Props {
	data: any;
}

export default function ImageSlider(props: Props) {
	const data = props.data ?? [
		{
			image: "",
			caption: ""
		}
	];

	const captionStyle = {
		fontSize: "2em",
		fontWeight: "bold"
	};
	const slideNumberStyle = {
		fontSize: "20px",
		fontWeight: "bold"
	};
	return (
		<div className="App">
			<div style={{ textAlign: "center" }}>
				<div
					style={{
						padding: "0 20px"
					}}
				>
					<Carousel
						data={data}
						width="800px"
						height="600px"
						captionStyle={captionStyle}
						radius="10px"
						slideNumber={true}
						slideNumberStyle={slideNumberStyle}
						captionPosition="bottom"
						automatic={false}
						dots={true}
						slideBackgroundColor="darkgrey"
						slideImageFit="cover"
						thumbnails={false}
						style={{
							minWidth: "600px",
							textAlign: "center",
							maxWidth: "850px",
							maxHeight: "600px",
							margin: "40px auto"
						}}
					/>
				</div>
			</div>
		</div>
	);
}
