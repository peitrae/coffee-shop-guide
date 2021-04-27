import React, { useEffect, useState } from 'react';

import Card from '../../../components/UI/Card';
import ImagesItem from './ImagesItem';
import AddImage from './AddImage';

import uploadImage from '../../../store/firebase/uploadImage';

const Images = ({
	localId,
	images,
	updateCoffeeShop,
	updateUploading,
}) => {
	const [previews, setPreviews] = useState([]);

	useEffect(() => {
		setPreviews(images);
	}, [images]);

	const handleUploadImage = (files, index) => {
		const img = files[0];
		const reference = `coffeeShop/images/${localId}/`;
		updateUploading({ images: true });

		uploadImage(img, reference)
			.then((response) => {
				const tempImages = [...images];
				tempImages.push(response);
				updateCoffeeShop({ images: tempImages });
				updateUploading({ images: false });
			})
			.catch((error) => console.log(error));

		let reader = new FileReader();
		reader.onloadend = () => {
			const tempPreview = [...previews];

			if (index) {
				tempPreview[index] = reader.result;
			} else {
				tempPreview.push(reader.result);
			}
			setPreviews(tempPreview);
		};

		reader.readAsDataURL(img);
	};

	const handleDeleteImage = (index) => (e) => {
		e.preventDefault();
		const temp = [...images];
		temp.splice(index, 1);
		updateCoffeeShop({ images: temp });
		setPreviews(temp);
	};

	return (
		<Card className="images margin-b-16">
			<h2 className="add-coffeeshop__title">Gambar</h2>
			<div className="col">
				{previews.map((img, index) => (
					<ImagesItem
						key={index}
						image={img}
						isUploading={images[index]}
						handleUpload={(e) => handleUploadImage(e.target.files, index)}
						handleDelete={handleDeleteImage(index)}
					/>
				))}
				{previews.length < 4 ? (
					<AddImage handleUpload={handleUploadImage} />
				) : null}
			</div>
		</Card>
	);
};

export default Images;
